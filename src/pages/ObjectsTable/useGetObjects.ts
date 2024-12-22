import { useEffect } from "react";
import { TGetObjectsResponse } from "./types";
import { IO_OBJECTS, socket } from "../../general/constants";
import { useObjectsHook } from "../../general/storeHooks/useObjectsHook";

export const useGetObjects = () => {

    const { setObjectsTable } = useObjectsHook(state => state);

    useEffect(() => {
        if (setObjectsTable) {
            socket.emit(IO_OBJECTS, (resp: TGetObjectsResponse) => {
                if (resp.status === 200) {
                    setObjectsTable(resp.data.objects)
                }
            });
        }

    }, [setObjectsTable]);
}