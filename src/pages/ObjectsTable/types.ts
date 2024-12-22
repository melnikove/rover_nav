import { LatLng } from "leaflet";
import { ISuccessResponse } from "../../general/types";

export interface IObject {
    id: number;
    name: string;
    boundary: Array<LatLng>;
}

export type TGetObjectsResponse = ISuccessResponse<{ objects: IObject[] }>;