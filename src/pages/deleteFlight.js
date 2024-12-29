import React, { useState } from "react";
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
import { deleteFlight } from "../slices/flightsSlice";

const FlightsList = () => {
  const dispatch = useDispatch();
  const flights = useSelector((state) => state.flights.flights);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [flightToDelete, setFlightToDelete] = useState(null);
  const [openNotFoundDialog, setOpenNotFoundDialog] = useState(false);
  const [openSuccessSnackbar, setOpenSuccessSnackbar] = useState(false);

  const sortedFlights = [...flights].sort(
    (a, b) => parseInt(a.flightNumber) - parseInt(b.flightNumber)
  );

  const filteredFlights = sortedFlights.filter(
    (flight) => flight.flightNumber === searchQuery
  );

  const handleDelete = () => {
    if (flightToDelete) {
      dispatch(deleteFlight(flightToDelete));
      setOpenDialog(false);
      setFlightToDelete(null);
      setOpenSuccessSnackbar(true);
    }
  };

  const handleSearchClick = () => {
    setIsSearching(!isSearching);
    if (filteredFlights.length > 0) {
      setFlightToDelete(filteredFlights[0].flightNumber);
      setOpenDialog(true);
    } else {
      setOpenNotFoundDialog(true);
    }
  };

  const handleCloseNotFoundDialog = () => {
    setOpenNotFoundDialog(false);
  };

  const handleCloseSuccessSnackbar = () => {
    setOpenSuccessSnackbar(false);
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
      <Box sx={{ textAlign: "center", width: "100%", maxWidth: 600 }}>
        <Typography
          variant="h3"
          gutterBottom
          sx={{
            fontWeight: "bold",
            color: "#76c7c0",
            fontSize: "2.5rem",
            marginBottom: 3,
          }}
        >
          حذف پرواز
        </Typography>

        <Box sx={{ marginBottom: 3 }}>
          <TextField
            label="جستجوی پرواز"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                color: "#ffffff",
                "& fieldset": {
                  borderColor: "#76c7c0",
                },
                "&:hover fieldset": {
                  borderColor: "#76c7c0",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#76c7c0",
                },
              },
              "& .MuiInputLabel-root": { color: "#76c7c0" },
              marginBottom: 2,
            }}
          />
          <Button
            variant="contained"
            onClick={handleSearchClick}
            sx={{
              width: "100%",
              padding: "12px",
              fontWeight: "bold",
              background: "linear-gradient(to right, #76c7c0, #4cafaa)",
              color: "#ffffff",
              borderRadius: "8px",
              "&:hover": {
                background: "#5ba99c",
              },
            }}
          >
            جستجو
          </Button>
        </Box>

        <Dialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          sx={{
            "& .MuiDialog-paper": {
              backgroundColor: "#2a3b54",
              borderRadius: "10px",
            },
          }}
        >
          <DialogTitle sx={{ fontWeight: "bold", color: "#76c7c0" }}>
            آیا مطمئن هستید؟
          </DialogTitle>
          <DialogContent sx={{ color: "#ffffff" }}>
            <Typography>
              آیا می خواهید پرواز شماره {flightToDelete} را حذف کنید؟
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setOpenDialog(false)}
              sx={{
                color: "#76c7c0",
                fontWeight: "bold",
                "&:hover": { background: "rgba(255, 255, 255, 0.1)" },
              }}
            >
              لغو
            </Button>
            <Button
              onClick={handleDelete}
              sx={{
                color: "#f44336",
                fontWeight: "bold",
                "&:hover": { background: "rgba(255, 255, 255, 0.1)" },
              }}
            >
              حذف
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={openNotFoundDialog}
          onClose={handleCloseNotFoundDialog}
          sx={{
            "& .MuiDialog-paper": {
              backgroundColor: "#2a3b54",
              borderRadius: "10px",
            },
          }}
        >
          <DialogTitle sx={{ color: "#76c7c0" }}>نتیجه‌ای پیدا نشد</DialogTitle>
          <DialogContent sx={{ color: "#ffffff" }}>
            <Typography>
              هیچ پروازی با این شماره پیدا نشد. دوباره جستجو کنید.
            </Typography>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleCloseNotFoundDialog}
              sx={{
                color: "#76c7c0",
                fontWeight: "bold",
                "&:hover": { background: "rgba(255, 255, 255, 0.1)" },
              }}
            >
              بستن
            </Button>
          </DialogActions>
        </Dialog>

        <Snackbar
          open={openSuccessSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSuccessSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert
            onClose={handleCloseSuccessSnackbar}
            severity="success"
            sx={{
              backgroundColor: "#388e3c",
              color: "#ffffff",
              borderRadius: "8px",
              fontWeight: "bold",
            }}
          >
            پرواز با موفقیت حذف شد!
          </Alert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default FlightsList;
