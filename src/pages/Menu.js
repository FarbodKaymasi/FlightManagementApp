import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import HomeIcon from "@mui/icons-material/Home";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import FlightIcon from "@mui/icons-material/Flight";
import UpdateIcon from "@mui/icons-material/Update";
import PlaceIcon from "@mui/icons-material/Place";
import PeopleIcon from "@mui/icons-material/People";
import DeleteIcon from "@mui/icons-material/Delete";

const Menu = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const menuItems = [
    { text: "صفحه اصلی", path: "/", icon: <HomeIcon /> },
    { text: "افزودن پرواز", path: "/add-flight", icon: <AddCircleIcon /> },
    { text: "لیست پروازها", path: "/flights-list", icon: <FlightIcon /> },
    { text: "تغییر ساعت پرواز", path: "/update-flight", icon: <UpdateIcon /> },
    {
      text: "پروازهای مقصد خاص",
      path: "/flights-by-destination",
      icon: <PlaceIcon />,
    },
    {
      text: "پرواز با بیشترین مسافر",
      path: "/most-passengers",
      icon: <PeopleIcon />,
    },
    { text: "حذف پرواز", path: "/delete-flight", icon: <DeleteIcon /> },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        elevation={4}
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          boxShadow: "0px 4px 10px rgba(0,0,0,0.3)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer}
            sx={{
              "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
            }}
          >
            <MenuIcon fontSize="large" />
          </IconButton>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              color="white"
              variant="h6"
              component="div"
              sx={{ fontFamily: "Roboto, sans-serif", fontWeight: 700 }}
            >
              سامانه مدیریت پروازها
            </Typography>
          </Link>
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={toggleDrawer}
        sx={{
          "& .MuiDrawer-paper": {
            backgroundColor: "#f9f9f9",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.1)",
            borderRadius: "0 12px 12px 0",
            transition: "all 0.3s ease-in-out",
          },
        }}
      >
        <Box
          sx={{
            width: 250,
            padding: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              textAlign: "center",
              marginBottom: 2,
              fontWeight: 600,
              color: "primary.main",
            }}
          >
            منو
          </Typography>
          <List>
            {menuItems.map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={toggleDrawer}
                  sx={{
                    "&:hover": {
                      backgroundColor: "rgba(0, 123, 255, 0.1)",
                    },
                    padding: "12px 16px",
                    borderRadius: "8px",
                    transition: "background-color 0.3s ease",
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: 2,
                    }}
                  >
                    {item.icon}
                    <ListItemText
                      primary={item.text}
                      sx={{
                        textAlign: "right",
                        "& span": {
                          fontWeight: 500,
                          fontFamily: "Vazir, sans-serif",
                        },
                      }}
                    />
                  </Box>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Menu;
