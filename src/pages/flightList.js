import React, { useEffect } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import { useSelector, useDispatch } from "react-redux";
import { deleteFlight } from "../slices/flightsSlice"; 

const FlightsList = () => {
  const dispatch = useDispatch();

  const flights = useSelector((state) => state.flights.flights);

  const sortedFlights = [...flights].sort(
    (a, b) => parseInt(a.flightNumber) - parseInt(b.flightNumber)
  );

  const handleDelete = (flightNumber) => {

    dispatch(deleteFlight(flightNumber));
  };

  return (
    <Box
      sx={{
        padding: 3,
        background: "linear-gradient(to right, #141e30, #243b55)",
        minHeight: "89vh",
        color: "#ffffff",
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        align="center"
        sx={{ fontWeight: "bold", color: "#76c7c0" }}
      >
        لیست پروازها
      </Typography>

      <Paper
        sx={{
          padding: 3,
          borderRadius: 3,
          boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)",
          marginBottom: 3,
          background: "#1f2a40",
        }}
      >
        {sortedFlights.length > 0 ? (
          sortedFlights.map((flight, index) => (
            <Accordion
              key={index}
              sx={{
                marginBottom: 2,
                background: "#2a3b54",
                color: "#ffffff",
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon sx={{ color: "#76c7c0" }} />}
                aria-controls={`panel-${index}-content`}
                id={`panel-${index}-header`}
              >
                <Typography
                  sx={{
                    textAlign: "center",
                    width: "100%",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                  }}
                >
                  شماره پرواز: {flight.flightNumber}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container spacing={2}>

                  <Grid
                    item
                    xs={12}
                    sx={{
                      padding: "16px 0",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        gap: 1,
                        padding: "8px 0",
                      }}
                    >
                      <Typography sx={{ fontWeight: "bold", color: "#757575" }}>
                        خلبان:
                      </Typography>

                      <Box
                        sx={{
                          width: 50,
                          height: 50,
                          borderRadius: "50%",
                          overflow: "hidden",
                          backgroundColor: "#ccc",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <img
                          src={`https://i.pravatar.cc/150?img=${flight.flightNumber}`}
                          alt="Pilot's PFP"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Box>

                      <Typography
                        variant="h6"
                        sx={{ fontWeight: "bold", textAlign: "center" }}
                      >
                        {flight.pilotName}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
  
                      }}
                    >
                      <Typography
                        sx={{ fontWeight: "bold", color: "#757575" }}
                        variant="body1"
                      >
                        🕒 ساعت پرواز:
                      </Typography>
                      <Typography variant="body1">
                        {flight.departureTime}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography
                        sx={{ fontWeight: "bold", color: "#757575" }}
                        variant="body1"
                      >
                        👥 تعداد مسافران:
                      </Typography>
                      <Typography variant="body1">
                        {flight.passengers}
                      </Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography
                        sx={{ fontWeight: "bold", color: "#757575" }}
                        variant="body1"
                      >
                        📍 مبدا:
                      </Typography>
                      <Typography variant="body1">{flight.origin}</Typography>
                    </Box>
                  </Grid>

                  <Grid item xs={12} sm={6} md={3}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Typography
                        sx={{ fontWeight: "bold", color: "#757575" }}
                        variant="body1"
                      >
                        📍 مقصد:
                      </Typography>
                      <Typography variant="body1">
                        {flight.destination}
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Typography
            align="center"
            color="#cccccc"
            sx={{ fontSize: "1.2rem" }}
          >
            هیچ پروازی ثبت نشده است.
          </Typography>
        )}
      </Paper>

      <Box sx={{ textAlign: "center" }}>
        <Button
          variant="contained"
          color="primary"
          size="large"
          href="/add-flight"
          sx={{
            padding: "10px 30px",
            background: "#76c7c0",
            color: "#ffffff",
            fontWeight: "bold",
            fontSize: "1rem",
            boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.4)",
            "&:hover": {
              background: "#5ba99c",
            },
          }}
        >
          افزودن پرواز جدید
        </Button>
      </Box>
    </Box>
  );
};

export default FlightsList;
