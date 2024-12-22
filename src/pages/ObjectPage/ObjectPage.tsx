import { useParams } from "react-router";
import { useGetObject } from "./useGetObject";
import { useCallback, useEffect, useRef, useState } from "react";
import { LatLng } from "leaflet";
import { useGetVehicles } from "./useGetVehicles";

import { MapContainer } from "./components/MapContainer/MapContainer";
import { EMapMode, IExecVehicleRoutePoint } from "./components/MapContainer/type";
import { IVehicle } from "./type";
import { IObject } from "../ObjectsTable/types";
import { IO_ONLINE, IO_START_NAVIGATE, socket } from "../../general/constants";

export const ObjectPage = () => {


    const [mapMode, setMapMode] = useState<EMapMode>(EMapMode.PlanVehicleRoute);

    const [object, setObject] = useState<IObject | null>(null);
    const [vehicles, setVehicles] = useState<IVehicle[]>([]);

    const [error, setError] = useState('');

    const [nextNavRoutePoint, setNextNavRoutePoint] = useState<IExecVehicleRoutePoint | null>(null);

    const vehicleRef = useRef<IVehicle>();

    useEffect(() => {
        const vehicle = vehicles.find(({ objectId }) => objectId === object?.id);
        if (vehicle) {
            vehicleRef.current = vehicle;
        }
    }, [object, vehicles])

    const { objectId } = useParams();

    useGetObject({ objectId, setObject, setError });

    useGetVehicles({ setVehicles });

    useEffect(() => {
        return () => {
            socket.off(IO_ONLINE);
        }
    }, []);

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
                            setNextNavRoutePoint(data);
                        },
                    );
                },
            );
        }
    }, [vehicleRef, setNextNavRoutePoint]);

    if (error) return <h1 style={{ width: '100%' }}>{error}</h1>

    return <MapContainer
        mode={mapMode}
        object={object}
        handleSaveRoute={handleSaveRoute}
        nextNavRoutePoint={nextNavRoutePoint || undefined}
    />;
};