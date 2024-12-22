import { useEffect } from "react";
import { TGetVehiclesResponse } from "./type";
import { IO_VEHICLES, socket } from "../../general/constants";
import { useVehiclesHook } from "../../general/storeHooks/useVehiclesHook";

export const useGetVehicles = () => {

    const { setVehicles } = useVehiclesHook();

    useEffect(() => {
        socket.emit(IO_VEHICLES, (resp: TGetVehiclesResponse) => {
            if (resp.status === 200) {
                setVehicles(resp.data.vehicles);
            }
        });
    }, [setVehicles]);
}