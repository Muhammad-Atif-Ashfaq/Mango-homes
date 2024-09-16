import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const SideD = ({ open, close }) => {
  const StyledTypography = styled(Typography)(({ theme }) => ({
    color: "#fff",
    fontSize: "15px",
    cursor: "pointer",
    userSelect: "none",
    textDecoration: "none",
    [theme.breakpoints.down("sm")]: {
      fontSize: "20px",
    },
  }));
  const theme = useTheme();
  const navigate = useNavigate();
  const data = [
    { title: "Login", to: "/login" },
    { title: "About", to: "" },
    { title: "How it works", to: "" },
    { title: "Agent Signup", to: "/register-agent" },
    { title: "Agent Login", to: "/agent-login" },
    { title: "Privacy", to: "" },
    { title: "Terms", to: "" },
    { title: "Contact", to: "" },
  ];
  const handleNavigate = (link) => {
    navigate(link);
    close();
  };
  return (
    <Drawer
      open={open}
      onClose={close}
      variant="temporary"
      PaperProps={{
        sx: { width: "250px", backgroundColor: "rgb(10, 110, 183)" },
      }}
    >
      <Box sx={{ width: "100%", height: "100vh", overflow: "auto" }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          {/* <Box sx={{ ml: 2, mt: 2 }}>
            <Typography
              variant="h5"
              fontWeight="bold"
              color="#fff"
              sx={{
                letterSpacing: "1px",
                fontSize: "15px",
                [theme.breakpoints.down("sm")]: {
                  fontSize: "20px",
                },
              }}
            >
              Username
            </Typography>
          </Box> */}
          <Box>
            <Box sx={{ mr: 2, mt: 2 }}>
              <IconButton onClick={close}>
                <Box sx={{ border: "1px solid white" }}>
                  <Close sx={{ color: "#fff", fontSize: "25px", mb: -0.5 }} />
                </Box>
              </IconButton>
            </Box>
          </Box>
        </Box>
        <Box sx={{ px: 4, display: "flex", justifyContent: "center" }}></Box>
        <Box sx={{ p: 2 }}>
          {/* <Divider sx={{ background: "rgba(255,255,255,0.3)" }} /> */}
          <Stack sx={{ mt: 4 }} spacing={2}>
            {data.map((item, index) => (
              <StyledTypography onClick={() => handleNavigate(item.to)}>
                {item.title}
                {index === 2 && (
                  <Divider
                    sx={{ background: "rgba(255,255,255,0.3)", mt: 1 }}
                  />
                )}
                {index === 4 && (
                  <Divider
                    sx={{ background: "rgba(255,255,255,0.3)", mt: 1 }}
                  />
                )}
              </StyledTypography>
            ))}
          </Stack>
          <Divider sx={{ background: "rgba(255,255,255,0.3)", mt: 2 }} />
          {/* <Button
            fullWidth
            sx={{
              mt: 2,
              background: "#fff",
              "&:hover": {
                background: "#e2e2e2",
              },
            }}
            //   onClick={handleSignOut}
          >
            Sign out
          </Button> */}
          <img src="/logo2.png" style={{ marginTop: "15px", width: "40px" }} />
        </Box>
      </Box>
    </Drawer>
  );
};

export default SideD;
