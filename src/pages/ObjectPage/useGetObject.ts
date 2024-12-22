import { useEffect } from "react";
import { TGetObjectResponse, IUseGetObjectProps } from "./type";
import { IO_OBJECT, socket } from "../../general/constants";
import { IErrorResponse } from "../../general/types";

export const useGetObject = ({ objectId = '', setObject, setError }: IUseGetObjectProps) => {

    useEffect(() => {
        const parsedObjectId = parseInt(objectId);

        if (!isNaN(parsedObjectId)) {
            socket.emit(IO_OBJECT, { id: parsedObjectId }, (resp: TGetObjectResponse | IErrorResponse) => {
                if (resp.status === 200) {
                    setObject((resp as TGetObjectResponse).data.object);
                } else {
                    setError((resp as IErrorResponse).message);
                }
            });
        }
    }, [objectId, setObject, setError]);
}