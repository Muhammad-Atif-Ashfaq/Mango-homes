import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { useEffect, useState } from "react";
import CardComponent from "./components/CardComponent";
import { styles } from "./components/styles";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { Link } from "react-router-dom";
import NoDataFound from "./components/NoDataFound";
import { useDispatch, useSelector } from "react-redux";
import { getProspectForms } from "../../../store/actions/formActions";
import { RingLoader } from "react-spinners";
import HeadingText from "../../../components/Text/HeadingText";
import Submit_alert from "../Form/components/Submit_alert";
const CustomerRequest = () => {
  const { c_req } = styles;
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.user.id);
  const alert = useSelector((state) => state.alert.loading);
  // console.log(alert);
  const getData = () => {
    setLoading(true);
    dispatch(getProspectForms(id))
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
    getData();
  }, []);
  // console.log(data, "+DATA+");
  const theme = useTheme();
  return (
    <div>
      <Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 3,
          }}
        >
          <HeadingText
          // sx={{
          //   ...c_req,
          //   [theme.breakpoints.down("sm")]: {
          //     fontSize: "25px",
          //   },
          // }}
          >
            Results
          </HeadingText>
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineIcon />}
            component={Link}
            to="/dashboard-customer/form"
            sx={{
              [theme.breakpoints.down("sm")]: {
                fontSize: "12px",
              },
            }}
          >
            Add New Request
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <RingLoader color="#0A6EB7" loading={true} size={100} />
          </Box>
        ) : (
          <CardComponent
            cardData={data}
            createSuccess={getData}
            type="prospect"
          />
        )}
        {!loading && data.data.length < 1 ? (
          <NoDataFound msg={"There are currently no results"} nomsg={true} />
        ) : (
          ""
        )}
      </Box>
      {alert && <Submit_alert />}
    </div>
  );
};

export default CustomerRequest;
