import {
  AppBar,
  Avatar,
  Box,
  LinearProgress,
  Toolbar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
// import Stepper from "@mui/material/Stepper";
// import Step from "@mui/material/Step";
// import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import React, { useEffect, useState } from "react";
import { ExitToApp } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  getQuestionAns,
  postFormData,
} from "../../../store/actions/dashboardActions";
import ProfileDialog from "./components/Profile/ProfileDialog";
import SteppComponent from "./components/Stepper/SteppComponent";
import { useSnackbar } from "notistack";
import { logOut } from "../../../store/actions/authActions";
import { Success } from "../../../components/Alerts/Success";
import Loading from "../../../components/Alerts/Loading";
import { useNavigate } from "react-router-dom";
import Header from "../../Landing/components/Header";
import Submit_alert from "./components/Submit_alert";
import BodyText from "../../../components/Text/BodyText";

const Form = () => {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = React.useState(0);
  const [alert, setAlert] = useState(false);
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down("sm"));
  const isXs = useMediaQuery(theme.breakpoints.down("sx"));
  const getQuestions = () => {
    setLoading(true);
    dispatch(getQuestionAns())
      .then((result) => {
        console.log(result, "rrrrrrrr");
        setData(result.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getQuestions();
  }, []);
  const handleNext = () => {
    if (validateStep()) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      enqueueSnackbar("Please fill information", {
        variant: "error",
      });
    }
  };
  const validateStep = () => {
    const stepData = data.data[activeStep];
    const stepFormData = formData[activeStep];

    if (!stepData || !stepFormData) {
      return false;
    }

    if (stepData.type === "checkbox" && !stepFormData[stepData.question]) {
      alert("Please select at least one checkbox");
      return false;
    }

    if (stepData.type === "text" && !stepFormData[stepData.question]) {
      alert("Please fill in the text field");
      return false;
    }

    return true;
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const user = useSelector((state) => state.auth.user);

  const handleSubmit = () => {
    if (validateStep()) {
      setFormLoading(true);
      const newData = JSON.stringify(Object.assign({}, formData));
      dispatch(postFormData(user.id, newData))
        .then((result) => {
          setFormLoading(false);
          dispatch({ type: "LOADING_TRUE" });
          navigate("/dashboard-customer/customer-req", { replace: true });
        })
        .catch((err) => {
          setFormLoading(false);
          console.log(err);
        });
    } else {
      enqueueSnackbar("Please fill information", {
        variant: "error",
      });
    }
  };
  return (
    <>
      <Box sx={{ p: 0, position: "relative" }}>
        <Box sx={{ p: 5 }}>
          <Typography sx={{ textAlign: "center", fontWeight: 600 }}>
            Step {activeStep + 1} of {loading ? "--" : data.data.length}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={(activeStep / (loading ? "--" : data.data.length - 1)) * 100}
            sx={{ mt: 1, width: "100%", height: "10px" }}
          />
        </Box>
        {loading ? (
          <BodyText sx={{ textAlign: "center" }}>
            Loading Please wait...
          </BodyText>
        ) : (
          <Box sx={{ mt: 3, height: "100%" }}>
            {data?.data.map((stepData, index) => {
              const StepComponent = `Step${index + 1}`;

              return (
                activeStep === index && (
                  <SteppComponent
                    key={index}
                    data={stepData}
                    index={activeStep}
                    setFormData={setFormData}
                    formData={formData}
                  />
                )
              );
            })}
          </Box>
        )}

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            padding: isSmall ? "20px 20px 20px 20px" : "20px 40px 20px 40px",
            backgroundColor: "#fff",
          }}
        >
          <button
            disabled={activeStep === 0}
            onClick={handleBack}
            style={{
              borderRadius: "20px",
              backgroundColor: "transparent",
              color: theme.palette.primary.main,
              border: `1px solid  ${theme.palette.primary.main}`,
              padding: isXs ? "8px 45px" : "8px 57px",
              fontWeight: 700,
              height: "40px",
            }}
          >
            Back
          </button>

          {activeStep === (loading ? 15 : data.data.length - 1) ? (
            <button
              style={{
                borderRadius: "20px",
                backgroundColor: "#109D59",
                color: "white",
                border: "1px solid #3F27B9",
                padding: isXs ? "8px 40px" : "8px 55px",
                fontWeight: 700,
                width: "200px",
              }}
              onClick={handleSubmit}
            >
              Submit
            </button>
          ) : (
            <button
              style={{
                borderRadius: "20px",
                backgroundColor: theme.palette.primary.main,
                color: "white",
                border: "1px solid #3F27B9",
                padding: isXs ? "8px 40px" : "8px 65px",
                fontWeight: 700,
                height: "40px",
              }}
              onClick={handleNext}
              disabled={activeStep === (loading ? 1 : data.data.length - 1)}
            >
              Next
            </button>
          )}
        </Box>

        <ProfileDialog
          open={openDialog}
          close={() => setOpenDialog(false)}
          data={user}
          formData={formData}
          setFormData={setFormData}
        />
      </Box>
      {formLoading && <Loading sub="Submitting Please Wait" />}
    </>
  );
};

export default Form;
