import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getLocation } from "../../redux/actions/locationAction";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { getUsers } from "../../redux/actions/usersAction";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";


const DetailCard = () => {
  const { uuid } = useParams();
  const dispatch = useDispatch();
  const [selectedLocation, setSelectedLocation] = useState({
    data: {
      floor: "",
      id: "",
      product: "",
      room: "",
      shop: "",
      site: "",
    },
    number: 1,
    uuid: "",
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const [form, setForm] = useState({
    select: "",
    age: 0,
  });


  // Поиск объекта с нужным uuid

  const foundLocation = locations.find((location) => location.uuid === uuid);

  useEffect(() => {
    if (foundLocation) {
      setSelectedLocation(foundLocation);
    }
  }, [foundLocation]);

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };


  console.log(users);
  const steps = [
    {
      label: "Производство",
      description: `${selectedLocation.data.product}`,
    },
    {
      label: "Цех",
      description: `${selectedLocation.data.site}`,
    },
    {
      label: "Участок",
      description: `${selectedLocation.data.floor}`,
    },
    {
      label: "Этаж",
      description: `${selectedLocation.data.room}`,
    },
  ];

  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const navigate = useNavigate()

  const handleReset = () => {
    const existingRequests = JSON.parse(localStorage.getItem("requests")) || [];

    const newRequest = {
      product: selectedLocation.data.product,
      shop: selectedLocation.data.shop,
      site: selectedLocation.data.site,
      floor: selectedLocation.data.floor,
      room: selectedLocation.data.room,
      uuid: selectedLocation.uuid,
      user: form.select,
      count: form.age,
      status: 'active'
    };

    existingRequests.push(newRequest);
    localStorage.setItem("requests", JSON.stringify(existingRequests));
    setSnackbarMessage('успешно создано')
    setSnackbarOpen(true)

    setTimeout(() => {
      navigate('/dashboard')
    }, 1000)
  };

  return (
    <div className="container">
      <Box sx={{ maxWidth: 400 }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps &&
            steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel
                  optional={
                    index === 3 ? (
                      <Typography variant="caption">данные о заявке</Typography>
                    ) : null
                  }
                >
                  {step.label !== undefined ? step.label : <></>}
                </StepLabel>
                <StepContent>
                  <Typography>
                    {step.description && step.description}
                  </Typography>
                  {index === steps.length - 1 && (
                    <Box sx={{ mb: 10 }}>
                      <h3 style={{ marginTop: "30px" }}>Заполните заявку</h3>
                      <FormControl sx={{ mt: 3 }} fullWidth>
                        <InputLabel id="demo-simple-select-label">
                          User
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select"
                          value={form.select}
                          label="Age"
                          onChange={(e) =>
                            setForm({ ...form, select: e.target.value })
                          }
                        >
                          {users &&
                            users.map((user) => (
                              <MenuItem key={user.uuid} value={user.data.name}>
                                {user.data.name && user.data.name}
                              </MenuItem>
                            ))}
                        </Select>
                      </FormControl>

                      <TextField
                        label="Выберите количество бутылок"
                        value={form.age}
                        onChange={(e) =>
                          setForm({ ...form, age: e.target.value })
                        }
                        sx={{ mt: 2 }}
                        fullWidth
                        type="number"
                      />
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
                    </Box>
                  )}
                  <Box sx={{ mb: 2 }}>
                    <div>
                      {
                        index === steps.length - 1
                          ?
                            <Button
                              variant="contained"
                              onClick={handleReset}
                              sx={{ mt: 1, mr: 1 }}
                            >
                              Finish
                            </Button>
                          :
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            continue
                          </Button>
                      }
                      <Button
                        disabled={index === 0}
                        onClick={handleBack}
                        sx={{ mt: 1, mr: 1 }}
                      >
                        Back
                      </Button>
                    </div>
                  </Box>
                </StepContent>
              </Step>
            ))}
        </Stepper>
        {activeStep === steps.length && (
          <Paper square elevation={0} sx={{ p: 3 }}>
            <Typography sx={{ mt: 1, ml: 1 }}>
              {" "}
              Вы успешно создали заявку!{" "}
            </Typography>

            <Link to="/dashboard">
              <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                Перейти
              </Button>
            </Link>
          </Paper>
        )}
      </Box>

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
    </div >
  );
};

export default DetailCard;
