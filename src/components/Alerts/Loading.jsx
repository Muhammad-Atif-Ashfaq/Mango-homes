import { Dialog, DialogContent, DialogTitle, Typography } from "@mui/material";
import React from "react";
import { RingLoader } from "react-spinners";
import HeadingText from "../Text/HeadingText";

const Loading = ({ title, sub }) => {
  return (
    <Dialog
      open={true}
      fullWidth
      PaperProps={{
        style: {
          backgroundColor: "transparent",
          boxShadow: "none",
        },
      }}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent
        sx={{
          display: "flex",
          justifyContent: "center",
          overflow: "hidden",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <RingLoader color="#fff" loading={true} size={100} />{" "}
        <HeadingText sx={{ mt: 5, color: "#fff" }} variant="h4">
          {sub}
        </HeadingText>
      </DialogContent>
    </Dialog>
  );
};

export default Loading;
