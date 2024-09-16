import React, { useState } from "react";
import PropTypes from "prop-types";
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
import { login, loginAgent } from "../../../store/actions/authActions";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { useSnackbar } from "notistack";
// import { RotatingLines } from "react-loader-spinner";
// import { useNavigate } from "react-router";
// import { Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { adminLogin } from "../../../store/actions/adminActions";
// import { useSnackbar } from "notistack";
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
  role: "agents",
};

const SocialButton = ({ icon }) => {
  return (
    <Box
      sx={{
        border: "1px solid rgba(0,0,0,0.3)",
        p: 0.5,
        borderRadius: "10px",
        mx: 1,
        mt: 2,
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.3)",
        width: "50px",
        cursor: "pointer",
        "&:hover": {
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Box>{icon}</Box>
      </Box>
    </Box>
  );
};
SocialButton.propTypes = {
  icon: PropTypes.element.isRequired,
};
const AgentLoginForm = () => {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  // const isAuthenticated = useSelector((state)=> state.admin.isAuthenticated)
  // console.log(isAuthenticated)
  const [formValues, setFormValues] = React.useState(initialValues);
  const [error, setError] = useState(false);
  const [loading, setLoading] = React.useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
    if (
      formValues.email.includes("gmail") ||
      formValues.email.includes("outlook") ||
      formValues.email.includes("icloud") ||
      formValues.email.includes("yahoo")
    ) {
      setError(true);
    } else {
      setError(false);
    }
  };
  //   const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!error) {
      setLoading(true);
      dispatch(loginAgent(formValues))
        .then((res) => {
          console.log(res);
          setLoading(false);
          if (res.data.data.user.email_verified_at === null) {
            navigate(`/verify-account`, { state: res.data.data.user.id });
          } else {
            navigate("/agent-dashboard/agent-req");
          }
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
        borderRadius: "20px",
        padding: isSmall ? "5px" : "0px 40px",
        margin: isSmall ? "0px 20px" : "0px",
        maxWidth: "400px",
        width: "100%",
      }}
    >
      <CardContent>
        <Stack sx={{ flexDirection: "row", margin: "0px 0px" }}>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <img
              src="/aaa.png"
              alt="logo"
              style={{ width: "100%", height: "8vh" }}
            />
          </Box>
        </Stack>
        {/* <Typography
          sx={{
            textAlign: "start",
            fontWeight: 700,
            fontSize: "27px",
            padding: "20px 0px",
          }}
        >
          Welcome Back Agent!
        </Typography> */}

        <form onSubmit={handleSubmit}>
          <Stack sx={{ gap: "20px", mt: 5 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
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
                error={error}
                size="small"
                placeholder="Enter Your Email Address"
                style={{
                  width: "100%",
                  maxWidth: "400px",
                  boxSizing: "border-box",
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
              {error && (
                <Typography color="red">
                  Only work email addresses are allowed
                </Typography>
              )}
            </Box>
            <Box sx={{ display: "flex", flexDirection: "column", gap: "8px" }}>
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
                  maxWidth: "400px",
                  padding: "10px",
                  borderRadius: "12px",
                  border: "1px solid #767676",
                  boxSizing: "border-box",
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
              // onClick={() => setOpen(true)}
            >
              Forgot Password?
            </Typography>
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
                "Log in"
              )}
            </StyledButton>
            {/* <Divider sx={{ mt: 1 }}>OR</Divider> */}
            <Box sx={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <Box>
                <Typography textAlign="left" color="#777">
                  Dont have an account?
                  <Typography
                    component={Link}
                    to="/register-agent"
                    style={{
                      color: theme.palette.primary.main,
                      marginLeft: "5px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      // textDecoration: "none",
                    }}
                  >
                    Signup
                  </Typography>
                  <Typography
                    component={Link}
                    to="/login"
                    sx={{
                      color: theme.palette.primary.main,
                      marginLeft: "5px",
                      cursor: "pointer",
                      fontWeight: "bold",
                      ml: 2,
                      // textDecoration: "none",
                    }}
                  >
                    Prospect Login
                  </Typography>
                </Typography>
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "center", mt: 0 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              ></Box>
            </Box>
          </Stack>
        </form>
      </CardContent>
    </Card>
  );
};

export default AgentLoginForm;
