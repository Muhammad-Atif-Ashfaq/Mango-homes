import { Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import { useAccordionButton } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import BodyText from "../Text/BodyText";

const Success_Popup = ({ onClose, msg, action, val }) => {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const navigate = useNavigate();
  const hnadleCont = () => {
    navigate("/agent-dashboard/send-info", { state: val });
  };
  return (
    <Box>
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
            {!action && (
              <IconButton onClick={onClose}>
                <Close />
              </IconButton>
            )}
          </Box>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <BodyText>{msg}</BodyText>
        </DialogContent>
        <Divider />
        {action && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              padding: "10px 0px",
            }}
          >
            <Button variant="contained" onClick={hnadleCont}>
              Continue
            </Button>
          </Box>
        )}
      </Dialog>
    </Box>
  );
};

export default Success_Popup;
