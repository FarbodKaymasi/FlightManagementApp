import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Snackbar,
  Alert,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { updateFlight, deleteFlight } from "../slices/flightsSlice";

const FlightsList = () => {
  const dispatch = useDispatch();
  const flights = useSelector((state) => state.flights.flights);
  const [searchQuery, setSearchQuery] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [flightDetails, setFlightDetails] = useState({});
  const [openNotFoundDialog, setOpenNotFoundDialog] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);

  const parseDepartureTime = (departureTime) => {
    const [hours, minutes] = departureTime
      .split(":")
      .map((time) => parseInt(time, 10));
    return { hours, minutes };
  };

  const filteredFlights = flights.filter(
    (flight) => flight.flightNumber === searchQuery
  );

  useEffect(() => {
    if (filteredFlights.length > 0) {
      const flight = filteredFlights[0];
      if (flightDetails.flightNumber !== flight.flightNumber) {
        const parsedTime = parseDepartureTime(flight.departureTime);
        setFlightDetails({
          ...flight,
          departureTime: parsedTime,
        });
      }
    }
  }, [filteredFlights, flightDetails]);

  const handleSearchClick = () => {
    if (filteredFlights.length > 0) {
      setOpenDialog(true);
    } else {
      setOpenNotFoundDialog(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFlightDetails({ ...flightDetails, [name]: value });
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;

    if (name === "hours" && value >= 0 && value <= 23) {
      setFlightDetails({
        ...flightDetails,
        departureTime: {
          ...flightDetails.departureTime,
          hours: value,
        },
      });
    } else if (name === "minutes" && value >= 0 && value <= 59) {
      setFlightDetails({
        ...flightDetails,
        departureTime: {
          ...flightDetails.departureTime,
          minutes: value,
        },
      });
    }
  };

  const handleUpdate = () => {
    const { hours, minutes } = flightDetails.departureTime;
    const departureTimeString = `${hours}:${minutes}`;
    dispatch(
      updateFlight({ ...flightDetails, departureTime: departureTimeString })
    );
    setOpenDialog(false);
    setOpenSuccessSnackbar(true);
  };

  const handleDelete = () => {
    dispatch(deleteFlight(flightDetails.flightNumber));
    setOpenDialog(false);
    setOpenSuccessSnackbar(true);
  };

  const handleCloseNotFoundDialog = () => setOpenNotFoundDialog(false);
  const handleCloseSuccessSnackbar = () => setOpenSuccessSnackbar(false);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "89vh",
        padding: 3,
        background: "linear-gradient(to right, #141e30, #243b55)",
        color: "#fff",
      }}
    >
      <Box sx={{ width: "100%", maxWidth: 600, textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: "bold", color: "#76c7c0", mb: 3 }}
        >
          مدیریت پرواز
        </Typography>

        <Box
          sx={{
            backgroundColor: "#2a3b54",
            padding: 3,
            borderRadius: 2,
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
            mb: 3,
          }}
        >
          <TextField
            label="شماره پرواز"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            sx={{
              mb: 2,
              backgroundColor: "#2a3b54",
              "& .MuiOutlinedInput-root": { color: "#fff" },
              "& .MuiInputLabel-root": { color: "#76c7c0" },
              "& .MuiOutlinedInput-root:hover": {
                borderColor: "#76c7c0",
              },
            }}
          />

          <Button
            variant="contained"
            onClick={handleSearchClick}
            sx={{
              width: "100%",
              background: "#76c7c0",
              "&:hover": { background: "#5ba99c" },
              borderRadius: 1,
              padding: "12px 0",
            }}
          >
            جستجو
          </Button>
        </Box>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle sx={{ backgroundColor: "#243b55", color: "#fff" }}>
            ویرایش پرواز
          </DialogTitle>
          <DialogContent sx={{ backgroundColor: "#2a3b54", color: "#fff" }}>
            <TextField
              label="نام خلبان"
              name="pilotName"
              value={flightDetails.pilotName || ""}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{
                mt: 4,
                mb: 3,
                backgroundColor: "#2a3b54",
                "& .MuiOutlinedInput-root": { color: "#fff" },
                "& .MuiInputLabel-root": { color: "#76c7c0" },
              }}
            />
            <TextField
              label="تعداد مسافران"
              name="passengers"
              value={flightDetails.passengers || ""}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{
                mb: 3,
                backgroundColor: "#2a3b54",
                "& .MuiOutlinedInput-root": { color: "#fff" },
                "& .MuiInputLabel-root": { color: "#76c7c0" },
              }}
            />
            <TextField
              label="مبدا"
              name="origin"
              value={flightDetails.origin || ""}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{
                mb: 3,
                backgroundColor: "#2a3b54",
                "& .MuiOutlinedInput-root": { color: "#fff" },
                "& .MuiInputLabel-root": { color: "#76c7c0" },
              }}
            />
            <TextField
              label="مقصد"
              name="destination"
              value={flightDetails.destination || ""}
              onChange={handleChange}
              fullWidth
              variant="outlined"
              sx={{
                mb: 3,
                backgroundColor: "#2a3b54",
                "& .MuiOutlinedInput-root": { color: "#fff" },
                "& .MuiInputLabel-root": { color: "#76c7c0" },
              }}
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="ساعت"
                name="hours"
                value={flightDetails.departureTime?.hours || ""}
                onChange={handleTimeChange}
                fullWidth
                variant="outlined"
                inputProps={{ min: 0, max: 23 }}
                sx={{
                  mb: 3,
                  backgroundColor: "#2a3b54",
                  "& .MuiOutlinedInput-root": { color: "#fff" },
                  "& .MuiInputLabel-root": { color: "#76c7c0" },
                }}
              />

              <TextField
                label="دقیقه"
                name="minutes"
                value={flightDetails.departureTime?.minutes || ""}
                onChange={handleTimeChange}
                fullWidth
                variant="outlined"
                inputProps={{ min: 0, max: 59 }}
                sx={{
                  mb: 3,
                  backgroundColor: "#2a3b54",
                  "& .MuiOutlinedInput-root": { color: "#fff" },
                  "& .MuiInputLabel-root": { color: "#76c7c0" },
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ backgroundColor: "#243b55" }}>
            <Button
              onClick={handleUpdate}
              color="primary"
              sx={{ color: "#76c7c0" }}
            >
              ذخیره
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog open={openNotFoundDialog} onClose={handleCloseNotFoundDialog}>
          <DialogTitle>اطلاعات یافت نشد</DialogTitle>
          <DialogActions>
            <Button onClick={handleCloseNotFoundDialog} color="primary">
              بستن
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={openSuccessSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSuccessSnackbar}
        >
          <Alert
            onClose={handleCloseSuccessSnackbar}
            severity="success"
            sx={{ width: "100%" }}
          >
            تغییرات با موفقیت ذخیره شد!
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default FlightsList;
