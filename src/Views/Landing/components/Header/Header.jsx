import { Menu } from "@mui/icons-material";
import {
  AppBar,
  Button,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import SideD from "./components/SideD";
import { useState } from "react";

const Header = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  return (
    <AppBar position="fixed" elevation={0} sx={{ background: "transparent" }}>
      <Toolbar>
        {/* <Typography variant="h5" fontWeight="bold" sx={{ color: "#000" }}>
          Rentor
        </Typography> */}
        <img src="/logo2.png" style={{ height: "60px", marginTop: "20px" }} />
        {/* <Button
          component={Link}
          to="/login"
          variant="contained"
          sx={{ ml: "auto" }}
        >
          Login
        </Button> */}
        <IconButton sx={{ ml: "auto", mt: 2 }} onClick={() => setOpen(true)}>
          <Menu sx={{ fontSize: "30px" }} />
        </IconButton>
        <SideD open={open} close={() => setOpen(false)} />
        {/* <Button component={Link} to="/register" variant="contained">
          SignUp
        </Button> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
