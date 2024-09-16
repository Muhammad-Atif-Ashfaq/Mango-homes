import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import StyledCard from "./components/StyledCard";
import Upload from "./components/Upload";
import Location from "./components/Location/Location";
import { styles } from "./styles";
import Bedrooms from "./components/Bedrooms";
import RentalPeriod from "./components/RentalPeriod";
import Amenities from "./components/Amenities";
import Amenities_Projects from "./components/Amenities_Projects";
import Amenitites_Local from "./components/Amenitites_Local";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { sendAgentRequest } from "../../../../../store/actions/agentActions/agentFormActions";
import { useSnackbar } from "notistack";
import Loading from "../../../../../components/Alerts/Loading";
import { Success } from "../../../../../components/Alerts/Success";
import Success_Popup from "../../../../../components/Alerts/Success_Popup";
const { headingStyle, root, btn_submit } = styles;
const SendAgentRequest = () => {
  const initialValues = {
    agentId: "",
    prospectId: "",
    formId: "",
    note: "",
    images: "",
    video: "",
    video_link: "",
    condo_name: "",
    location_bts_mrt: "",
    latitude: "123456",
    longitude: "123456",
    condo_location: "",
    move_in_date: "",
    bedrooms: "",
    condo_size: "",
    rental_period: "",
    monthly_cos: "",
    condo_description: "",
    condo_amenities: "",
    project_amenities: "",
    swimming_pool: "",
    bts_mst_stations_details: "",
    supermarkets_details: "",
    local_entertainment_details: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [loading, setLoading] = useState(false);
  const [pop_up, setPop_up] = useState(false);
  // const [pop_up2, setPop_up2] = useState(false);
  const [redirectAfterSuccess, setRedirectAfterSuccess] = useState(false);
  const { state } = useLocation();
  const last_value = Object.values(state.answers).length - 1;
  const desc = state.answers[last_value].ans;
  const agent_id = useSelector((state) => state.auth.user.id);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const img_error = formValues.images === "";
  const vid_error = formValues.video === "";
  const link_error = formValues.video_link === "";
  const c_name_error = formValues.condo_name === "";
  const loc_bts_error = formValues.location_bts_mrt === "";
  const lat_error = formValues.latitude === "";
  const long_error = formValues.longitude === "";
  const loc_condo_error = formValues.condo_location === "";
  const bed_error = formValues.bedrooms === "";
  const size_error = formValues.condo_size === "";
  const rent_error = formValues.rental_period === "";
  const cos_error = formValues.monthly_cos === "";
  const desc_error = formValues.condo_description === "";
  const ame_error = formValues.condo_amenities === "";
  const pro_ame_error = formValues.project_amenities === "{}";
  const pool_error = formValues.swimming_pool === "";
  const bts_error = formValues.bts_mst_stations_details === "";
  const super_error = formValues.supermarkets_details === "";
  const local_error = formValues.local_entertainment_details === "";
  const m_error = formValues.move_in_date === "";
  console.log(vid_error);
  //   console.log(agent_id);
  const handleUploadData = (data) => {
    setFormValues({ ...formValues, ...data });
  };
  const handleChangeData = (data) => {
    setFormValues({ ...formValues, ...data });
  };
  const handleSubmit = () => {
    const send_data = {
      ...formValues,
      agentId: agent_id,
      prospectId: state.prospect.id,
      formId: state.id,
      note: desc,
    };
    if (img_error) {
      enqueueSnackbar("Please upload image/s", { variant: "error" });
    } else if (c_name_error) {
      enqueueSnackbar("Please enter condo name", {
        variant: "error",
      });
    } else if (loc_bts_error) {
      enqueueSnackbar("Please select BTS/MRT location", {
        variant: "error",
      });
    } else if (bed_error) {
      enqueueSnackbar("Please select number of bedrooms", {
        variant: "error",
      });
    } else if (size_error) {
      enqueueSnackbar("Please enter condo size", {
        variant: "error",
      });
    } else if (cos_error) {
      enqueueSnackbar("Please enter monthly cost", {
        variant: "error",
      });
    } else if (rent_error) {
      enqueueSnackbar("Please select rental period", {
        variant: "error",
      });
    } else if (desc_error) {
      enqueueSnackbar("Please enter condo and project description", {
        variant: "error",
      });
    } else if (ame_error) {
      enqueueSnackbar("Please select condo amenities", {
        variant: "error",
      });
    } else if (pro_ame_error) {
      enqueueSnackbar("Please select project amenities", {
        variant: "error",
      });
    } else if (pool_error) {
      enqueueSnackbar("Please pool option", {
        variant: "error",
      });
    } else if (bts_error) {
      enqueueSnackbar("Please enter bts/mrt stations", {
        variant: "error",
      });
    } else if (super_error) {
      enqueueSnackbar("Please enter about supermarkets", {
        variant: "error",
      });
    } else if (local_error) {
      enqueueSnackbar("Please enter about local entertainment", {
        variant: "error",
      });
    } else if (m_error) {
      enqueueSnackbar("Please select move in date", {
        variant: "error",
      });
    } else {
      setLoading(true);
      dispatch(sendAgentRequest(send_data))
        .then((result) => {
          setLoading(false);
          dispatch({ type: "LOADING_TRUE" });
          navigate("/agent-dashboard/hot-leads");
          // Success("Form Submitted Successfully!");
          // setPop_up(true);
          console.log(result);
        })
        .catch((err) => {
          setLoading(false);
          enqueueSnackbar(err.respose.data.message, {
            variant: "error",
          });
        });
    }
  };
  const [initialRender, setInitialRender] = useState(true);
  const handlePopupClose = () => {
    setPop_up(false);
    setRedirectAfterSuccess(true);
  };
  useEffect(() => {
    if (!pop_up && redirectAfterSuccess) {
      navigate("/agent-dashboard/hot-leads");
    }
  }, [pop_up, redirectAfterSuccess]);
  // useEffect(() => {
  //   console.log(formValues);
  //   setPop_up2(true);
  // }, [formValues]);
  // useEffect(() => {
  //   if (initialRender) {
  //     setPop_up2(true);
  //     setInitialRender(false);
  //   }
  // }, [initialRender]);
  useEffect(() => {
    console.log(formValues);
  }, [formValues]);
  return (
    <Box>
      <Typography sx={headingStyle}>Request</Typography>
      <Box sx={root}>
        <StyledCard>
          <Upload onUpload={handleUploadData} />
        </StyledCard>
        <StyledCard>
          <Location onChange={handleChangeData} />
        </StyledCard>
        <StyledCard>
          <Bedrooms
            onChangeBed={handleChangeData}
            onChangeRent={handleChangeData}
          />
        </StyledCard>
        <StyledCard>
          <Amenities onChangeAmenities={handleChangeData} />
          <Amenities_Projects onChangeAmenities={handleChangeData} />
        </StyledCard>

        <StyledCard>
          <Amenitites_Local onChangeAmenities_L={handleChangeData} />
        </StyledCard>
        {/* <StyledCard>
          <RentalPeriod onChangeRent={handleChangeData} />
        </StyledCard> */}

        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button sx={btn_submit} onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
        {loading && <Loading sub="Submitting Please wait..." />}
      </Box>
      {/* {pop_up && (
        <Success_Popup
          onClose={handlePopupClose}
          msg="The details of this property have been sent to the prospect. If they are interested, you will
          receive a response in ‘Hot Leads' as well as an email notification. Please check ‘Hot Leads’
          regularly as well as your spam email in case the email doesn't arrive in your inbox."
        />
      )} */}
      {/* {pop_up && (
        <Success_Popup
          onClose={handlePopupClose2}
          msg="You can send details of up to 3 properties for each prospect request. If the same prospect
          makes a second request then you can send details for another 3 properties."
          action="true"
        />
      )} */}
    </Box>
  );
};

export default SendAgentRequest;
