import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Avatar,
  Divider,
} from "@mui/material";
import { FlightTakeoff, PeopleAlt } from "@mui/icons-material";
import { useSelector } from "react-redux";

const FlightWithMostPassengers = () => {
  const flights = useSelector((state) => state.flights.flights);
  const [mostPassengersFlight, setMostPassengersFlight] = useState(null);

  useEffect(() => {
    if (flights.length > 0) {

      const maxPassengersFlight = flights.reduce((max, flight) =>
        flight.passengers > max.passengers ? flight : max
      );
      setMostPassengersFlight(maxPassengersFlight);
    }
  }, [flights]);

  if (!mostPassengersFlight) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "89vh",
          background: "linear-gradient(to right, #141e30, #243b55)",
          color: "#fff",
        }}
      >
        <Typography variant="h4" sx={{ color: "#76c7c0" }}>
          در حال بارگذاری اطلاعات پرواز...
        </Typography>
      </Box>
    );
  }

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
      <Card
        sx={{
          maxWidth: 600,
          width: "100%",
          background: "#2a3b54",
          borderRadius: 5,
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.4)",
          padding: 3,
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              sx={{ background: "#76c7c0", width: 56, height: 56 }}
              aria-label="flight"
            >
              <FlightTakeoff fontSize="large" />
            </Avatar>
          }
          title={
            <Typography
              variant="h5"
              sx={{
                display: "flex",
                fontWeight: "bold",
                color: "#76c7c0",
                justifyContent: "right",
                textShadow: "0 3px 6px rgba(0, 0, 0, 0.2)",
              }}
            >
              پرواز شماره {mostPassengersFlight.flightNumber}
            </Typography>
          }
        />
        <Divider sx={{ borderColor: "#76c7c0", my: 2 }} />
        <CardContent sx={{ direction: "rtl", textAlign: "right" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ color: "#aaa" }}>
                📍 مبدا:
              </Typography>
              <Typography variant="h6" sx={{ color: "#fff" }}>
                {mostPassengersFlight.origin}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ color: "#aaa" }}>
                📍 مقصد:
              </Typography>
              <Typography variant="h6" sx={{ color: "#fff" }}>
                {mostPassengersFlight.destination}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ color: "#aaa" }}>
                🕒 زمان پرواز:
              </Typography>
              <Typography variant="h6" sx={{ color: "#fff" }}>
                {mostPassengersFlight.departureTime}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" sx={{ color: "#aaa" }}>
                🕒 مدت زمان:
              </Typography>
              <Typography variant="h6" sx={{ color: "#fff" }}>
                {mostPassengersFlight.duration} ساعت
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" sx={{ color: "#aaa" }}>
                👥 تعداد مسافران:
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  color: "#76c7c0",
                }}
              >
                <PeopleAlt /> {mostPassengersFlight.passengers}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default FlightWithMostPassengers;
