import {
  Box,
  Card,
  CardContent,
  Typography,
  styled,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Grid,
  useTheme,
  Badge,
  useMediaQuery,
} from "@mui/material";

import React, { lazy, useEffect, useState } from "react";
import { styles } from "./styles";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import SeeMore from "./SeeMore";
import { Chat } from "@mui/icons-material";
import { useSelector } from "react-redux";
import Msg_PopUp from "../../../../components/Message_PopUp/Msg_PopUp";
import Pusher from "pusher-js";
import CarouselComponent from "./CarouselComponent";
import Small_Screen from "./Small_screen/Small_Screen";
import Large_Screen from "./Large_Screen/Large_Screen";
import C_Alert from "../../../../components/Alerts/Alert";
// const C_Alert = lazy(() => import("../../../../components/Alerts/Alert"));
const CardComponent = ({ cardData, createSuccess, type, agent_id }) => {
  // console.log(cardData);
  const [composeOpen, setComposeOpen] = useState(false);
  const [a_open, setA_open] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [chatBox, setChatBox] = useState(false);
  const [editData, setEditData] = useState("");
  const [condoId, setCondoId] = useState("");
  const [data_p, setData] = useState(cardData.data);
  const theme = useTheme();
  const prospectId = useSelector((state) => state.auth.user.id);

  useEffect(() => {
    setData(cardData.data);
  }, [cardData.data]);
  useEffect(() => {
    const pusher = new Pusher("66a996d7c63fe6a9fac5", {
      cluster: "ap2",
    });
    const channel1 = pusher.subscribe(`condo-list`);
    channel1.bind("new", function (data) {
      if (data.sendBy !== prospectId) {
        updateUnreadChatCount(data.condoId);
      }
    });

    return () => {
      pusher.unsubscribe(`condo-list`);
    };
  }, []);
  const handleExpand = (index) => {
    setExpandedIndex(index === expandedIndex ? null : index);
  };

  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric", year: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };
  const handleChatBox = (data) => {
    setChatBox(true);
    setEditData(data);
    setCondoId(data.id);
    setData((prevData) =>
      prevData.map((item) => {
        if (item.id === data.id) {
          return { ...item, unreadChatCount: 0 };
        }
        return item;
      })
    );
  };
  const handleComposeClick = () => {
    setComposeOpen(true);
  };

  const handleComposeClose = () => {
    setComposeOpen(false);
  };
  const updateUnreadChatCount = (condoId) => {
    setData((prevData) =>
      prevData.map((item) => {
        if (item.id === condoId) {
          return { ...item, unreadChatCount: (item.unreadChatCount || 0) + 1 };
        }
        return item;
      })
    );
  };
  const handleCheckoutAgent = (val) => {
    setA_open(true);
    // navigate("/agent-dashboard/checkout", { state: card_data.prospect.id });
  };
  const is_small = useMediaQuery(theme.breakpoints.down("md"));
  // console.log(data_p);
  return (
    <Box sx={{ p: 1 }}>
      <Grid container spacing={2}>
        {data_p.map((Card_Data, index) => {
          const formattedDate = formatDate(Card_Data?.created_at);
          const isExpanded = index === expandedIndex;
          const liked = Card_Data.likes[0]?.prospectId == prospectId;
          return (
            <Grid item xs={12} lg={12} md={12} sx={{ mt: 2 }}>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                {type === "agent" && !Card_Data.is_paid_agent && (
                  <Button
                    sx={{ zIndex: 9 }}
                    variant="contained"
                    color="error"
                    onClick={() => handleCheckoutAgent(agent_id)}
                  >
                    Send Message
                  </Button>
                )}
                {type === "prospect" && Card_Data.is_prospect_chat && (
                  <Badge
                    badgeContent={Card_Data.unreadChatCount}
                    sx={{
                      "& .MuiBadge-badge": {
                        color: "white",
                        backgroundColor: "red",
                        minWidth: "25px",
                        minHeight: "25px",
                        fontSize: "15px",
                        zIndex: 10,
                      },
                    }}
                  >
                    <Button
                      variant="contained"
                      startIcon={<Chat />}
                      onClick={() => handleChatBox(Card_Data)}
                      sx={{ zIndex: 9 }}
                    >
                      Messages
                    </Button>
                  </Badge>
                )}
                {type === "agent" && Card_Data.is_paid_agent && (
                  <Badge
                    badgeContent={Card_Data.unreadChatCount}
                    sx={{
                      "& .MuiBadge-badge": {
                        color: "white",
                        backgroundColor: "red",
                        minWidth: "25px",
                        minHeight: "25px",
                        fontSize: "15px",
                        zIndex: 10,
                      },
                    }}
                  >
                    <Button
                      variant="contained"
                      startIcon={<Chat />}
                      onClick={() => handleChatBox(Card_Data)}
                      sx={{ zIndex: 9 }}
                    >
                      Messages
                    </Button>
                  </Badge>
                )}
              </Box>
              <Card
                sx={{
                  // border: "1px solid rgba(0,0,0,0.3)",
                  borderRadius: "10px",
                  mt: -1,
                }}
                elevation={5}
              >
                {is_small && <CarouselComponent Card_Data={Card_Data} />}
                <CardContent
                  sx={{
                    display: "flex",
                    [theme.breakpoints.down("md")]: {
                      flexDirection: "column",
                    },
                  }}
                >
                  <Box
                    sx={{
                      flex: "70%",
                      height: "200px",
                      mt: 3,
                      [theme.breakpoints.down("md")]: {
                        flex: "50%",
                      },
                      [theme.breakpoints.down("sm")]: {
                        flex: "50%",
                        height: "100px",

                        // height: "50%",
                      },
                    }}
                  >
                    {!is_small && <CarouselComponent Card_Data={Card_Data} />}
                    {/* <img
                      src="/image.jpg"
                      alt="example"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    /> */}
                  </Box>
                  <Box
                    sx={{
                      flex: "50%",
                      padding: "0 15px",
                      display: "flex",
                      alignItems: "start",
                      // justifyContent: "center",
                      flexDirection: "column",
                      [theme.breakpoints.down("md")]: {
                        flex: "50%",
                      },
                      [theme.breakpoints.down("sm")]: {
                        flex: "70%",
                        mt: 4,
                      },
                    }}
                  >
                    {is_small ? (
                      <Small_Screen
                        Card_Data={Card_Data}
                        formattedDate={formattedDate}
                      />
                    ) : (
                      <Large_Screen
                        Card_Data={Card_Data}
                        formattedDate={formattedDate}
                      />
                    )}
                  </Box>
                </CardContent>
                <Accordion expanded={isExpanded} sx={{ mt: 2 }}>
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
                    <SeeMore
                      card_data={Card_Data}
                      createSuccess={createSuccess}
                      type={type}
                      agent_id={agent_id}
                    />
                  </AccordionDetails>
                </Accordion>
              </Card>
              <C_Alert
                open={a_open}
                close={() => setA_open(false)}
                msg="To respond to this 'hot lead', a one-time $20 lead generation fee needs to be paid to Mango on Paypal. After payment has been made, you can message the prospect and open communication with them "
                note="If you send details of more than one property to the prospect and they 'thumbs up' more than one property, then you still only pay a one-time $20 fee to connect to this prospect"
                to="/agent-dashboard/checkout"
                data={Card_Data.prospect.id}
              />
            </Grid>
          );
        })}
      </Grid>
      {chatBox && (
        <Msg_PopUp
          Id={prospectId}
          condoId={condoId}
          open={chatBox}
          close={() => setChatBox(false)}
        />
      )}
      {/* <ChatBoxDialog
        open={chatBox}
        close={() => setChatBox(false)}
        data={editData}
      /> */}
    </Box>
  );
};

export default CardComponent;
