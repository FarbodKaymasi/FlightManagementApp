import React from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Grid,
  Card,
  CardActionArea,
  CardContent,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FlightIcon from "@mui/icons-material/Flight";
import UpdateIcon from "@mui/icons-material/Update";
import PlaceIcon from "@mui/icons-material/Place";
import PeopleIcon from "@mui/icons-material/People";
import DeleteIcon from "@mui/icons-material/Delete";

const menuItems = [
  { text: "صفحه اصلی", path: "/", icon: <HomeIcon fontSize="large" /> },
  {
    text: "افزودن پرواز",
    path: "/add-flight",
    icon: <AddCircleIcon fontSize="large" />,
  },
  {
    text: "لیست پروازها",
    path: "/flights-list",
    icon: <FlightIcon fontSize="large" />,
  },
  {
    text: "تغییر ساعت پرواز",
    path: "/update-flight",
    icon: <UpdateIcon fontSize="large" />,
  },
  // { text: "پروازهای مقصد خاص", path: "/flights-by-destination", icon: <PlaceIcon fontSize="large" /> },
  // { text: "پرواز با بیشترین مسافر", path: "/most-passengers", icon: <PeopleIcon fontSize="large" /> },
  {
    text: "حذف پرواز",
    path: "/delete-flight",
    icon: <DeleteIcon fontSize="large" />,
  },
];

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "89vh",
        padding: 4,
        backgroundColor: "#f9f9f9",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          marginBottom: 4,
          fontWeight: 600,
          color: "primary.main",
          fontFamily: "Vazirmatn, Roboto, sans-serif",
          textAlign: "center",
        }}
      >
        سامانه مدیریت پروازها
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {menuItems.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Card
              sx={{
                boxShadow: "0px 4px 20px rgba(0,0,0,0.1)",
                borderRadius: 3,
                transition: "transform 0.3s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <CardActionArea component={Link} to={item.path}>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    padding: 3,
                  }}
                >
                  <Box
                    sx={{
                      marginBottom: 2,
                      color: "primary.main",
                    }}
                  >
                    {item.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontFamily: "Vazirmatn, Roboto, sans-serif",
                      fontWeight: 500,
                      color: "#333",
                    }}
                  >
                    {item.text}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Home;
