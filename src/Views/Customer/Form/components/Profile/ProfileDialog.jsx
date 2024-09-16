import {
  Avatar,
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Typography,
  Button,
} from "@mui/material";
import React from "react";

const ProfileDialog = ({ open, close, data }) => {
  //   console.log(data);
  return (
    <Dialog open={open} onClose={close} fullWidth>
      <DialogTitle>Dialog Title</DialogTitle>
      <Divider />
      <DialogContent>
        <Box sx={{ display: "flex" }}>
          <Avatar sx={{ height: "100px", width: "100px" }} src="/user.png" />
          <Box sx={{ borderLeft: "1px solid rgba(0,0,0,0.3)", ml: 1, pl: 1 }}>
            <Stack>
              <Typography fontWeight="bold" variant="h6">
                Name:
                <Typography sx={{ display: "inline", ml: 0.5 }} variant="h6">
                  {data?.firstname + " " + data?.lastname}
                </Typography>
              </Typography>
              <Typography fontWeight="bold" variant="h6">
                Email:
                <Typography sx={{ display: "inline", ml: 0.5 }} variant="h6">
                  {data?.email}
                </Typography>
              </Typography>
              <Typography fontWeight="bold" variant="h6">
                Phone:
                <Typography sx={{ display: "inline", ml: 0.5 }} variant="h6">
                  {data.tell}
                </Typography>
              </Typography>
              <Typography fontWeight="bold" variant="h6">
                Role:
                <Typography sx={{ display: "inline", ml: 0.5 }} variant="h6">
                  {data?.roles[0].name}
                </Typography>
              </Typography>
            </Stack>
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={close}>
          Done
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ProfileDialog;
