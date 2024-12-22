import { create } from "zustand";
import { IVehicle } from "../../pages/ObjectPage/type";

export interface IUseVehiclesState {
    vehicles: IVehicle[];
    setVehicles: (data: IVehicle[]) => void;
    reset: () => void;
}

export const useVehiclesHook = create<IUseVehiclesState>()((set) => ({
    vehicles: [],
    setVehicles: (data: IVehicle[]) => set(() => ({ vehicles: data })),
    reset: () => set(() => ({ vehicles: [] })),
}));