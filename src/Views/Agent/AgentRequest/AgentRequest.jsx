import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Grid,
  Stack,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAgentForms } from "../../../store/actions/agentActions/agentFormActions";
import RequestForm from "./components/RequestForm";
import { RingLoader } from "react-spinners";
import NoDataFound from "../../Customer/CustomerRequest/components/NoDataFound";
import HeadingText from "../../../components/Text/HeadingText";
const AgentRequest = () => {
  // console.log("RENDERSSSS");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.user.id);
  const getData = () => {
    setLoading(true);
    dispatch(getAgentForms("approved", id))
      .then((result) => {
        setLoading(false);
        setData(result.data.data.data);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const theme = useTheme();
  return (
    <Box>
      <HeadingText>Requests</HeadingText>
      {loading ? (
        <Box
          sx={{
            height: "60vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <RingLoader color="#0A6EB7" loading={loading} size={130} />
        </Box>
      ) : (
        <RequestForm data={data} createSuccess={getData} />
      )}
      {!loading && data.length < 1 ? (
        <NoDataFound msg={"There are currently no requests"} nomsg={true} />
      ) : (
        ""
      )}
    </Box>
  );
};

export default AgentRequest;
