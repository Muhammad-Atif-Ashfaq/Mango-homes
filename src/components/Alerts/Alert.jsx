import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import BodyText from "../Text/BodyText";

const C_Alert = ({ open, close, msg, note, data, to }) => {
  const navigate = useNavigate();
  const handleCheckout = () => {
    navigate(to, { state: data });
  };
  return (
    <Dialog open={open} close={close} fullWidth>
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
          <IconButton onClick={close}>
            <Close />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <BodyText>{msg}</BodyText>
        <Typography sx={{ mt: 1 }}>
          <strong>Please note:</strong>
          {note}
        </Typography>
      </DialogContent>
      {/* <DialogActions> */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          p: 3,
        }}
      >
        <Button onClick={handleCheckout} variant="contained">
          Proceed to PayPal
        </Button>
      </Box>
      {/* </DialogActions> */}
    </Dialog>
  );
};

export default C_Alert;
