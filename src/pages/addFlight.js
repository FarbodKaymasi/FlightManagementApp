import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addFlight } from "../slices/flightsSlice";
import {
  Box,
  Typography,
  Button,
  TextField,
  Grid,
  Paper,
} from "@mui/material";
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
    if (
      (name === "hours" && value >= 0 && value <= 23) ||
      (name === "minutes" && value >= 0 && value <= 59)
    ) {
      setFlight({
        ...flight,
        departureTime: { ...flight.departureTime, [name]: value },
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const timeString = `${flight.departureTime.hours}:${flight.departureTime.minutes}`;
    dispatch(addFlight({ ...flight, departureTime: timeString }));
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
        background: "linear-gradient(to right, #0f2027, #203a43, #2c5364)",
      }}
    >
      <Paper
        sx={{
          width: "100%",
          maxWidth: 600,
          padding: 4,
          background: "rgba(255, 255, 255, 0.1)",
          borderRadius: 5,
          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography
          variant="h4"
          sx={{
            textAlign: "center",
            color: "#76c7c0",
            fontWeight: "bold",
            marginBottom: 4,
          }}
        >
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
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                  },
                  "& .MuiInputLabel-root": { color: "#76c7c0" },
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
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                  },
                  "& .MuiInputLabel-root": { color: "#76c7c0" },
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
                required
                inputProps={{ min: 0, max: 23 }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                  },
                  "& .MuiInputLabel-root": { color: "#76c7c0" },
                }}
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
                required
                inputProps={{ min: 0, max: 59 }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                  },
                  "& .MuiInputLabel-root": { color: "#76c7c0" },
                }}
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
                required
                inputProps={{ min: 0, max: 200 }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                  },
                  "& .MuiInputLabel-root": { color: "#76c7c0" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="مبدا"
                name="origin"
                value={flight.origin}
                onChange={handleChange}
                fullWidth
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                  },
                  "& .MuiInputLabel-root": { color: "#76c7c0" },
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="مقصد"
                name="destination"
                value={flight.destination}
                onChange={handleChange}
                fullWidth
                required
                sx={{
                  "& .MuiOutlinedInput-root": {
                    background: "rgba(255, 255, 255, 0.1)",
                    color: "#fff",
                  },
                  "& .MuiInputLabel-root": { color: "#76c7c0" },
                }}
              />
            </Grid>
          </Grid>

          <Box sx={{ textAlign: "center", marginTop: 3 }}>
            <Button
              type="submit"
              sx={{
                width: "100%",
                background: "linear-gradient(to right, #76c7c0, #4cafaa)",
                color: "#fff",
                fontWeight: "bold",
                padding: "12px 0",
                borderRadius: 2,
                transition: "all 0.3s ease",
                "&:hover": {
                  background: "#5ba99c",
                  transform: "translateY(-2px)",
                },
              }}
            >
              افزودن پرواز
            </Button>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default AddFlight;
