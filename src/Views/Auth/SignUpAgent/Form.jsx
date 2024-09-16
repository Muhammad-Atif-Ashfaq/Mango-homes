import React, { useState } from "react";
import {
  Button,
  styled,
  TextField,
  Stack,
  Card,
  CardContent,
  Typography,
  Divider,
  Box,
  useTheme,
  useMediaQuery,
} from "@mui/material";
// import { RotatingLines } from "react-loader-spinner";
import { useNavigate } from "react-router";
// import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { register } from "../../../store/actions/authActions";
import { ThreeDots } from "react-loader-spinner";
import { Success } from "../../../components/Alerts/Success";
import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
const StyledButton = styled(Button)(({ theme }) => ({
  margin: "10px 0",
  background: theme.palette.primary.main,
  "&:hover": {
    background: theme.palette.secondary.main,
  },
}));
const initialValues = {
  firstname: "",
  lastname: "",
  email: "",
  tell: "",
  password: "",
  role: "agents",
};

const Form = () => {
  const { enqueueSnackbar } = useSnackbar();
  const [formValues, setFormValues] = React.useState(initialValues);
  const [emailError, setEmailError] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (formValues.tell.length < 11 || formValues.tell.length > 14) {
      setError(true);
    } else {
      setError(false);
    }
    if (
      formValues.email.includes("gmail") ||
      formValues.email.includes("outlook") ||
      formValues.email.includes("icloud") ||
      formValues.email.includes("yahoo")
    ) {
      setEmailError(true);
    } else {
      setEmailError(false);
    }
  };
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(null);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error && !emailError) {
      setLoading(true);
      dispatch(register(formValues))
        .then((res) => {
          Success(res.data.message);
          // enqueueSnackbar(res.data.message, {
          //   variant: "success",
          // });
          setLoading(false);
          navigate("/agent-login");
        })
        .catch((err) => {
          setLoading(false);
          console.log(err.response.data.message);
          enqueueSnackbar(err.response.data.message, {
            variant: "error",
          });
        });
    }
  };
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Card
      elevation={4}
      sx={{
        padding: "0px 25px",
        maxWidth: "400px",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "20px",
        margin: isSmall ? "40px 20px" : "0px",
        mt: 5,
        [theme.breakpoints.down("sm")]: {
          mt: 18,
        },
      }}
    >
      <CardContent>
        <Stack sx={{ flexDirection: "row", margin: "20px 0px" }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src="/aaa.png"
              alt="logo"
              style={{ marginBottom: "-20px", width: "100%", height: "8vh" }}
            />
          </Box>
        </Stack>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Box sx={{ padding: "10px 0px", textAlign: "center", mt: 2 }}>
            <Typography>Sign up with your work email address:</Typography>
          </Box>
        </Box>
        <form onSubmit={handleSubmit}>
          <Stack spacing={2}>
            <TextField
              label="First name"
              sx={{
                width: "100%",
                maxWidth: "400px",
                boxSizing: "border-box",
              }}
              name="firstname"
              value={formValues.firstname}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <TextField
              label="Last name"
              sx={{
                width: "100%",
                maxWidth: "400px",
                boxSizing: "border-box",
              }}
              name="lastname"
              value={formValues.lastname}
              onChange={handleChange}
              required
              autoComplete="off"
            />
            <TextField
              label="Email"
              sx={{
                width: "100%",
                maxWidth: "400px",
                boxSizing: "border-box",
              }}
              name="email"
              value={formValues.email}
              onChange={handleChange}
              required
              autoComplete="off"
              helperText={
                emailError && (
                  <Typography variant="body" color="red">
                    Email must be work email
                  </Typography>
                )
              }
            />
            <TextField
              label="Phone No"
              sx={{
                width: "100%",
                maxWidth: "400px",
                boxSizing: "border-box",
              }}
              name="tell"
              value={formValues.tell}
              onChange={handleChange}
              required
              autoComplete="off"
              error={error}
              helperText={
                error && (
                  <Typography variant="body" color="red">
                    Phone must be 11 digits long
                  </Typography>
                )
              }
            />
            <TextField
              label="Password"
              sx={{
                mb: "1rem",
                width: "100%",
                maxWidth: "400px",
                boxSizing: "border-box",
              }}
              name="password"
              value={formValues.password}
              onChange={handleChange}
              required
              autoComplete="off"
              type="password"
            />
            <StyledButton
              variant={loading ? "disabled" : "contained"}
              type={loading ? null : "submit"}
              size="small"
              sx={{
                color: "#fff",
                backgroundColor: theme.palette.primary.main,
              }}
            >
              {loading ? (
                <ThreeDots
                  visible={true}
                  height="25"
                  width="25"
                  color="#fff"
                  radius="9"
                  ariaLabel="three-dots-loading"
                  wrapperStyle={{}}
                  wrapperClass=""
                />
              ) : (
                "Register"
              )}
            </StyledButton>
            <Box>
              <Typography textAlign="left" color="#777">
                Already have an account?
                <Typography
                  component={Link}
                  to="/agent-login"
                  style={{
                    color: theme.palette.primary.main,
                    marginLeft: "5px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    // textDecoration: "none",
                  }}
                >
                  Login
                </Typography>
              </Typography>
            </Box>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
};

export default Form;
