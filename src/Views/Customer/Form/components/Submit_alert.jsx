import { Close } from "@mui/icons-material";
import {
  Box,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BodyText from "../../../../components/Text/BodyText";
import { useDispatch } from "react-redux";

const Submit_alert = () => {
  const [open, setOpen] = useState(true);
  const dispatch = useDispatch();
  const handleClose = () => {
    setOpen(false);
    dispatch({ type: "LOADING_FALSE" });
  };
  return (
    <Dialog open={open} fullWidth>
      <DialogTitle>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              flexGrow: 1,
            }}
          >
            <img src="/logo2.png" alt="logo" style={{ height: "50px" }} />
          </Box>
          <IconButton onClick={handleClose}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <Divider />
      <DialogContent>
        <BodyText>
          Your request has been sent to our partner agents. You should start to
          receive results shortly. We will send you an email alert each time a
          result arrives in your Mango account. Please check your email spam
          folder as emails may not reach your inbox.
        </BodyText>
      </DialogContent>
      <Divider />
    </Dialog>
  );
};

export default Submit_alert;
