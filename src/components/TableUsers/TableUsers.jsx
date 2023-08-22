import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../../redux/actions/usersAction";

export default function TableUsers() {

  const { users } = useSelector((state) => state.userSlice);

  console.log(users)
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: "100%" ,mb: 20}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>№</TableCell>
            <TableCell align="right">ФИО РАБОТНИКА</TableCell>
            <TableCell align="right">МЕСТОПОЛОЖЕНИЕ</TableCell>
            <TableCell align="right">УПРАВЛЕНИЕ</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users &&
            users.map((user) => (
              <TableRow
                key={user.number}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.number}
                </TableCell>
                <TableCell component="th" scope="row" align="right">
                  {user.data.name}
                </TableCell>
                <TableCell align="right">{user.data.product}</TableCell>
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
