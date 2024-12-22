import { io } from "socket.io-client";

export const socket = io();

export enum ERoutes {
    Index = 'index',
    Navigation = 'navigation',
}

export const routes = {
    [ERoutes.Index]: '/',
    [ERoutes.Navigation]: '/navigation',
}

export const IO_OBJECTS = 'objects';
export const IO_OBJECT = 'object';
export const IO_VEHICLES = 'vehicles';
export const IO_START_NAVIGATE = 'start_navigate';
export const IO_ONLINE = 'online';

export const CLR_OBJECT_BOUNDS = '#f51403';
export const CLR_BTN_SAVE = '#33ff7a';
export const CLR_BTN_SAVE_FONT = '#020303';
export const CLR_BTN_RESET = '#043cfb';
export const CLR_BTN_RESET_FONT = '#fafbff';
export const CLR_PLAN_ROUTE = '#f38f0a';
export const CLR_PLAN_MARKER = '#f30ac9';
export const CLR_NAV_ROUTE = '#0aaa05';

export const tilesGoogleHybrid = `https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}`;