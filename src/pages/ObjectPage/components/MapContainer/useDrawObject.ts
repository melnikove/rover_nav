import L, { LatLng, LatLngBounds } from "leaflet";
import { IObject } from "../../../ObjectsTable/types";
import { useEffect } from "react";
import { CLR_OBJECT_BOUNDS } from "../../../../general/constants";

const getBoundsForZoom = (objectBoundary: Array<LatLng>) => {
    const maxLat = Math.max(objectBoundary[0].lat, objectBoundary[1].lat);
    const minLat = Math.min(objectBoundary[0].lat, objectBoundary[1].lat);
    const maxLng = Math.max(objectBoundary[0].lng, objectBoundary[1].lng);
    const minLng = Math.min(objectBoundary[0].lng, objectBoundary[1].lng);

    const height = maxLat - minLat;
    const width = maxLng - minLng;
    const deltaLat = height * 0.07;
    const deltaLng = width * 0.07;

    return [
        [maxLat + deltaLat, minLng - deltaLng],
        [minLat - deltaLat, maxLng + deltaLng]
    ] as L.LatLngBoundsExpression;
}

export const useDrawObject = (object: IObject | null, mapInstance?: L.Map) => {
    useEffect(() => {
        if (mapInstance && object) {
            mapInstance.fitBounds(getBoundsForZoom(object.boundary));
            const latLngBounds = new LatLngBounds(object.boundary[0], object.boundary[1]);
            const objectPolygon = L.rectangle(
                latLngBounds, { color: CLR_OBJECT_BOUNDS });

            objectPolygon.addTo(mapInstance);
        }
    }, [mapInstance, object]);
}