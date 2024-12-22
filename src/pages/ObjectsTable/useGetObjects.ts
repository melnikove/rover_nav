import { useEffect, useState } from "react";
import { TGetObjectsResponse, IObject } from "./types";
import { IO_OBJECTS, socket } from "../../general/constants";

export const useGetObjects = () => {
    const [data, setData] = useState<IObject[]>([]);

    useEffect(() => {
        socket.emit(IO_OBJECTS, (resp: TGetObjectsResponse) => {
            if (resp.status === 200) {
                setData(resp.data.objects);
            }
        });
    }, []);

    return { data };
}