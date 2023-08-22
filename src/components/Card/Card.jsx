import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useDispatch, useSelector } from "react-redux";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Snackbar,
  Alert,
} from "@mui/material";
import { getLocation } from "../../redux/actions/locationAction";
import { getUsers } from "../../redux/actions/usersAction";
import { useEffect, useState } from "react";

export default function MyCard({ location }) {
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = useState({ select: "", age: 0 });
  const [notificationOpen, setNotificationOpen] = useState(false);

  const { users } = useSelector((state) => state.userSlice);

  const dispatch = useDispatch();

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  useEffect(() => {
    dispatch(getUsers());
  }, []);

  const addLocationToLocalStorage = () => {
    const existingRequests = JSON.parse(localStorage.getItem("requests")) || [];

    console.log(location.data.product)
    const newRequest = {
      product: location.data.product,
      shop: location.data.shop,
      site: location.data.site,
      floor: location.data.floor,
      room: location.data.room,
      uuid: location.uuid,
      user: form.select,
      count: form.age,
      status: "active",
      id_now: Date.now(),
    };


    existingRequests.push(newRequest);
    // console.log(newRequest)
    localStorage.setItem("requests", JSON.stringify(existingRequests));

    setNotificationOpen(true);
  };

  const filteredUsers = users.filter(
    (user) => user.data.product === location.data.product
  );

  return (
    <>
      <Card sx={{ minWidth: 180, marginBottom: "20px" }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Производство : {location.data.product || "отсутствует"}
          </Typography>
          <Typography variant="h6" sx={{ fontSize: 18 }} color={'text.secondary'} >
            Цех: {location.data.shop || "отсутствует"}
          </Typography>
          <Typography sx={{ mb: 1.5, mt: 1.5 }} color="text.secondary">
            Участок: {location.data.site || "отсутствует"}
          </Typography>
          <Typography variant="body2" color={'text.secondary'}>Этаж: {location.data.floor || "отсутствует"}</Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleOpen} size="small">
            Заказать воду
          </Button>
        </CardActions>
      </Card>
      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Box sx={{ mb: 2 }}>
            <h3 style={{ marginTop: "30px" }}>Заполните заявку</h3>
            <FormControl sx={{ mt: 3 }} fullWidth>
              <InputLabel id="demo-simple-select-label">User</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={form.select}
                label="Age"
                onChange={(e) => setForm({ ...form, select: e.target.value })}
              >
                {users &&
                  filteredUsers.map((user) => (
                    <MenuItem key={user.uuid} value={user.data.name}>
                      {user.data.name && user.data.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>

            <TextField
              label="Выберите количество бутылок"
              value={form.age}
              onChange={(e) => setForm({ ...form, age: e.target.value })}
              sx={{ mt: 2 }}
              fullWidth
              type="number"
            />
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <Button
                onClick={() => setForm({ ...form, age: form.age + 1 })}
                sx={{ mt: 1, mr: 1 }}
              >
                +1
              </Button>
              <Button
                onClick={() => setForm({ ...form, age: form.age + 5 })}
                sx={{ mt: 1, mr: 1 }}
              >
                +5
              </Button>
              <Button
                onClick={() => setForm({ ...form, age: form.age - 5 })}
                sx={{ mt: 1, mr: 1 }}
              >
                -5
              </Button>
              <Button
                onClick={() => setForm({ ...form, age: form.age - 1 })}
                sx={{ mt: 1, mr: 1 }}
              >
                -1
              </Button>
            </div>

            <Button
              sx={{ mt: 2, mb: 0 }}
              fullWidth
              onClick={() => {
                addLocationToLocalStorage()
                window.location.reload()
              }}
            >
              Подать заявку
            </Button>
          </Box>
        </Box>
      </Modal>
      <Snackbar
        open={notificationOpen}
        autoHideDuration={4000}
        onClose={() => setNotificationOpen(false)}
      >
        <Alert
          onClose={() => setNotificationOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Заявка успешно подана!
        </Alert>
      </Snackbar>
    </>
  );
}
