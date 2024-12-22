import { create } from "zustand";
import { IObject } from "../../pages/ObjectsTable/types";

export interface IUseObjectHook {
    object: IObject | null;
    setObject: (obj: IObject | null) => void;
}

export const useObjectHook = create<IUseObjectHook>()((set) => ({
    object: null,
    setObject: (data: IObject | null) => set(() => ({ object: data })),
}));