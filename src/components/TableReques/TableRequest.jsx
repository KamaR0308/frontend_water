import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function TableRequests() {
  const localStorageRequests =
    JSON.parse(localStorage.getItem("requests")) || [];
  const donedRequests = localStorageRequests.filter(
    (request) => request.status === "doned"
  );

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
            <TableCell align="right">ДАТА НАЧАЛО</TableCell>
            <TableCell align="right">ВРЕМЯ ВЫПОЛНЕНИЯ</TableCell>
            <TableCell align="right">ФИО РАБОТНИКА</TableCell>
            <TableCell align="right">КОЛ-ВО БУТ.</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {donedRequests
            ? donedRequests.map((req, i) => (
                <TableRow
                  key={req.uuid}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {i + 1}
                  </TableCell>
                  <TableCell component="th" scope="row" align="right">
                    {req.product}
                  </TableCell>
                  <TableCell align="right">{req.shop}</TableCell>
                  <TableCell align="right">{req.site}</TableCell>
                  <TableCell align="right">{req.floor}</TableCell>
                  <TableCell align="right">{req.room}</TableCell>
                  <TableCell align="right">{req.startDate}</TableCell>
                  <TableCell align="right">{req.endData}</TableCell>
                  <TableCell align="right">{req.user}</TableCell>
                  <TableCell align="right">{req.count}</TableCell>
                </TableRow>
              ))
            : "нету выполненых заявок"}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
