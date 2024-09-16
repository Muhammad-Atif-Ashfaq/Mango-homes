import React, { useState, useEffect, useRef } from "react";
import Page from "../../../components/page";
import { Box, Typography, styled } from "@mui/material";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { makeProspectPayment } from "../../../store/actions/prospectActions/prospectPayment";
import Loading from "../../../components/Alerts/Loading";
import { Success } from "../../../components/Alerts/Success";
import { makeAgentPayment } from "../../../store/actions/agentActions/agentPayment";
import { updateUser } from "../../../store/actions/authActions";
const StyledRoot = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
}));

const CheckOut = () => {
  const paypalRef = useRef(null);
  const [age, setAge] = useState(10);
  const [loading, setLoading] = useState(false);
  const { state } = useLocation();
  const role = useSelector((state) => state.auth.user.roles[0].name);
  const prospectId = useSelector((state) => state.auth.user.id);
  const agentId = useSelector((state) => state.auth.user.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // console.log(state);
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://www.paypal.com/sdk/js?client-id=AT6TtBqc5P86fpG50WBVQXxYUCqM-gLSQe66Fr1V0Goj0UnMt6OQU11MIhNpOd5H-FESrVhaUXrJUesa&currency=THB";
    script.async = true;
    script.onload = initializePayPalButtons;
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      if (paypalRef.current) {
        paypalRef.current.innerHTML = "";
      }
    };
  }, []);
  useEffect(() => {}, []);
  const initializePayPalButtons = () => {
    window.paypal
      .Buttons({
        createOrder: (data, actions, err) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: "My Ads revenue",
                amount: {
                  currency_code: "THB",
                  value: 200.5,
                },
              },
            ],
          });
        },
        onApprove: async (data, actions) => {
          setLoading(true);
          const order = await actions.order.capture();
          if (order.status === "COMPLETED") {
            if (role === "prospect") {
              const body = {
                prospectId: prospectId,
                payment: order.purchase_units[0].amount.value,
              };
              dispatch(makeProspectPayment(body))
                .then((result) => {
                  setLoading(false);
                  console.log(result.data.data.user);
                  // Success("Payment Success");
                  navigate("/dashboard-customer/customer-req");
                  dispatch(updateUser(result.data.data.user));
                })
                .catch((err) => {
                  setLoading(false);
                  console.log(err);
                });
            } else {
              const body = {
                agentId: agentId,
                payment: order.purchase_units[0].amount.value,
                prospectId: state,
              };
              dispatch(makeAgentPayment(body))
                .then((result) => {
                  setLoading(false);
                  console.log(result);
                  // Success("Payment Success");
                  navigate("/agent-dashboard/hot-leads");
                })
                .catch((err) => {
                  setLoading(false);
                  console.log(err);
                });
            }
          }
        },
        onError: (err) => {
          console.log(err);
        },
      })
      .render(paypalRef.current);
  };

  const handleChange = (event) => {
    setAge(event.target.value);
  };

  return (
    <Page title="Check Out">
      <StyledRoot>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            mb: 4,
            textAlign: "center",
          }}
        >
          Choose Your Payment Method
        </Typography>
        <Box sx={{ mt: 8 }}>
          <div ref={paypalRef}></div>
        </Box>
        {loading && <Loading sub="Making Payment Please Wait" />}
      </StyledRoot>
    </Page>
  );
};

export default CheckOut;
