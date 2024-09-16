import React, { useEffect, useState } from "react";
import {
  Button,
  styled,
  TextField,
  Stack,
  Card,
  CardContent,
  Divider,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { LoginSocialFacebook, LoginSocialGoogle } from "reactjs-social-login";
import { FcGoogle } from "react-icons/fc";
import { login, socialLogin } from "../../../store/actions/authActions";
// import { RotatingLines } from "react-loader-spinner";
// import { useNavigate } from "react-router";
// import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
import { ThreeDots } from "react-loader-spinner";
import ForgotPasswordDialog from "./components/ForgotPasswordDialog";
import GoogleIcon from "@mui/icons-material/Google";
import { FaFacebook } from "react-icons/fa6";
import Loading from "../../../components/Alerts/Loading";
const StyledButton = styled(Button)(({ theme }) => ({
  margin: "10px 0",
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  textTransform: "none",
  background: theme.palette.primary.main,
  "&:hover": {
    background: "#236482",
  },
}));
const initialValues = {
  email: "",
  password: "",
};
const LoginForm = () => {
  const { enqueueSnackbar } = useSnackbar();
  // const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [formValues, setFormValues] = React.useState(initialValues);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [loading, setLoading] = React.useState(null);
  const [loading_s, setLoading_s] = useState(false);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const body = {
      ...formValues,
      role: "prospect",
    };
    dispatch(login(body))
      .then((res) => {
        // console.log(res.data.data);
        setLoading(false);
        if (res.data.data.user.email_verified_at === null) {
          navigate(`/verify-account`, { state: res.data.data.user.id });
        } else {
          navigate("/dashboard-customer/customer-req");
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err.response.data.message);
        enqueueSnackbar(err.response.data.message, { variant: "error" });
      });
  };
  const socialLoginFunc = (body) => {
    setLoading_s(true);
    dispatch(socialLogin(body))
      .then((result) => {
        setLoading(false);
        navigate("/dashboard-customer/customer-req");
        console.log(result);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  return (
    <>
      <Card
        elevation={4}
        sx={{
          borderRadius: "20px",
          padding: isSmall ? "5px" : "0px 40px",
          margin: isSmall ? "0px 10px" : "0px",
          [theme.breakpoints.down("sm")]: {
            mt: -10,
          },
        }}
      >
        <CardContent>
          <Stack sx={{ flexDirection: "row", margin: "15px 0px" }}>
            <Box sx={{ display: "flex", justifyContent: "start" }}>
              <img
                src="/aaa.png"
                alt="logo"
                style={{ width: "100%", height: "8vh" }}
              />
            </Box>
            {/* <Typography sx={{ textAlign: "center", m: "1rem", fontWeight: 600 }}>
              MANGOES <br /> HOMES
            </Typography> */}
          </Stack>
          {/* <Typography
            sx={{ textAlign: "start", fontWeight: 700, fontSize: "27px" }}
          >
            Welcome Back!
          </Typography> */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "20px",
              padding: "20px 0px 0px 0px",
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
                  padding: "15px 30px",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FaFacebook style={{ color: "#316FF6", fontSize: "22px" }} />
                </div>
              </Box>
            </LoginSocialFacebook>
            <LoginSocialGoogle
              client_id="326192519410-u325blnsiff9mpofg2etli0ba5c0pnaj.apps.googleusercontent.com"
              onResolve={(res) => {
                const body = {
                  firstname: res.data.given_name,
                  lastname: res.data.family_name,
                  email: res.data.email,
                };
                socialLoginFunc(body);
                // console.log(res);
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
                  padding: "15px 30px",
                  cursor: "pointer",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FcGoogle style={{ fontSize: "22px" }} />
                </div>
              </Box>
            </LoginSocialGoogle>
          </Box>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              margin: "20px 0px",
            }}
          >
            <div style={{ flex: 1 }}>
              <Divider />
            </div>
            <Typography
              variant="body1"
              align="center"
              style={{ margin: "0 10px" }}
            >
              OR
            </Typography>
            <div style={{ flex: 1 }}>
              <Divider />
            </div>
          </div>
          <form onSubmit={handleSubmit}>
            <Stack sx={{ gap: "20px" }}>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <label
                  style={{
                    textAlign: "start",
                    color: "#767676",
                    fontSize: "12px",
                    margin: "5px 0px",
                  }}
                >
                  Email Address
                </label>

                <input
                  size="small"
                  placeholder="Enter Your Email Address"
                  style={{
                    width: "100%",
                    maxWidth: "400px",
                    boxSizing: "border-box", // Set maximum width if needed
                    padding: "10px",
                    borderRadius: "12px",
                    border: "1px solid #767676",
                  }}
                  name="email"
                  value={formValues.email}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  type="email"
                />
              </Box>
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "8px" }}
              >
                <label
                  style={{
                    textAlign: "start",
                    color: "#767676",
                    fontSize: "12px",
                  }}
                >
                  {" "}
                  Password
                </label>

                <input
                  placeholder="Enter A Password"
                  size="small"
                  style={{
                    width: "100%",
                    maxWidth: "400px", // Set maximum width if needed
                    padding: "10px",
                    borderRadius: "12px",
                    border: "1px solid #767676",
                    boxSizing: "border-box", // Ensure padding is included in width
                  }}
                  name="password"
                  value={formValues.password}
                  onChange={handleChange}
                  required
                  autoComplete="off"
                  type="password"
                />
              </Box>

              <Typography
                // variant="body"
                mt={-0.5}
                textAlign="right"
                color="primary"
                sx={{
                  cursor: "pointer",
                  fontWeight: 500,
                  color: theme.palette.primary.main,
                  fontSize: "15px",
                }}
                onClick={() => setOpen(true)}
              >
                Forgot Password?
              </Typography>
              <StyledButton
                // variant={loading ? "disabled" : "contained"}

                type={loading ? null : "submit"}
                size="small"
                sx={{
                  color: "#fff",
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: "10px",
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
                  "Log in"
                )}
              </StyledButton>
              {/* <Divider sx={{ mt: 1 }}>OR</Divider> */}
              <Box
                sx={{
                  display: "flex",
                  alignItems: "left",
                  gap: "15px",
                  flexWrap: "wrap",
                }}
              >
                <Box>
                  <Typography textAlign="left" color="#767676">
                    Dont have an account?
                    <Typography
                      component={Link}
                      to="/register"
                      style={{
                        color: theme.palette.primary.main,
                        marginLeft: "5px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        // textDecoration: "none",
                      }}
                    >
                      Sign up
                    </Typography>
                  </Typography>
                </Box>
                <Box>
                  {/* <Typography
                    // variant="contained"
                    sx={{
                      color: theme.palette.primary.main,
                      marginLeft: "5px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      textDecoration: "underline",
                    }}
                    // sx={{
                    //   background: "#e2e2e2",
                    //   color: "#000",
                    //   "&:hover": {
                    //     background: "#fff",
                    //   },
                    // }}
                    component={Link}
                    to="/agent-login"
                  >
                    Agent Login{" "}
                  </Typography> */}
                </Box>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center", mt: 0 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    flexDirection: "column",
                  }}
                >
                  {/* <GoogleLogin
                  onSuccess={(res) => {
                    const decoded_res = jwtDecode(res.credential);
                    console.log(decoded_res);
                  }}
                  onError={() => {
                    console.log("ERROR");
                  }}
                /> */}
                  {/* <LoginSocialFacebook
                  appId="329307009496758"
                  onResolve={(res) => {
                    console.log(res);
                  }}
                  onReject={(error) => {
                    console.log(error);
                  }}
                >
                  <FacebookLoginButton
                    style={{
                      height: "36px",
                      marginTop: "10px",
                      width: "235px",
                      fontSize: "15px",
                    }}
                  /> */}
                  {/* </LoginSocialFacebook> */}
                </Box>

                {/* <Typography textAlign="left" color="#777">
                Dont have an account?
                <Typography
                  component={Link}
                  to="/register"
                  style={{
                    color: "#3f27b9",
                    marginLeft: "5px",
                    cursor: "pointer",
                    fontWeight: "bold",
                    // textDecoration: "none",
                  }}
                >
                  Signup
                </Typography>
              </Typography> */}
              </Box>
              {/* <Typography textAlign="center" mt={2} color="#777">
              Dont have an account?
              <Typography
                component={Link}
                to="/register"
                style={{
                  color: "#3f27b9",
                  marginLeft: "5px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  // textDecoration: "none",
                }}
              >
                Signup
              </Typography>
            </Typography> */}
            </Stack>
          </form>
        </CardContent>
        {loading_s && <Loading sub="Please Wait" />}
        <ForgotPasswordDialog open={open} close={() => setOpen(false)} />
      </Card>
    </>
  );
};

export default LoginForm;
