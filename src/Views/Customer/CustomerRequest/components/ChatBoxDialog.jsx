import React, { useState } from "react";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import CloseIcon from "@mui/icons-material/Close";
const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
const apiUrl = import.meta.env.VITE_REACT_APP_URL;
const textFieldStyle = {
  width: "100%",
  border: "1px solid #ccc",
  borderRadius: "8px",
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

const ChatBoxDialog = ({ open, close, data }) => {
  //   console.log(data, 'this isis data')
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = images.length;
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState([]);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleMessageSend = () => {
    if (message.trim() !== "") {
      setChatMessages([...chatMessages, { content: message, sender: "user" }]);
      setMessage("");
      // Keep focus on the input field after sending the message
      const inputField = document.getElementById("chat-input");
      if (inputField) {
        inputField.focus();
      }
    }
  };

  return (
    <Dialog open={open} onClose={close} sx={{ width: "100%" }}>
      <DialogTitle>Property Title</DialogTitle>
      <Box sx={{ textAlign: "end", padding: "0px 20px", cursor: "pointer" }}>
        <CloseIcon onClick={close} />
      </Box>
      <Divider />
      <DialogContent>
        <Box
          sx={{
            // height: "200px",
            height: "100%",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box sx={{ display: "flex", gap: "10px" }}>
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
                          height: "auto",
                          display: "block",
                          overflow: "hidden",
                          width: "100%",
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
              <Box
                sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
              >
                <Typography sx={{ color: "blue" }}>
                  {data.condo_name}
                </Typography>
                <Divider />
                <Typography sx={{ color: "gray" }}>
                  {data.condo_location}
                </Typography>
                <Typography sx={{ fontWeight: 600 }}>
                  {data.monthly_cos}
                </Typography>
                <Divider />
                <Box sx={{ display: "flex", gap: "20px" }}>
                  <Typography fontWeight={"bold"}>{data.condo_size}</Typography>
                  {/* <Typography fontWeight={'bold'}>2200 Sq.Ft</Typography>
                  <Typography fontWeight={'bold'}>Immediately</Typography> */}
                </Box>
              </Box>
            </Box>
          </Box>
          <Box sx={{ padding: "0px 10px" }}>
            <Divider />
          </Box>
        </Box>
        <Box sx={{ mt: 5 }}>
          <Box sx={{ overflowY: "auto", maxHeight: "200px" }}>
            {chatMessages.map((chat, index) => (
              <Box
                key={index}
                sx={{
                  //   alignSelf: "flex-end",
                  backgroundColor:
                    chat.sender === "user" ? "#d3f4ff" : "#f0f0f0",
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
          <Box
            sx={{ display: "flex", marginTop: "10px", position: "relative" }}
          >
            <input
              id="chat-input"
              placeholder="Start Typing..."
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
      </DialogContent>
    </Dialog>
  );
};

export default ChatBoxDialog;
