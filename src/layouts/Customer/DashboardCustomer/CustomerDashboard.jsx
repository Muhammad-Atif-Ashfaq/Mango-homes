import React, { useState } from "react";
import { AppBar, Toolbar, styled, Box } from "@mui/material";
import { Link, Outlet, useLocation } from "react-router-dom";
import CustomDrawer from "../../../components/Drawer/CustomDrawer";
const CustomerDashboard = () => {
  const StyledRoot = styled(Box)(({ theme }) => ({
    // background: "#FAF9F6",
    minHeight: "100vh",
    padding: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(1),
    },
  }));

  const data = [
    // { title: "Results", to: "/dashboard-customer/customer-req" },
    { title: "Test Component", to: "/dashboard-customer/test" },
    { title: "How it works" },
    { title: "Terms" },
    { title: "Privacy" },
    { title: "About" },
    { title: "Contact" },
  ];
  const path = useLocation().pathname;
  // console.log(path);
  return (
    <div>
      <AppBar
        position="fixed"
        sx={{
          background: path === "/dashboard-customer/form" ? "white" : "#FAF9F6",
        }}
        elevation={0}
      >
        <Toolbar>
          <img
            src="/logo2.png"
            style={{
              height: "60px",
              marginTop: "30px",
            }}
          />

          <Box sx={{ ml: "auto", marginTop: "30px" }}>
            <CustomDrawer data={data} />
          </Box>
        </Toolbar>
      </AppBar>

      <StyledRoot
        sx={{
          mt: 10,
          background: path === "/dashboard-customer/form" ? "white" : "#FaF9F6",
        }}
      >
        <Outlet />
      </StyledRoot>
    </div>
  );
};

export default CustomerDashboard;
