import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useSelector } from "react-redux";

const FlightsByDestination = () => {
  const flights = useSelector((state) => state.flights.flights);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openNotFoundDialog, setOpenNotFoundDialog] = useState(false);

  const handleSearchClick = () => {
    const results = flights.filter(
      (flight) =>
        flight.destination.toLowerCase().includes(searchQuery.toLowerCase()) 
    );
    if (results.length > 0) {
      setSearchResults(results);
      setOpenDialog(true);
    } else {
      setOpenNotFoundDialog(true);
    }
  };

  const handleCloseDialog = () => setOpenDialog(false);
  const handleCloseNotFoundDialog = () => setOpenNotFoundDialog(false);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center", 
        alignItems: "center", 
        padding: 3,
        background: "linear-gradient(to right, #141e30, #243b55)", 
        minHeight: "89vh", 
        color: "#ffffff", 
      }}
    >
      <Box sx={{ textAlign: "center", width: "100%", maxWidth: 700 }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#76c7c0",
            display: "flex",
            justifyContent: "center",
            mb: 5,
            ml: 5,
          }}
        >
          جستجوی پرواز
        </Typography>

        <Box
          sx={{
            maxWidth: "89%",
            width: "100%",
            background: "#1f2a40", 
            borderRadius: 3,
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.5)", 
            padding: 4,
            marginBottom: 3,
            margin: "0 auto", 
          }}
        >
          <TextField
            label="جستجو (مقصد)"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            sx={{
              mb: 3,
              "& .MuiOutlinedInput-root": {
                color: "#fff",
                borderColor: "#76c7c0",
                background: "rgba(255, 255, 255, 0.1)",
              },
              "& .MuiInputLabel-root": { color: "#76c7c0" },
            }}
          />

          <Button
            variant="contained"
            onClick={handleSearchClick}
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
                boxShadow: "0 6px 15px rgba(0, 0, 0, 0.3)",
              },
            }}
          >
            جستجو
          </Button>
        </Box>

     
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="lg">
          <DialogTitle
            sx={{
              background: "#243b55",
              color: "#76c7c0",
              textAlign: "center",
              fontWeight: "bold",
            }}
          >
            نتایج پرواز
          </DialogTitle>
          <DialogContent
            sx={{
              background: "#2a3b54",
              color: "#fff",
              display: "grid",
              gap: 3,
              padding: 3,
            }}
          >
            {searchResults.map((flight, index) => (
              <Accordion
                key={index}
                sx={{
                  marginBottom: 2,
                  background: "#2a3b54",
                  color: "#ffffff",
                  borderRadius: 2,
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
                   
                    <Grid item xs={12}>
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
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
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
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
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
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
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
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
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
            ))}
          </DialogContent>
          <DialogActions sx={{ background: "#243b55" }}>
            <Button
              onClick={handleCloseDialog}
              sx={{ color: "#76c7c0", fontWeight: "bold" }}
            >
              بستن
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openNotFoundDialog}
          onClose={handleCloseNotFoundDialog}
          sx={{
            "& .MuiDialog-paper": {
              background: "#2a3b54",
              color: "#fff",
              borderRadius: 3,
              padding: 3,
            },
          }}
        >
          <DialogTitle
            sx={{ textAlign: "center", fontWeight: "bold", color: "#76c7c0" }}
          >
            پروازی یافت نشد
          </DialogTitle>
          <DialogActions>
            <Button
              onClick={handleCloseNotFoundDialog}
              sx={{ color: "#76c7c0", fontWeight: "bold" }}
            >
              بستن
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default FlightsByDestination;
