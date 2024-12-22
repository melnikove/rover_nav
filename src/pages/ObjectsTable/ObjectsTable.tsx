import { FC } from "react";
import { IObject } from "./types";
import { useGetObjects } from "./useGetObjects";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { useNavigate } from "react-router";
import { ERoutes, routes } from "../../general/constants";

export const ObjectsTable: FC = () => {
    const { data } = useGetObjects();

    const navigate = useNavigate();

    const getBindedHandleClick = (objId: number) => {
        return () => {
            navigate(`${routes[ERoutes.Navigation]}/${objId}`);
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell><b>Name</b></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((object: IObject) => (
                        <TableRow
                            key={object.id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            onClick={getBindedHandleClick(object.id)}
                        >
                            <TableCell component="th" scope="row">
                                {object.name}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}