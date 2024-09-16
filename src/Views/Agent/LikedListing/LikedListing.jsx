import { Box, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLikedListings } from "../../../store/actions/agentActions/agentFormActions";
import CardComponent from "../../Customer/CustomerRequest/components/CardComponent";
import NoDataFound from "../../Customer/CustomerRequest/components/NoDataFound";
import HeadingText from "../../../components/Text/HeadingText";
import Success_Popup from "../../../components/Alerts/Success_Popup";

const LikedListing = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const agent_id = useSelector((state) => state.auth.user.id);
  //   console.log(agent_id);
  const getListings = () => {
    dispatch(getLikedListings(agent_id))
      .then((result) => {
        setData(result.data.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    getListings();
  }, []);
  const theme = useTheme();
  const handlePopupClose = () => {
    dispatch({ type: "LOADING_FALSE" });
  };
  const alert = useSelector((state) => state.alert.loading);
  return (
    <Box>
      <HeadingText variant="h4" fontWeight="bold">
        Hot Leads
      </HeadingText>
      {loading ? (
        <Typography>Please Wait</Typography>
      ) : (
        <CardComponent cardData={data} type="agent" agent_id={agent_id} />
      )}
      {!loading && data.data.length < 1 ? (
        <NoDataFound msg={"There are currently no Hot Leads"} type="leads" />
      ) : (
        ""
      )}
      {alert && (
        <Success_Popup
          onClose={handlePopupClose}
          msg="The details of this property have been sent to the prospect. If they are interested, you will
        receive a response in ‘Hot Leads' as well as an email notification. Please check ‘Hot Leads’
        regularly as well as your spam email in case the email doesn't arrive in your inbox."
        />
      )}
    </Box>
  );
};

export default LikedListing;
