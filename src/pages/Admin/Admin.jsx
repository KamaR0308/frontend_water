import React, { useEffect, useState } from "react";
import VerticalTabs from "../../components/Tabs/Tabs";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import s from "./Admin.module.scss";
import { TextField } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { createUser } from "../../redux/actions/usersAction";
import {
  createLocation,
  getLocation,
} from "../../redux/actions/locationAction";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  borderRadius: "20px",
};

const Admin = () => {
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [user, setUser] = useState("");
  const [production, setProduction] = useState("");
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [locatino, setLocation] = useState({
    product: "",
    shop: "",
    site: "",
    floor: "",
    room: "",
    id: "",
  });
  useEffect(() => {
    dispatch(getLocation());
  }, []);

  const handleCreateLocation = () => {
    dispatch(createLocation(locatino)); // Здесь предполагается, что у вас есть операция createLocation
    setSnackbarOpen(true);
    setSnackbarMessage("Местоположение создано успешно!");
    setSnackbarSeverity("success");
    setLocation({
      product: "",
      shop: "",
      site: "",
      floor: "",
      room: "",
    });
  };

  const { locations } = useSelector((state) => state.locationSlice);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <div className="container">
      <VerticalTabs />

      <div className={s.admin_btn}>
        <Button onClick={() => setOpen(!open)}>Cоздать Местоположение</Button>
        <Button onClick={() => setOpen2(!open2)}>Cоздать Пользователя</Button>
      </div>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            className={s.modalOne}
            fullWidth
            id="outlined-basic"
            label="Производство"
            variant="outlined"
            value={locatino.product}
            onChange={(e) =>
              setLocation({ ...locatino, product: e.target.value })
            }
          />

          <TextField
            className={s.modalOne}
            fullWidth
            id="outlined-basic"
            label="Цех"
            variant="outlined"
            value={locatino.shop}
            onChange={(e) => setLocation({ ...locatino, shop: e.target.value })}
          />
          <TextField
            className={s.modalOne}
            fullWidth
            id="outlined-basic"
            label="Участок"
            variant="outlined"
            value={locatino.site}
            onChange={(e) => setLocation({ ...locatino, site: e.target.value })}
          />
          <TextField
            className={s.modalOne}
            fullWidth
            id="outlined-basic"
            label="Этаж"
            variant="outlined"
            value={locatino.floor}
            onChange={(e) =>
              setLocation({ ...locatino, floor: e.target.value })
            }
          />
          <TextField
            className={s.modalOne}
            fullWidth
            id="outlined-basic"
            label="Комната"
            variant="outlined"
            value={locatino.room}
            onChange={(e) => setLocation({ ...locatino, room: e.target.value })}
          />
          <Button
            onClick={() => handleCreateLocation()}
            className={s.modal_btn}
            fullWidth
          >
            Cоздать
          </Button>
        </Box>
      </Modal>

      {/* Create User Modal */}
      <Modal
        open={open2}
        onClose={() => setOpen2(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <TextField
            className={s.modalOne}
            fullWidth
            id="outlined-basic"
            value={user}
            onChange={(e) => setUser(e.target.value)}
            label="Name"
            variant="outlined"
          />
          <FormControl fullWidth sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-helper-label">Product</InputLabel>
            <Select
              labelId="demo-simple-select-helper-label"
              id="demo-simple-select-helper"
              value={production}
              label="Product"
              onChange={(e) => setProduction(e.target.value)}
            >
              {locations &&
                locations.map((location) => (
                  <MenuItem key={location.data.id} value={location.number}>
                    {location.data.product}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <Button
            onClick={() => {
              dispatch(createUser({ production, user }));
              setSnackbarOpen(true);
              setSnackbarMessage("Пользователь создан успешно!");
              setSnackbarSeverity("success");
            }}
            sx={{ mt: 3 }}
            className={s.modal_btn}
            fullWidth
          >
            Cоздать
          </Button>
        </Box>
      </Modal>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
      >
        <MuiAlert
          elevation={6}
          variant="filled"
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
        >
          {snackbarMessage}
        </MuiAlert>
      </Snackbar>
    </div>
  );
};

export default Admin;
