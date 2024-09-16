import { Box, Card, Divider, Tooltip, Typography } from "@mui/material";
import React from "react";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ChatIcon from "@mui/icons-material/Chat";
import BedIcon from "@mui/icons-material/Bed";
import BathtubIcon from "@mui/icons-material/Bathtub";
const TestComp = () => {
  return (
    <Card sx={{ borderRadius: "10px" }}>
      <Box sx={{ display: "flex" }}>
        <Box
          sx={{
            position: "relative",
            overflow: "hidden",
            height: "40vh",
          }}
        >
          <Typography
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              px: 1,
              py: 0.5,
              backgroundColor: "rgba(255, 255, 255, 0.8)",
            }}
          >
            New Project
          </Typography>
          <Box flex={1}>
            <img src="/bed.jpg" style={{ height: "100%", borderRadius: "0" }} />
          </Box>
          <Box
            sx={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 1,
            }}
          >
            <ArrowBackIosIcon />
          </Box>
          <Box
            sx={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 1,
            }}
          >
            <ArrowForwardIosIcon />
          </Box>
        </Box>
        <Box sx={{ px: 2, py: 2, mt: 3 }} flex={2}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h4" fontWeight="bold" color="#5e5e5e">
              Supalai Icon Sathorn, Bangkok
            </Typography>
            <Tooltip title="Chat">
              <Box
                sx={{
                  border: "1px solid rgba(0,0,0,0.5)",
                  p: 1,
                  borderRadius: "5px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
              >
                <ChatIcon sx={{ color: "#5e5e5e", fontSize: "20px" }} />
              </Box>
            </Tooltip>
          </Box>
          <Typography variant="h6" color="#5e5e5e">
            South SathronRoad, Thung Maha Mek, Sathon, Bangkok, South
            SathronRoad
          </Typography>
          <Typography fontWeight="bold" variant="h6" color="#5e5e5e">
            ฿10,450,000 - ฿18,150,000
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography fontWeight="bold" color="#5e5e5e">
                3
              </Typography>
              <BedIcon sx={{ color: "#5e5e5e", ml: 0.5 }} />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
              <Typography fontWeight="bold" color="#5e5e5e">
                3
              </Typography>
              <BedIcon sx={{ color: "#5e5e5e", ml: 0.5 }} />
            </Box>

            <Typography fontWeight="bold" color="#5e5e5e" sx={{ ml: 2 }}>
              42 sqm - 61sqm
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ borderColor: "rgba(0,0,0,0.3)" }} />
      <Box sx={{ height: "10vh" }}>This is another component</Box>
    </Card>
  );
};

export default TestComp;
