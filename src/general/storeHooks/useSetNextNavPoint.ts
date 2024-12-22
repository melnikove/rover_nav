import { create } from "zustand";
import { IExecVehicleRoutePoint } from "../../pages/ObjectPage/components/MapContainer/type";

export interface IUseSetNextNavPointState {
    nextNavPoint: IExecVehicleRoutePoint | null;
    setNextNavPoint: (point: IExecVehicleRoutePoint | null) => void;
}

export const useSetNextNavPoint = create<IUseSetNextNavPointState>()((set) => ({
    nextNavPoint: null,
    setNextNavPoint: (point: IExecVehicleRoutePoint | null) => set(() => ({ nextNavPoint: point })),
}));