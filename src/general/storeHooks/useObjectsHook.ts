import { create } from "zustand";
import { IObject } from "../../pages/ObjectsTable/types";

export interface IUseObjectsState {
    objectsTable: IObject[];
    setObjectsTable: (data: IObject[]) => void;
    reset: () => void;
}

export const useObjectsHook = create<IUseObjectsState>()((set) => ({
    objectsTable: [],
    setObjectsTable: (data: IObject[]) => set(() => ({ objectsTable: data })),
    reset: () => set(() => ({ objectsTable: [] })),
}));