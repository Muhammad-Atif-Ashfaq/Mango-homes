import { AppBar, Toolbar, Typography, styled, Stack } from "@mui/material";
import SignupForm from "./SignupForm";

const StyledRoot = styled("div")({
  // backgroundImage: Gradients.Custom,
  // maxHeight: '90vh',
  height: "100vh",
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
  position: "static",
}));
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});
const Signup = () => {
  //   const navigate = useNavigate()
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8F9FD', height: '100%' }}>
      {/* <StyledAppBar>
        <StyledToolbar>
          <Typography>Register</Typography>
        </StyledToolbar>
      </StyledAppBar> */}
      {/* <StyledRoot> */}
      {/* <Stack>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            {" "}
            Register{" "}
          </Typography>
          <Typography sx={{ textAlign: "center", mb: "1rem" }}>
            {" "}
            Sign up on the internal platform{" "}
          </Typography>
        </Stack> */}

      {/* </StyledRoot> */}

      <SignupForm />
    </div>
  );
};

export default Signup;
