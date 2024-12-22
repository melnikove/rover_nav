import { useEffect } from "react";
import { TGetVehiclesResponse, IUseGetVehiclesProps } from "./type";
import { IO_VEHICLES, socket } from "../../general/constants";

export const useGetVehicles = ({ setVehicles }: IUseGetVehiclesProps) => {
    useEffect(() => {
        socket.emit(IO_VEHICLES, (resp: TGetVehiclesResponse) => {
            if (resp.status === 200) {
                setVehicles(resp.data.vehicles);
            }
        });
    }, [setVehicles]);
}