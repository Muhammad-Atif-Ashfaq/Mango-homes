import React, { lazy, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { styles } from "./styles";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { disLikeForm } from "../../../../store/actions/formActions";
import C_Alert from "../../../../components/Alerts/Alert";
import Success_Popup from "../../../../components/Alerts/Success_Popup";
const SeeMore = ({ card_data, createSuccess, data, type, agent_id }) => {
  const { p_detail, desc, det, amn, g_btn, r_btn } = styles;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [a_open, setA_open] = useState(false);
  const [loading_like, setLoading_like] = useState(false);
  const [like_alert, setLike_alert] = useState(false);
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const payment = useSelector((state) => state.auth.user.is_paid);
  const prospectId = useSelector((state) => state.auth.user.id);
  const liked = card_data.likes[0]?.prospectId == prospectId;
  // console.log(liked, "++++++++++++++++++LIKED");
  // console.log(card_data);
  const handleCheckout = () => {
    if (!payment) {
      setOpen(true);
      // navigate("/dashboard-customer/checkout", { state: card_data.agentId });
    } else {
      like();
    }
  };
  const handleDislike = () => {
    const body = {
      condoId: card_data.id,
      agentId: card_data.agentId,
      prospectId: prospectId,
      status: "unliked",
    };
    setLoading(true);
    dispatch(disLikeForm(body))
      .then((result) => {
        setLoading(false);
        createSuccess();
        console.log(result);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  const like = () => {
    const body = {
      condoId: card_data.id,
      agentId: card_data.agentId,
      prospectId: prospectId,
      status: "liked",
    };
    setLoading_like(true);
    dispatch(disLikeForm(body))
      .then((result) => {
        setLoading_like(false);
        setLike_alert(true);
        // createSuccess();
        console.log(result);
      })
      .catch((err) => {
        setLoading_like(false);
        console.log(err);
      });
  };
  const handleClose_al = () => {
    setLike_alert(false);
    createSuccess();
  };
  // const handleCheckoutAgent = (val) => {
  //   setA_open(true);
  //   // navigate("/agent-dashboard/checkout", { state: card_data.prospect.id });
  // };
  return (
    <Box>
      {card_data.video_image && (
        <>
          <Typography sx={p_detail}>Video</Typography>
          <Card sx={{ mb: 4 }}>
            <CardContent
              sx={{
                [theme.breakpoints.up("md")]: {
                  height: "50%",
                  width: "50%",
                  ml: "23%",
                },
              }}
            >
              <video controls width="100%" height="auto">
                <source
                  src={`${import.meta.env.VITE_STORAGE_URL}${
                    card_data.video_image.url
                  }`}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            </CardContent>
          </Card>
        </>
      )}
      <Typography sx={p_detail}>Property Detail</Typography>
      <Typography sx={desc}>Description</Typography>
      <Typography sx={det}>{card_data.condo_description}</Typography>
      <Typography sx={p_detail}>Condo Amenities</Typography>
      <Grid container spacing={3}>
        {Object.values(card_data.condo_amenities).map((val, ind) => {
          return (
            <Grid item>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <CheckCircleOutlineIcon
                  sx={{
                    mr: 0.5,
                    fontSize: "1.5rem",
                    color: theme.palette.primary.main,
                  }}
                />
                <Typography sx={amn}>{val}</Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <Typography sx={{ ...p_detail, mt: 5 }}>Project Amenities</Typography>
      <Grid container spacing={3}>
        {Object.values(card_data.project_amenities).map((val, ind) => {
          return (
            <Grid item>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <CheckCircleOutlineIcon
                  sx={{
                    mr: 0.5,
                    fontSize: "1.5rem",
                    color: theme.palette.primary.main,
                  }}
                />
                <Typography sx={amn}>{val}</Typography>
              </Box>
            </Grid>
          );
        })}
      </Grid>
      <Typography sx={{ ...desc, my: 4 }}>Swimming Pool</Typography>
      <Typography sx={det}>{card_data.swimming_pool}</Typography>
      <Typography sx={{ ...p_detail, mt: 2 }}>Local Amenities:</Typography>
      <Typography sx={desc}>BTS / MRT Station details</Typography>
      <Typography sx={det}>{card_data.bts_mst_stations_details}</Typography>
      <Typography sx={desc}>Supermarket</Typography>
      <Typography sx={det}>{card_data.supermarkets_details}</Typography>
      <Typography sx={desc}>Restaurants/cafes/bars/ street food:</Typography>
      <Typography sx={det}>{card_data.local_entertainment_details}</Typography>
      {/* {type === "agent" && !card_data.is_paid_agent && (
        <Grid container>
          <Grid item xs={12} md={12} lg={12}>
            <Button
              variant="contained"
              color="error"
              onClick={() => handleCheckoutAgent(agent_id)}
            >
              Send Message
            </Button>
          </Grid>
        </Grid>
      )} */}
      {type === "prospect" && (
        <Box>
          {!liked && (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Button
                  sx={{
                    ...g_btn,
                    height: "100px",
                    borderRadius: "50%",
                    width: "100px",
                    mr: 2,
                  }}
                  // startIcon={!loading_like && <ThumbUpIcon />}
                  // fullWidth
                  onClick={loading_like ? null : handleCheckout}
                >
                  {loading_like ? (
                    <CircularProgress
                      sx={{
                        color: "#fff",
                      }}
                      size={20}
                    />
                  ) : (
                    <ThumbUpIcon sx={{ fontSize: "50px" }} />
                  )}
                </Button>
                <Button
                  sx={{
                    ...r_btn,
                    height: "100px",
                    borderRadius: "50%",
                    width: "100px",
                    mt: "auto",
                  }}
                  // startIcon={!loading && <ThumbDownIcon />}
                  // fullWidth
                  onClick={loading ? null : handleDislike}
                >
                  {loading ? (
                    <CircularProgress
                      sx={{
                        color: "#fff",
                      }}
                      size={20}
                    />
                  ) : (
                    <ThumbDownIcon sx={{ fontSize: "50px" }} />
                  )}
                </Button>
              </Box>
            </>
          )}
        </Box>
      )}
      <C_Alert
        open={open}
        close={() => setOpen(false)}
        msg="To 'thumbs up' properties and notify your interest to agents, a one-time property finder fee of $50 needs to be paid to Mango on Paypal. Once payment has been made, you can 'thumbs up' as many properties as you wish to open communication with agents and make new requests."
        note="If you don't receive any messages from agents within 24-hours of making payment then a full refund will be offered if you decide not to make
        further property search requests."
        to="/dashboard-customer/checkout"
        data={card_data.agentId}
      />
      {like_alert && (
        <Success_Popup
          msg="The agent has been notified of your
        interest in this property"
          action={false}
          onClose={handleClose_al}
        />
      )}
      {/* <C_Alert
        open={a_open}
        close={() => setA_open(false)}
        msg="To respond to this 'hot lead', a one-time $20 lead generation fee needs to be paid to Mango on Paypal. After payment has been made, you can message the prospect and open communication with them "
        note="If you send details of more than one property to the prospect and they 'thumbs up' more than one property, then you still only pay a one-time $20 fee to connect to this prospect"
        to="/agent-dashboard/checkout"
        data={card_data.prospect.id}
      /> */}
    </Box>
  );
};

export default SeeMore;
