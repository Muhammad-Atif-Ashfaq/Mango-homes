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
import React from "react";
import BodyText from "../../../../components/Text/BodyText";

const NoDataFound = ({ msg, type, nomsg }) => {
  const [open, setOpen] = React.useState(true);
  return (
    <Box>
      <Typography
        variant="h4"
        textAlign="center"
        mt={15}
        fontWeight="bold"
        sx={{ color: "#d3d3d3" }}
      >
        {msg}
      </Typography>
      {type === "leads" || nomsg ? null : (
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
              <IconButton onClick={() => setOpen(false)}>
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <Divider />
          <DialogContent>
            <BodyText>
              Your request has been sent to our partner agents. You should start
              to receive results shortly. We will send you an email alert each
              time a result arrives in your Mango account. Please check your
              email spam folder as emails may not reach your inbox.
            </BodyText>
          </DialogContent>
          <Divider />
        </Dialog>
      )}
    </Box>
  );
};

export default NoDataFound;
