import { LatLng } from "leaflet";
import { IObject } from "../../../ObjectsTable/types";
import { IVehicle } from "../../type";

export enum EMapMode {
    PlanVehicleRoute = 'PlanVehicleRoute',
    ExecVehicleRoute = 'ExecVehicleRoute',
}

export interface IExecVehicleRoutePoint {
    vehicleId: IVehicle["id"];
    location: LatLng[];
}

export interface IMapContainerProps {
    mode: EMapMode;
    object: IObject | null;
    handleSaveRoute: (points: LatLng[]) => void;
    nextNavRoutePoint?: IExecVehicleRoutePoint;
}