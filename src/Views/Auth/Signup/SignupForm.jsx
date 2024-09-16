import React, { useState, useEffect } from "react";
import {
  Button,
  styled,
  TextField,
  Stack,
  Card,
  CardContent,
  Typography,
  Box,
  Divider,
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
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { Link } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";
import { FaFacebook } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import Success_Popup from "../../../components/Alerts/Success_Popup";
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
  role: "prospect",
};

const SignupForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [formValues, setFormValues] = React.useState(initialValues);
  const [pop_up, setPop_up] = useState(false);
  const [redirectAfterSuccess, setRedirectAfterSuccess] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (formValues.tell.length > 11) {
      setError(false);
    }
  };
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(null);
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (formValues.tell.length < 11) {
      setError(true);
    } else {
      setLoading(true);
      setError(false);
      dispatch(register(formValues))
        .then((res) => {
          // enqueueSnackbar(res.data.message, {
          //   variant: "success",
          // });
          setPop_up(true);
          setLoading(false);
          // navigate("/login");
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
  const handlePopupClose = () => {
    setPop_up(false);
    setRedirectAfterSuccess(true);
  };
  useEffect(() => {
    if (!pop_up && redirectAfterSuccess) {
      navigate("/login");
    }
  }, [pop_up, redirectAfterSuccess]);
  return (
    <>
      <Card
        elevation={4}
        sx={{
          padding: "0px 0px",
          borderRadius: "20px",
          maxWidth: "400px",
          width: "100%",
          margin: isSmall ? "40px 20px" : "0px",
          [theme.breakpoints.down("sm")]: {
            mt: 15,
          },
        }}
      >
        <CardContent elevation={5}>
          <Stack sx={{ flexDirection: "row", margin: "20px 0px" }}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <img
                src="/aaa.png"
                alt="logo"
                style={{
                  marginBottom: "-30px",
                  width: "100%",
                  height: "8vh",
                  marginTop: -10,
                }}
              />
            </Box>
          </Stack>
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography sx={{ textAlign: "center", mb: 0.5 }}>
              {" "}
              Sign up with:{" "}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                alignItems: "center",
                justifyContent: "center",
                margin: "0px 0px",
              }}
            >
              {/* <Box sx={{ border: '1px solid gray', padding: '10px', borderRadius: '5px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <FacebookIcon sx={{ color: 'blue' }} />
                  <Typography>   Facebook</Typography>
                </Box>
              </Box> */}
              {/* <Box sx={{ border: '1px solid gray', padding: '10px', borderRadius: '5px' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <GoogleIcon sx={{ color: 'red' }} />
                  <Typography>   Google</Typography>
                </Box>
              </Box> */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "20px",
                  padding: "0px 0px 0px 0px",
                }}
              >
                <LoginSocialFacebook
                  appId="348116810970939"
                  onResolve={(res) => {
                    console.log(res);
                  }}
                  onReject={(err) => {
                    console.log(err);
                  }}
                >
                  <Box
                    sx={{
                      border: "1px solid lightGray",
                      borderRadius: "8px",
                      margin: "0px auto",
                      padding: "8px 20px",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    >
                      <FcGoogle style={{ fontSize: "22px" }} />
                      <Typography>Google</Typography>
                    </div>
                  </Box>
                </LoginSocialFacebook>
                <LoginSocialGoogle
                  client_id="384246940788-toig6ojeb1iba6rr731c250op6m7da38.apps.googleusercontent.com"
                  onResolve={(res) => {
                    console.log(res);
                  }}
                  onReject={(err) => {
                    console.log(err);
                  }}
                >
                  <Box
                    sx={{
                      border: "1px solid lightGray",
                      borderRadius: "8px",
                      margin: "0px auto",
                      padding: "8px 20px",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: "10px",
                      }}
                    >
                      <FaFacebook
                        style={{ color: "#316FF6", fontSize: "22px" }}
                      />
                      <Typography>Facebook</Typography>
                    </div>
                  </Box>
                </LoginSocialGoogle>
              </Box>
              {/* <GoogleLogin
                onSuccess={(res) => {
                  const decoded_res = jwtDecode(res.credential);
                  console.log(decoded_res);
                }}
                onError={() => {
                  console.log("ERROR");
                }}
              >
                
              </GoogleLogin> */}
              {/* <Box sx={{ width: '15%', border: '1px solid black', borderRadius: '8px', margin: '0px auto', padding: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <GoogleIcon />
                </div>
              </Box> */}
            </Box>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                margin: "20px 0px 10px 0px",
              }}
            >
              <div style={{ flex: 1 }}>
                <Divider />
              </div>
              <Typography
                variant="body1"
                align="center"
                // style={{ margin: "0 10px" }}
              >
                or
              </Typography>
              <div style={{ flex: 1 }}>
                <Divider />
              </div>
            </div>
            <Box sx={{ padding: "10px 0px", textAlign: "center" }}>
              <Typography>Sign up with your email address:</Typography>
            </Box>
          </Box>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                size="small"
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
                size="small"
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
                size="small"
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
              />
              {/* <TextField
                size="small"
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
              /> */}
              <TextField
                size="small"
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
              <Typography sx={{ fontSize: "14px", color: "#767676" }}>
                By creating an account, you agree to our{" "}
                <span style={{ textDecoration: "underline" }}>
                  {" "}
                  User Agreement{" "}
                </span>{" "}
                and{" "}
                <span style={{ textDecoration: "underline" }}>
                  {" "}
                  Privacy Policy.
                </span>
              </Typography>

              <StyledButton
                // variant={loading ? "disabled" : "contained"}
                type="submit"
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
                  "CREATE ACCOUNT"
                )}
              </StyledButton>
              <Box>
                <Typography
                  textAlign="left"
                  color="#777"
                  sx={{ fontSize: "14px" }}
                >
                  Already have an account?
                  <Typography
                    component={Link}
                    to="/login"
                    style={{
                      color: theme.palette.primary.main,
                      marginLeft: "5px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      fontSize: "14px",
                      // textDecoration: "none",
                    }}
                  >
                    Login
                  </Typography>
                </Typography>
              </Box>
            </Stack>
          </form>
          {pop_up && (
            <Success_Popup
              onClose={handlePopupClose}
              msg="We have sent you an email. Click on the link in the email to access your Mago account. Please check your spam folder for the email if it doesn't arrive in your inbox."
            />
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default SignupForm;
