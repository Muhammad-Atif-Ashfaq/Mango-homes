import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Badge,
  Box,
  Button,
  Card,
  DialogActions,
  Grid,
  Stack,
  TextField,
  Tooltip,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { destroyAgentRequest } from "../../../../store/actions/agentActions/agentFormActions";
import { Success } from "../../../../components/Alerts/Success";
import Loading from "../../../../components/Alerts/Loading";
import CustomBox from "./CustomBox";
import Custom_Fields from "./Custom_Fields";
import Success_Popup from "../../../../components/Alerts/Success_Popup";

const DeleteButton = styled(Button)(({ theme }) => ({
  width: "140px",
  height: "46px",
  flexShrink: 0,
  borderRadius: "4px",
  background: "#EC4D4A",
  ":hover": {
    background: "#EC4D4A",
  },
  [theme.breakpoints.down("sm")]: {
    width: "100px",
    height: "40px",
  },
}));
const InfoButton = styled(Button)(({ theme }) => ({
  width: "140px",
  height: "46px",
  flexShrink: 0,
  borderRadius: "4px",
  background: "var(--Main-Blue, #0A6EB7)",
  ":hover": {
    background: "#0A6EB7",
  },
  [theme.breakpoints.down("sm")]: {
    width: "110px",
    height: "40px",
  },
}));
const RequestForm = ({ data, createSuccess }) => {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const navigate = useNavigate();
  const agentId = useSelector((state) => state.auth.user.id);
  const dispatch = useDispatch();
  const theme = useTheme();
  const [popUp, setPopup] = useState(false);
  const [val_state, setVal_state] = useState(null);
  const handleExpand = (index) => {
    // setExpanded(!expanded);
    setExpandedIndex(index === expandedIndex ? null : index);
  };
  const handleSendInfo = (val) => {
    // console.log(val);
    setPopup(true);
    setVal_state(val);
    // handleClosePopUp(val);
  };
  const handleClosePopUp = (val) => {
    // navigate("/agent-dashboard/send-info", { state: val });
  };
  const handleCheckout = (val) => {
    navigate("/agent-dashboard/checkout", { state: val });
  };
  const handleDestory = (val) => {
    setLoading(true);
    // console.log();
    dispatch(destroyAgentRequest(agentId, val.id))
      .then((result) => {
        // console.log(agentId, 'ddd')
        createSuccess();
        setLoading(false);
        Success("Deleted Successfully");
        // console.log(result, "ffffff");
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  return (
    <Box>
      <Grid container spacing={2}>
        {data.map((val, index) => {
          // console.log(val, "AGENT");
          const isExpanded = index === expandedIndex;
          const splits = val.answers[0]?.ans.split(",");
          let btsValues = [];
          let mrtValues = [];
          let otherValues = [];

          splits.forEach((value) => {
            let trimmedValue = value.trim();
            if (
              !trimmedValue.startsWith("BTS") &&
              !trimmedValue.startsWith("MRT")
            ) {
              otherValues.push(trimmedValue);
            } else if (value.trim().startsWith("BTS")) {
              btsValues.push(value.trim());
            } else if (value.trim().startsWith("MRT")) {
              mrtValues.push(value.trim());
            }
          });

          return (
            <Grid item xs={12} lg={12} sx={{ mt: 2 }}>
              <Card sx={{ borderRadius: "25px" }} elevation={5}>
                <Box
                  sx={{
                    p: 5,
                    borderBottom: "none",
                  }}
                >
                  <Stack spacing={1} sx={{ gap: "20px" }}>
                    <CustomBox
                      name="Name:"
                      value={
                        val.prospect?.firstname +
                        " " +
                        val.prospect?.lastname.charAt(0)
                      }
                    />
                    <CustomBox
                      name="Areas:"
                      value={`${btsValues.join(",") + ","} ${
                        mrtValues.join(", ") + ","
                      } ${otherValues.join(", ")} `}
                    />

                    <CustomBox
                      name="Type of property:"
                      value={val.answers[1]?.ans}
                    />

                    <CustomBox
                      name="Renting timeframe:"
                      value={val.answers[2]?.ans}
                    />
                    <CustomBox
                      name="Rental period:"
                      value={val.answers[3]?.ans}
                    />
                    <CustomBox
                      name="Budget"
                      value={
                        "฿" +
                        val.answers[6]?.ans_from +
                        " - " +
                        "฿" +
                        val.answers[6]?.ans_to
                      }
                    />
                  </Stack>
                </Box>
                <Accordion expanded={isExpanded} elevation={0}>
                  <AccordionSummary
                    onClick={() => handleExpand(index)}
                    aria-controls={`panel${index + 1}-content`}
                    id={`panel${index + 1}-header`}
                  >
                    <Box
                      sx={{
                        ml: "auto",
                      }}
                    >
                      <Button
                        variant="contained"
                        endIcon={
                          isExpanded ? (
                            <ArrowUpwardIcon />
                          ) : (
                            <ArrowDownwardIcon />
                          )
                        }
                        sx={{ width: "130px" }}
                      >
                        {isExpanded ? "See Less" : "See More"}
                      </Button>
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    {/* <Grid container spacing={3}>
                      {Object.values(val?.answers).map((value, ind) => {
                        const length = Object.values(val?.answers).length;
                        const condition =
                          length - 2 === ind || length - 1 === ind;
                        return (
                          <Grid
                            item
                            xs={12}
                            md={6}
                            lg={condition ? 12 : 4}
                            key={ind}
                          >
                            <Typography sx={{ fontSize: "12px", mb: -0.5 }}>
                              {value.title}
                            </Typography>
                            {length - 1 === ind ? (
                              <TextField
                                value={value.ans}
                                fullWidth
                                multiline
                                rows={4}
                                sx={{ mt: 0.5 }}
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                            ) : (
                              <TextField
                                fullWidth
                                value={value.ans}
                                variant="standard"
                                InputProps={{
                                  readOnly: true,
                                }}
                              />
                            )}
                          </Grid>
                        );
                      })}
                    </Grid> */}
                    <Grid container spacing={3}>
                      <Custom_Fields
                        title={Object.values(val?.answers)[4].title}
                        value={Object.values(val?.answers)[4].ans}
                      />
                      <Custom_Fields
                        title={Object.values(val?.answers)[5].title}
                        value={Object.values(val?.answers)[5].ans}
                      />
                      <Custom_Fields
                        title={Object.values(val?.answers)[7].title}
                        value={
                          Object.values(val?.answers)[7].ans_from +
                          " " +
                          "m sq" +
                          " " +
                          "-" +
                          val?.answers[7].ans_to +
                          " " +
                          "m sq"
                        }
                      />
                      <Custom_Fields
                        title={Object.values(val?.answers)[8].title}
                        value={Object.values(val?.answers)[8].ans}
                      />
                      <Custom_Fields
                        title={Object.values(val?.answers)[9].title}
                        value={Object.values(val?.answers)[9].ans}
                      />
                      <Custom_Fields
                        title={Object.values(val?.answers)[10].title}
                        value={Object.values(val?.answers)[10].ans}
                      />
                      <Custom_Fields
                        title={Object.values(val?.answers)[11].title}
                        value={Object.values(val?.answers)[11].ans}
                      />
                      <Custom_Fields
                        title={Object.values(val?.answers)[12].title}
                        value={Object.values(val?.answers)[12].ans}
                      />
                      <Custom_Fields
                        title={Object.values(val?.answers)[13].title}
                        value={Object.values(val?.answers)[13].ans}
                      />
                      <Custom_Fields
                        title={Object.values(val?.answers)[14].title}
                        value={Object.values(val?.answers)[14].ans}
                      />
                      <Custom_Fields
                        title={Object.values(val?.answers)[15].title}
                        value={Object.values(val?.answers)[15].ans}
                      />
                    </Grid>

                    <Box
                      sx={{
                        p: 4,
                        ml: "auto",
                        [theme.breakpoints.down("md")]: {
                          display: "flex",
                        },
                      }}
                    >
                      <DeleteButton
                        variant="contained"
                        sx={{ mr: 2 }}
                        onClick={() => handleDestory(val)}
                      >
                        Delete
                      </DeleteButton>
                      {/* {console.log(val.condo_count, "VAL++++++++++++")} */}
                      <Tooltip
                        title={
                          val.condo_count >= 3
                            ? "Your sending limit has exceed"
                            : ""
                        }
                        arrow
                        placement="top"
                      >
                        <InfoButton
                          variant="contained"
                          onClick={
                            val.condo_count >= 3
                              ? null
                              : () => handleSendInfo(val)
                          }
                          sx={{
                            cursor:
                              val.condo_count >= 3 ? "not-allowed" : "pointer",
                          }}
                          // component={Link}
                          // to="/agent-dashboard/send-info"
                        >
                          Send Info
                        </InfoButton>
                      </Tooltip>
                      {/* {val.is_paid ? (
                        ) : (
                          <InfoButton
                            variant="contained"
                            // onClick={() => handleSendInfo(val)}
                            startIcon={<PaidIcon />}
                            onClick={() => handleCheckout(val.prospectId)}
                            // component={Link}
                            // to="/agent-dashboard/send-info"
                          >
                            CheckOut
                          </InfoButton>
                        )} */}
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Card>
            </Grid>
          );
        })}
        {loading && <Loading sub="Please Wait" />}
        {popUp && (
          <Success_Popup
            onClose={handleClosePopUp}
            msg="You can send details of up to 3 properties for each prospect request. If the same prospect
            makes a second request then you can send details for another 3 properties."
            action="true"
            val={val_state}
          />
        )}
      </Grid>
    </Box>
  );
};

export default RequestForm;
