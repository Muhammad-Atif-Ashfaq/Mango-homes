import {
  AppBar,
  Toolbar,
  Typography,
  styled,
  Stack,
  Box,
  Button,
} from "@mui/material";
import LoginForm from "./LoginForm";
import { Link } from "react-router-dom";

const StyledRoot = styled("div")({
  // backgroundImage: Gradients.Custom,
  height: "110vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
// const CenteredBox = styled(Box)({
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
// });
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: theme.palette.primary.main,
  position: "fixed",
}));
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});
const Login = () => {
  //   const navigate = useNavigate()

  return (
    <div style={{ backgroundColor: '#F8F9FD', height: '100%' }}>
      {/* <StyledAppBar>
        <StyledToolbar>
          <Typography>Login</Typography>
          <Button
            variant="contained"
            sx={{
              background: "#e2e2e2",
              color: "#000",
              "&:hover": {
                background: "#fff",
              },
            }}
            component={Link}
            to="/agent-login"
          >
            Agent Login{" "}
          </Button>
        </StyledToolbar>
      </StyledAppBar> */}
      <StyledRoot>
        {/* <Stack>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src="/main_logo.png"
              alt="logo"
              style={{ marginBottom: "-20px", width: "100px" }}
            />
          </Box>
          <Typography sx={{ textAlign: "center", m: "1rem" }}>
            Sign in on the internal platform
          </Typography>
        </Stack> */}
        <LoginForm />
      </StyledRoot>
    </div>
  );
};

export default Login;
