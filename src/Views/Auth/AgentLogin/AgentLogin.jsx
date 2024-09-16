import { AppBar, Toolbar, Typography, styled, Stack, Box } from "@mui/material";
import AgentLoginForm from "./AgentLoginForm";

const StyledRoot = styled("div")({
  // backgroundImage: Gradients.Custom,
  height: "92vh",
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
const AgentLogin = () => {
  //   const navigate = useNavigate()
  return (
    <div style={{ backgroundColor: '#F8F9FD', height: '100%' }}>
      {/* <StyledAppBar>
        <StyledToolbar>
          <Typography>Login</Typography>
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
        <AgentLoginForm />
      </StyledRoot>
    </div>
  );
};

export default AgentLogin;
