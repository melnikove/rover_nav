import { useParams } from "react-router";
import { useGetObject } from "./useGetObject";
import { useCallback, useEffect, useRef, useState } from "react";
import { LatLng } from "leaflet";
import { useGetVehicles } from "./useGetVehicles";

import { MapContainer } from "./components/MapContainer/MapContainer";
import { EMapMode, IExecVehicleRoutePoint } from "./components/MapContainer/type";
import { IVehicle } from "./type";
import { IO_ONLINE, IO_START_NAVIGATE, socket } from "../../general/constants";
import { useObjectHook } from "../../general/storeHooks/useObjectHook";
import { useVehiclesHook } from "../../general/storeHooks/useVehiclesHook";
import { useSetNextNavPoint } from "../../general/storeHooks/useSetNextNavPoint";

export const ObjectPage = () => {
    const [mapMode, setMapMode] = useState<EMapMode>(EMapMode.PlanVehicleRoute);

    const { object } = useObjectHook(state => state);

    const { vehicles } = useVehiclesHook(set => set);

    const [error, setError] = useState('');

    const { nextNavPoint, setNextNavPoint } = useSetNextNavPoint(set => set);

    const vehicleRef = useRef<IVehicle>();

    useEffect(() => {
        const vehicle = vehicles.find(({ objectId }) => objectId === object?.id);
        if (vehicle) {
            vehicleRef.current = vehicle;
        }
    }, [object, vehicles])

    const { objectId } = useParams();

    useGetObject({ objectId, setError });

    useGetVehicles();

    useEffect(() => {
        setNextNavPoint(null);
        return () => {
            socket.off(IO_ONLINE);
        }
    }, [setNextNavPoint]);

    const handleSaveRoute = useCallback((points: LatLng[]) => {
        if (vehicleRef.current) {
            socket.emit(
                IO_START_NAVIGATE,
                { id: vehicleRef.current.id, path: points },
                () => {
                    setMapMode(EMapMode.ExecVehicleRoute);
                    socket.on(
                        IO_ONLINE,
                        (data: IExecVehicleRoutePoint) => {
                            setNextNavPoint(data);
                        },
                    );
                },
            );
        }
    }, [vehicleRef, setNextNavPoint]);

    if (error) return <h1 style={{ width: '100%' }}>{error}</h1>

    return <MapContainer
        mode={mapMode}
        object={object}
        handleSaveRoute={handleSaveRoute}
        nextNavRoutePoint={nextNavPoint || undefined}
    />;
};