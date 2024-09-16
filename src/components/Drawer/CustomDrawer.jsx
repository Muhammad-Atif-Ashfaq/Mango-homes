import { Close, Menu } from "@mui/icons-material";
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
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../store/actions/authActions";
import { Link, useNavigate } from "react-router-dom";
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

const CustomDrawer = ({ open, close, data }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const handleClick = () => {
    setIsOpen(!isOpen);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignOut = () => {
    dispatch(logOut());
  };
  const handleNavigate = (link) => {
    navigate(link);
    handleClick();
  };
  const theme = useTheme();
  const user = useSelector((state) => state.auth.user);
  // console.log(user, "++++++++++++");
  return (
    <>
      <IconButton onClick={handleClick}>
        <Menu sx={{ fontSize: "30px" }} />
      </IconButton>
      <Drawer
        open={isOpen}
        onClose={handleClick}
        variant="temporary"
        PaperProps={{
          sx: { width: "250px", backgroundColor: "rgb(10, 110, 183)" },
        }}
      >
        <Box sx={{ width: "100%", height: "100vh", overflow: "auto" }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Box sx={{ ml: 2, mt: 2 }}>
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
                {user.firstname || user.name}
              </Typography>
            </Box>
            <Box>
              <Box sx={{ mr: 2, mt: 2 }}>
                <IconButton onClick={handleClick}>
                  <Box sx={{ border: "1px solid white" }}>
                    <Close sx={{ color: "#fff", fontSize: "25px", mb: -0.5 }} />
                  </Box>
                </IconButton>
              </Box>
            </Box>
          </Box>
          <Box sx={{ px: 4, display: "flex", justifyContent: "center" }}></Box>
          <Box sx={{ p: 2 }}>
            <Divider sx={{ background: "rgba(255,255,255,0.3)" }} />
            <Stack sx={{ mt: 4 }} spacing={2}>
              {data.map((item, index) => (
                <StyledTypography onClick={() => handleNavigate(item.to)}>
                  {item.title}
                </StyledTypography>
              ))}
            </Stack>
            <Divider sx={{ background: "rgba(255,255,255,0.3)", mt: 2 }} />
            <Button
              fullWidth
              sx={{
                mt: 2,
                background: "#fff",
                "&:hover": {
                  background: "#e2e2e2",
                },
              }}
              onClick={handleSignOut}
            >
              Sign out
            </Button>
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default CustomDrawer;
