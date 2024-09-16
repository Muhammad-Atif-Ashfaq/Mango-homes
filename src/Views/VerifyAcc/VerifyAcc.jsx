import React, { useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import Lottie from "react-lottie";
import Verify from "./Verify.json";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resendOTP } from "../../store/actions/authActions";
import { Success } from "../../components/Alerts/Success";
import { ThreeDots } from "react-loader-spinner";
import HeadingText from "../../components/Text/HeadingText";
import BodyText from "../../components/Text/BodyText";
const VerifyAcc = () => {
  const { state } = useLocation();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // console.log(state);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: Verify,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const handleResend = () => {
    setLoading(true);
    dispatch(resendOTP(state))
      .then((result) => {
        setLoading(false);
        Success(result.data.message);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <HeadingText variant="h1" fontWeight="bold">
          Uh Oh!
        </HeadingText>
        <BodyText variant="h6" sx={{ color: "#7e7e7e" }}>
          It looks like your account hasn't verified yet. Check your email to
          verify account.
        </BodyText>
        <BodyText variant="h6" sx={{ color: "#7e7e7e" }}>
          If you haven't received the email yet, click the button below.
        </BodyText>
        <Lottie
          style={{ marginTop: "-30px" }}
          options={defaultOptions}
          height={350}
          width={350}
        />
        <Button
          variant={loading ? "disabled" : "contained"}
          onClick={loading ? null : handleResend}
        >
          {loading ? (
            <ThreeDots
              visible={true}
              height="25"
              width="25"
              color="#0050A7"
              radius="9"
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClass=""
            />
          ) : (
            "Resend Verification Mail"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default VerifyAcc;
