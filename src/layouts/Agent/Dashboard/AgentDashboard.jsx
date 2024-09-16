import React from "react";
import { AppBar, Toolbar, styled, Box } from "@mui/material";
import { Outlet } from "react-router-dom";
import CustomDrawer from "../../../components/Drawer/CustomDrawer";

const AgentDashboard = () => {
  const StyledRoot = styled(Box)(({ theme }) => ({
    background: "#f8f8ff",
    minHeight: "100vh",
    padding: theme.spacing(5),
    [theme.breakpoints.down("sm")]: {
      padding: theme.spacing(3),
    },
  }));

  const data = [
    { title: "Requests", to: "/agent-dashboard/agent-req" },
    { title: "Hot Leads 🔥", to: "/agent-dashboard/hot-leads" },
    { title: "How it works" },
    { title: "Terms" },
    { title: "Privacy" },
    { title: "About" },
    { title: "Checkout", to: "/agent-dashboard/checkout" },
    { title: "Contact" },
  ];
  return (
    <div>
      <AppBar position="static" sx={{ background: "#f8f8ff" }} elevation={0}>
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
      <StyledRoot>
        <Outlet />
      </StyledRoot>
    </div>
  );
};

export default AgentDashboard;
