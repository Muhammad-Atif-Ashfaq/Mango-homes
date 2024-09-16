import { AppBar, Toolbar, Typography, styled, Stack } from "@mui/material";
import Form from "./Form";

const StyledRoot = styled("div")({
  // backgroundImage: Gradients.Custom,
  height: "90vh",
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
const SignUpAgent = () => {
  //   const navigate = useNavigate()
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F8F9FD', height: '100%' }}>
      {/* <StyledAppBar>
        <StyledToolbar>
          <Typography>Register Agent</Typography>
        </StyledToolbar>
      </StyledAppBar>
      <StyledRoot>
        <Stack>
          <Typography variant="h4" sx={{ textAlign: "center" }}>
            {" "}
            Register Agent
          </Typography>
          <Typography sx={{ textAlign: "center", mb: "1rem" }}>
            {" "}
            Sign up on the internal platform{" "}
          </Typography>
        </Stack>
      </StyledRoot> */}
      <Form />
    </div>
  );
};

export default SignUpAgent;
