import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addFlight } from "../slices/flightsSlice";
import { TextField, Button, Box, Grid, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const AddFlight = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [flight, setFlight] = useState({
    pilotName: "",
    flightNumber: "",
    departureTime: { hours: "", minutes: "" },
    passengers: 0,
    origin: "",
    destination: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlight({ ...flight, [name]: value });
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;

    if (name === "hours" && value >= 0 && value <= 23) {
      setFlight({
        ...flight,
        departureTime: {
          ...flight.departureTime,
          [name]: value,
        },
      });
    } else if (name === "minutes" && value >= 0 && value <= 59) {
      setFlight({
        ...flight,
        departureTime: {
          ...flight.departureTime,
          [name]: value,
        },
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const timeString = `${flight.departureTime.hours}:${flight.departureTime.minutes}`;
    const updatedFlight = { ...flight, departureTime: timeString };
    dispatch(addFlight(updatedFlight));
    navigate("/flights-list");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "89vh",
        padding: 3,
        background: "linear-gradient(to right, #141e30, #243b55)",
        color: "#ffffff",
      }}
    >
      <Box sx={{ maxWidth: 600, margin: "auto", padding: 3 }}>
        <Paper
          sx={{
            padding: 3,
            borderRadius: 2,
            boxShadow: 3,
            background: "#ffffff",
            color: "#000000",
          }}
        >
          <Typography variant="h4" gutterBottom align="center">
            افزودن پرواز جدید
          </Typography>

          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="نام خلبان"
                  name="pilotName"
                  value={flight.pilotName}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  required
                  inputProps={{
                    pattern: "[A-Za-z\u0600-\u06FF ]+",
                    title: "فقط حروف مجاز هستند",
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="شماره پرواز"
                  name="flightNumber"
                  value={flight.flightNumber}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  required
                  inputProps={{
                    pattern: "[0-9\u06F0-\u06F9 ]+",
                    title: "فقط اعداد مجاز هستند",
                  }}
                />
              </Grid>

              <Grid item xs={6} sm={3}>
                <TextField
                  label="ساعت"
                  name="hours"
                  type="number"
                  value={flight.departureTime.hours}
                  onChange={handleTimeChange}
                  fullWidth
                  variant="outlined"
                  required
                  inputProps={{ min: 0, max: 23 }}
                  placeholder="00"
                />
              </Grid>

              <Grid item xs={6} sm={3}>
                <TextField
                  label="دقیقه"
                  name="minutes"
                  type="number"
                  value={flight.departureTime.minutes}
                  onChange={handleTimeChange}
                  fullWidth
                  variant="outlined"
                  required
                  inputProps={{ min: 0, max: 59 }}
                  placeholder="00"
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="تعداد مسافران"
                  name="passengers"
                  type="number"
                  value={flight.passengers}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  required
                  inputProps={{
                    min: 1,
                    max: 200,

                    pattern: "[0-9 ]+",
                    title: "فقط اعداد مجاز هستند",
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="شهر مبدا"
                  name="origin"
                  value={flight.origin}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  required
                  inputProps={{
                    pattern: "[A-Za-z\u0600-\u06FF ]+",
                    title: "فقط حروف مجاز هستند",
                  }}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  label="شهر مقصد"
                  name="destination"
                  value={flight.destination}
                  onChange={handleChange}
                  fullWidth
                  variant="outlined"
                  required
                  inputProps={{
                    pattern: "[A-Za-z\u0600-\u06FF ]+",
                    title: "فقط حروف مجاز هستند",
                  }}
                />
              </Grid>
            </Grid>

            <Box sx={{ textAlign: "center", marginTop: 3 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ width: "100%" }}
              >
                افزودن پرواز
              </Button>
            </Box>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default AddFlight;
