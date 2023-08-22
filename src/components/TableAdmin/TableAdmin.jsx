import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { BASE_URL } from "../../constant/constant";
import axios from "axios";
import { Button } from "@mui/material";
import { useSelector } from "react-redux";

export default function TableAdmin() {
  const {locations} = useSelector((state) => state.locationSlice);

  console.log(locations);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "100%", mb: 20 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>№</TableCell>
            <TableCell align="right">ПРОИЗВОДСТВО</TableCell>
            <TableCell align="right">ЦЕХ</TableCell>
            <TableCell align="right">УЧАСТОК</TableCell>
            <TableCell align="right">ЭТАЖ</TableCell>
            <TableCell align="right">КОМНАТА</TableCell>
            <TableCell align="right">УПРАВЛЕНИЕ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {locations &&
            locations.map((row) => (
              <TableRow
                key={locations.uuid}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.number}
                </TableCell>
                <TableCell component="th" scope="row" align="right">
                  {row.data.product}
                </TableCell>
                <TableCell align="right">{row.data.shop}</TableCell>
                <TableCell align="right">{row.data.site}</TableCell>
                <TableCell align="right">{row.data.floor}</TableCell>
                <TableCell align="right">{row.data.room}</TableCell>
                <TableCell align="right">
                  <Button>изменить</Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
