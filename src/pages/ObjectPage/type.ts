import { Dispatch, SetStateAction } from "react";
import { IObject } from "../ObjectsTable/types";
import { ISuccessResponse } from "../../general/types";

export type TGetObjectResponse = ISuccessResponse<{ object: IObject }>;

export interface IVehicle {
    id: number;
    name: string;
    objectId: number;
}

export type TGetVehiclesResponse = ISuccessResponse<{ vehicles: IVehicle[] }>;


export interface IUseGetObjectProps {
    objectId?: string;
    setError: Dispatch<SetStateAction<string>>;
}