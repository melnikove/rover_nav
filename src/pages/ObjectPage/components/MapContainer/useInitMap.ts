import L from "leaflet";
import { useEffect, useRef } from "react";
import { tilesGoogleHybrid } from "../../../../general/constants";

export const useInitMap = () => {
    const mapRef = useRef<L.Map>();

    useEffect(() => {
        const mapInstance = L
            .map('map', { attributionControl: false })
            .setView([49.2125578, 16.62662018], 14);
        mapRef.current = mapInstance;

        L.tileLayer(tilesGoogleHybrid, {
            tileSize: 512,
            zoomOffset: -1,
            minZoom: 1,
            maxZoom: 30,
            crossOrigin: true
        }).addTo(mapInstance);

    }, []);

    return mapRef.current;
}