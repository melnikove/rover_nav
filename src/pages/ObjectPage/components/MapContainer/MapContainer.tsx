import { FC, useCallback, useEffect, useRef, useState } from "react";
import { EMapMode, IExecVehicleRoutePoint, IMapContainerProps } from "./type";
import { useInitMap } from "./useInitMap";
import { useDrawObject } from "./useDrawObject";
import L, { DivIcon, LatLng, LeafletMouseEvent, Marker, Polyline } from "leaflet";

import * as turf from "@turf/turf";
import { CLR_BTN_RESET, CLR_BTN_RESET_FONT, CLR_BTN_SAVE, CLR_BTN_SAVE_FONT, CLR_NAV_ROUTE, CLR_PLAN_MARKER } from "../../../../general/constants";

const markerStyle = `
    height: 20px; 
    width: 20px; 
    background-color: ${CLR_PLAN_MARKER}; 
    border-radius: 50%;
    margin-left: -25%;
    margin-top: -25%; 
`;

export const MapContainer: FC<IMapContainerProps> = ({ mode, object, handleSaveRoute, nextNavRoutePoint }) => {

    const routePointsRef = useRef<LatLng[]>([]);

    const mapInstance = useInitMap();

    const lastMarkerRef = useRef<Marker>();

    const linesRef = useRef<Array<Polyline | null>>([]);
    const markersRef = useRef<Marker[]>([]);

    const [prevNavPoint, setPrevNavPoint] = useState<IExecVehicleRoutePoint | null>(null);

    useDrawObject(object, mapInstance);

    useEffect(() => {
        if (mapInstance && mode === EMapMode.ExecVehicleRoute) {
            markersRef.current.forEach((marker: Marker) => marker.removeFrom(mapInstance));
            markersRef.current = [];
        }

    }, [mode, markersRef, linesRef, mapInstance]);

    const handleSaveRouteRef = useRef(() => {
        handleSaveRoute(routePointsRef.current);
    });

    const handleReset = useCallback(() => {
        if (mapInstance) {
            markersRef.current.forEach((marker: Marker) => marker.removeFrom(mapInstance!));
            linesRef.current.forEach((line: Polyline | null) => {
                if (line) {
                    line.removeFrom(mapInstance!)
                }
            });
            markersRef.current = [];
            linesRef.current = [];
            routePointsRef.current = [];
            setPrevNavPoint(null);
        }

    }, [mapInstance]);

    const handleAddRoutePoint = useCallback((event: LeafletMouseEvent) => {
        const point = turf.point([event.latlng.lat, event.latlng.lng]);
        const boundary = object?.boundary;

        if (!boundary) return;
        const searchWithin = turf.polygon(
            [[
                [boundary[0].lat, boundary[0].lng],
                [boundary[0].lat, boundary[1].lng],
                [boundary[1].lat, boundary[1].lng],
                [boundary[1].lat, boundary[0].lng],
                [boundary[0].lat, boundary[0].lng],
            ]]
        );
        const isWithin = !!turf.pointsWithinPolygon(point, searchWithin).features.length;

        if (!isWithin) return;

        if (routePointsRef) {
            routePointsRef.current = [...routePointsRef.current, event.latlng];
        }

        const marker = L.marker(
            event.latlng,
            {
                icon: new DivIcon({
                    html: `<div id="marker-${routePointsRef.current.length}" style="${markerStyle}" />`
                })
            });

        markersRef.current.push(marker);
        lastMarkerRef.current?.unbindPopup();
        lastMarkerRef.current = marker;

        const routePoints = routePointsRef.current;
        const line = routePointsRef.current.length > 1 ? new L.Polyline([routePoints[routePoints.length - 2], event.latlng], { color: 'orange', weight: 8 }) : null;
        linesRef.current.push(line);

        if (mapInstance) {
            mapInstance.addLayer(marker);

            if (routePointsRef.current.length > 1) {
                marker.bindPopup(
                    `<div style="display: flex; flex-direction: column; padding: 10px 0">
                    <button 
                        style="background-color: ${CLR_BTN_SAVE}; color: ${CLR_BTN_SAVE_FONT}; margin-bottom: 10px" 
                        id="marker-button-${routePointsRef.current.length}">
                            Save
                    </button>
                    <button 
                        style="background-color: ${CLR_BTN_RESET}; color: ${CLR_BTN_RESET_FONT}" 
                        id="reset-button-${routePointsRef.current.length}">
                            RESET
                    </button>
                    </div>`);

                marker.openPopup(event.latlng);
            }

            if (line) {
                mapInstance.addLayer(line);
            }

            if (routePointsRef.current.length) {
                document.querySelector(`#marker-button-${routePointsRef.current.length}`)?.addEventListener('click', () => (handleSaveRouteRef.current)());
                document.querySelector(`#reset-button-${routePointsRef.current.length}`)?.addEventListener('click', () => handleReset());

            }

        }
    }, [handleReset, mapInstance, object?.boundary]);

    useEffect(() => {
        if (mapInstance) {
            if (mode === EMapMode.PlanVehicleRoute) {
                mapInstance.on('click', handleAddRoutePoint);
            } else if (mode === EMapMode.ExecVehicleRoute) {
                mapInstance.off('click', handleAddRoutePoint)
            }
        }
    }, [mode, mapInstance, handleAddRoutePoint]);

    useEffect(() => {
        if (!prevNavPoint && nextNavRoutePoint) {
            setPrevNavPoint(nextNavRoutePoint);
        } else if (mapInstance && prevNavPoint && nextNavRoutePoint) {

            const line = new L.Polyline([
                prevNavPoint.location,
                nextNavRoutePoint.location
            ], { color: CLR_NAV_ROUTE, weight: 16 });
            linesRef.current.push(line);

            setPrevNavPoint(nextNavRoutePoint);

            line.addTo(mapInstance);
        }
    }, [mapInstance, nextNavRoutePoint, prevNavPoint]);

    return (<>
        <div id={"map"} style={{
            height: '100vh',
            width: '100vw',
        }} />
    </>);
};
