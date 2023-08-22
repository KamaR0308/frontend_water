import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "../../redux/actions/locationAction";
import MyCard from "../../components/Card/Card";
import s from "./Dashboard.module.scss";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  Typography,
} from "@mui/material";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

const Dashboard = () => {
  const [open, setOpen] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [isStarted, setIsStarted] = React.useState(false)
  const [form, setForm] = React.useState({ select: "", age: 0 });
  const [timerRunning, setTimerRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const { users } = useSelector((state) => state.userSlice);
  const { locations, error, isLoading } = useSelector(
    (state) => state.locationSlice
  );

  useEffect(() => {
    let interval;

    if (timerRunning) {
      interval = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [timerRunning]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };
  const dispatch = useDispatch();
  const [isFinished, setIsFinished] = useState([]);
  useEffect(() => {
    dispatch(getLocation());
  }, []);

  useEffect(() => {
    const localStorageRequests =
      JSON.parse(localStorage.getItem("requests")) || [];
    const activeRequests = localStorageRequests.filter(
      (request) => request.status === "active" || request.status === "progress"
    );

    if (activeRequests.length > 0) {
      setTimerRunning(true);
    } else {
      setTimerRunning(false);
    }
  }, []);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const handleStartClick = (id_now) => {
    const localStorageRequests =
      JSON.parse(localStorage.getItem("requests")) || [];
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate() < 10 ? "0" : ""
      }${currentDate.getDate()}-${currentDate.getMonth() + 1 < 10 ? "0" : ""}${currentDate.getMonth() + 1
      }/${currentDate.getHours()}:${currentDate.getMinutes()}`;

    const updatedRequests = localStorageRequests.map((request) => {
      if (request.id_now === id_now) {
        return {
          ...request,
          status: "progress",
          startDate: formattedDate,
        };
      }
      return request;
    });

    // Установить timerRunning в true перед обновлением localStorage
    setTimerRunning(true);

    localStorage.setItem("requests", JSON.stringify(updatedRequests));
    setOpen(false);

    setElapsedTime(0);
    setIsStarted(true)
    handleDialogClose()
  };

  const handleEndClick = (id_now) => {
    const localStorageRequests =
      JSON.parse(localStorage.getItem("requests")) || [];
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate() < 10 ? "0" : ""
      }${currentDate.getDate()}-${currentDate.getMonth() + 1 < 10 ? "0" : ""}${currentDate.getMonth() + 1
      }/${currentDate.getHours()}:${currentDate.getMinutes()}`;

    const updatedRequests = localStorageRequests.map((request) => {
      if (request.id_now === id_now) {
        return { ...request, status: "doned", endData: formattedDate };
      }
      return request;
    });
    localStorage.setItem("requests", JSON.stringify(updatedRequests));
    handleDialogClose()
  };

  const renderCardsFromLocalStorage = () => {
    const localStorageRequests =
      JSON.parse(localStorage.getItem("requests")) || [];
    const activeRequests = localStorageRequests.filter(
      (request) => request.status === "active" || request.status === "progress"
    );

    return activeRequests.map((request) => (
      <Card sx={{ mb: 2 }} key={request.id_now}>
        <CardContent>
          <Typography>
            Производство: {request.product}
            <br />
            Цех: {request.shop}
          </Typography>
          <Typography>
            Участок: {request.site}
            <br />
            Этаж: {request.floor}
          </Typography>
          <br />
          Cотрдник: {request.user ? request.user : "нет"} <br /> Кол-во:{" "}
          {request.count ? request.count : "нет"}
          {request.status === "progress" && (
            <Typography style={{ marginTop: "10px" }}>
              Прошло времени:{" "}
              {Math.floor(elapsedTime / 60)
                .toString()
                .padStart(2, "0")}
              :{(elapsedTime % 60).toString().padStart(2, "0")}
            </Typography>
          )}
        </CardContent>
        <CardActions>
          {request.status === "active" ? (
            <Button onClick={handleDialogOpen}>
              Взять
            </Button>
          ) : (
            <Button onClick={handleDialogOpen}>
              Завершить
            </Button>
          )}
        </CardActions>
        <Dialog
          open={dialogOpen}
          onClose={handleDialogClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Вы подтверждаете?"}
          </DialogTitle>
          <DialogActions>
            <Button onClick={handleDialogClose}>Нет</Button>
            {
              isStarted
                ?
                <Button onClick={() => handleEndClick(request.id_now)} autoFocus>
                  Да 
                </Button>
                :
                <Button onClick={() => handleStartClick(request.id_now)} autoFocus>
                  Да 
                </Button>
            }
          </DialogActions>
        </Dialog>
      </Card>
    ));
  };

  return (
    <div className="container">
      <div className={s.wrap}>
        {isLoading && <h1> Идет загрузка</h1>}
        <div className={s.content_dashboard}>
          {locations &&
            locations.map((location) => {
              return <MyCard key={location.number} location={location} />;
            })}
        </div>
        {error && <h1> Ошибка </h1>}
        <hr
          style={{
            width: "5px",
            marginRight: "10px",
            marginLeft: "10px",
            backgroundColor: "green",
          }}
        />
        {localStorage.getItem("requests") ? (
          <div>
            <Typography variant="h6">Активные заявки</Typography>
            {renderCardsFromLocalStorage()}
          </div>
        ) : (
          <Typography variant="h6">Нет активных заявок</Typography>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
