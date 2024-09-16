import React, { useState } from "react";
import AgentDashboard from "../../../../layouts/Agent/Dashboard/AgentDashboard";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Divider,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
// import Slider from 'react-slick';
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';
import CloseIcon from "@mui/icons-material/Close";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
const ChatBox = () => {
  const { state } = useLocation();
  console.log(state, "this is state");
  const [activeStep, setActiveStep] = React.useState(0);
  const allImages = state && state.all_images ? state.all_images : [];
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
  const theme = useTheme();
  const textFieldStyle = {
    width: "100%",
    border: "1px solid #ccc",
    borderRadius: "8px 8px 0px 0px",
    // borderBottom: 'none',
    padding: "10px",
  };
  const images = [
    {
      label: "San Francisco – Oakland Bay Bridge, United States",
      imgPath:
        "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
    },
    {
      label: "Bird",
      imgPath:
        "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
    },
    {
      label: "Bali, Indonesia",
      imgPath:
        "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250",
    },
    {
      label: "Goč, Serbia",
      imgPath:
        "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
    },
  ];
  // Configuration for the slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleMessageSend = () => {
    if (message.trim() !== "") {
      setChatMessages([...chatMessages, { content: message, sender: "user" }]);
      setMessage("");
    }
  };
  const navigate = useNavigate();
  const handleCross = () => {
    navigate("/dashboard-customer/customer-req");
  };
  return (
    <>
      <AgentDashboard />
      <Box sx={{ textAlign: "end", padding: "0px 20px" }}>
        <CloseIcon onClick={handleCross} />
      </Box>
      <Box sx={{ display: "flex", padding: "10px", gap: "10px" }}>
        {/* <Box flex={1}> */}
        {/* <Slider {...sliderSettings}> */}
        {/* {allImages.map((val, ind) => (
            <div key={ind}>
              {console.log(val.url, 'val')}
              <img src={val.url} alt="" />
            </div>
          ))} */}
        {/* </Slider> */}
        {/* <img src="/main_logo.png" alt="" /> */}
        {/* </Box> */}
        <Box flex={1}>
          <AutoPlaySwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {images.map((step, index) => (
              <div key={step.label}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <Box
                    component="img"
                    sx={{
                      height: "100%",
                      display: "block",
                      overflow: "hidden",
                      width: "100%",
                      borderRadius: "3px",
                    }}
                    src={step.imgPath}
                    alt={step.label}
                  />
                ) : null}
              </div>
            ))}
          </AutoPlaySwipeableViews>
        </Box>
        <Box flex={3}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Typography sx={{ color: "blue" }}>
              3 - BR House Near ARL Rankhamheang
            </Typography>
            <Divider />
            <Typography sx={{ color: "gray" }}>Silon, Bangkok</Typography>
            <Typography sx={{ fontWeight: 600 }}>B12,500,000/month</Typography>
            <Divider />
            <Box sx={{ display: "flex", gap: "20px" }}>
              <Typography fontWeight={"bold"}>5 BR</Typography>
              <Typography fontWeight={"bold"}>2200 Sq.Ft</Typography>
              <Typography fontWeight={"bold"}>Immediately</Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box sx={{ padding: "10px" }}>
        <Divider />
      </Box>
      <Box sx={{ mt: 5 }}>
        <Box sx={{ overflowY: "auto", maxHeight: "200px" }}>
          {chatMessages.map((chat, index) => (
            <Box
              key={index}
              sx={{
                //   alignSelf: "flex-end",
                backgroundColor: chat.sender === "user" ? "#d3f4ff" : "#f0f0f0",
                padding: "5px",
                borderBottom: "",
                borderRadius: "10px",
                marginBottom: "5px",
                width: "75%",
                ml: "auto",
              }}
            >
              <Typography variant="body2">{chat.content}</Typography>
            </Box>
          ))}
        </Box>
        <Box sx={{ display: "flex", marginTop: "10px", position: "relative" }}>
          <input
            placeholder="Start Typing..."
            // size="small"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            style={textFieldStyle}
          />
          <Box
            sx={{
              position: "absolute",
              top: 5,
              right: 10,
              margin: "0 auto",
              transform: "translateY(0%)",
              cursor: "pointer",
            }}
          >
            <SendOutlinedIcon
              // variant="contained"
              sx={{ marginLeft: "10px" }}
              onClick={handleMessageSend}
            />

            {/* </SendOutlinedIcon> */}
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default ChatBox;
