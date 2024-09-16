import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import "./styles.css";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import MinimizeIcon from "@mui/icons-material/Minimize";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { useDispatch } from "react-redux";
import {
  getMessages,
  sendMessage,
} from "../../store/actions/prospectActions/messageActions";
import Pusher from "pusher-js";
import { RotatingLines } from "react-loader-spinner";
import { useSnackbar } from "notistack";
import DoneAllIcon from "@mui/icons-material/DoneAll";
const Msg_PopUp = ({ Id, condoId, close }) => {
  // console.log(Id);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [loading_msg, setLoading_msg] = useState(true);
  const [s_loading, setS_Loading] = useState(false);
  const scrollref = React.useRef();
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    const pusher = new Pusher("66a996d7c63fe6a9fac5", {
      cluster: "ap2",
    });
    const channel1 = pusher.subscribe(`condo-chat-${condoId}`);
    channel1.bind("new", function (data) {
      if (data.sendBy !== Id) {
        setMessages((prev) => [...prev, data]);
      }
      // console.log(data, "PUSHER DATA");
    });

    return () => {
      pusher.unsubscribe(`condo-chat-${condoId}`);
    };
  }, []);
  React.useEffect(() => {
    scrollref.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  const handleChange = (e) => {
    setMessage(e.target.value);
  };
  const handleSendMessage = () => {
    setS_Loading(true);
    // setLoading(true);
    setMessage("");
    const inputField = document.getElementById("chat-input");
    if (inputField) {
      inputField.focus();
    }
    // console.log(message);
    const body = {
      condoId: condoId,
      sendBy: Id,
      text: message,
    };
    setMessages((prevMessages) => [...prevMessages, body]);
    dispatch(sendMessage(body))
      .then((result) => {
        setLoading(false);
        setS_Loading(false);
        // console.log(result.data.data.text);

        // getAllMessages();
      })
      .catch((err) => {
        setLoading(false);
        setS_Loading(false);

        enqueueSnackbar(err.response.data.message, {
          variant: "error",
        });
        getAllMessages();
      });
    // setMessages([...messages, { text: message, sender: "client" }]);
  };
  const getAllMessages = () => {
    setLoading_msg(true);
    dispatch(getMessages(condoId))
      .then((result) => {
        setMessages(result.data.data);
        setLoading_msg(false);
      })
      .catch((err) => {
        setLoading_msg(false);
        console.log(err);
      });
  };
  useEffect(() => {
    getAllMessages();
  }, [condoId]);
  console.log(messages);
  return (
    <Box
      className="compose-popup"
      sx={{
        // borderRadius: "20px",
        // p: 0.5,
        background: "#fff",
      }}
    >
      <Box
        sx={{
          p: 1.5,
          //   mt: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#e2e2e2",
        }}
      >
        <Typography fontWeight="bold">New Message</Typography>
        <Box>
          {/* <OpenInFullIcon sx={{ mr: 2, fontSize: "18px" }} />
          <MinimizeIcon sx={{ mr: 2, fontSize: "18px" }} /> */}
          <CloseIcon
            sx={{ mr: 2, fontSize: "18px", cursor: "pointer" }}
            onClick={close}
          />
        </Box>
      </Box>
      <Box
        sx={{
          height: "calc(100% - 108px)",
          //   background: "red",
          overflowY: "auto",
          padding: "10px",
        }}
      >
        {loading_msg ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mt: 5,
            }}
          >
            <RotatingLines
              strokeColor="#040263"
              strokeWidth="5"
              animationDuration="0.75"
              width="30"
              visible={true}
            />
          </Box>
        ) : (
          messages.map((msg, index) => {
            // console.log(msg);
            return (
              <Box
                key={index}
                ref={scrollref}
                sx={{
                  textAlign: msg.sendBy === Id ? "right" : "left",
                  mb: 1,
                }}
              >
                <Typography
                  sx={{
                    background: msg.sendBy === Id ? "#2196f3" : "#ccc",
                    color: msg.sendBy === Id ? "#fff" : "#000",
                    borderRadius: "10px",
                    padding: "5px 10px",
                    maxWidth: "70%",
                    wordWrap: "break-word",
                    display: "inline-block",
                  }}
                >
                  {msg.text}
                  <Box key={index}>
                    {msg.sendBy === Id &&
                      (index === messages.length - 1 && s_loading ? (
                        <RotatingLines
                          key={index}
                          strokeColor="#fff"
                          strokeWidth="5"
                          animationDuration="0.75"
                          width="15"
                          visible={true}
                        />
                      ) : (
                        <DoneAllIcon sx={{ fontSize: "12px" }} />
                      ))}
                  </Box>
                </Typography>
              </Box>
            );
          })
        )}
      </Box>
      <Box sx={{ display: "flex" }}>
        <TextField
          label="Enter Message"
          size="small"
          fullWidth
          name="message"
          value={message}
          onChange={handleChange}
          id="chat-input"
        />
        <Button
          variant="contained"
          size="small"
          onClick={message.length > 0 ? handleSendMessage : null}
          disabled={message.length < 1}
        >
          {loading ? (
            <RotatingLines
              strokeColor="#040263"
              strokeWidth="5"
              animationDuration="0.75"
              width="30"
              visible={true}
            />
          ) : (
            "Send"
          )}
        </Button>
      </Box>
    </Box>
  );
};

export default Msg_PopUp;
