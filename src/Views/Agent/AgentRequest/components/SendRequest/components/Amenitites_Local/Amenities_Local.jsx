import { Box, TextField, Typography, useTheme } from "@mui/material";
import React, { useEffect } from "react";
import { styles } from "../../styles";
const { title, t } = styles;
const Amenities_Local = ({ onChangeAmenities_L }) => {
  const theme = useTheme();
  const handleBTSChange = (e) => {
    onChangeAmenities_L({ bts_mst_stations_details: e.target.value });
  };

  const handleSupermarketsChange = (e) => {
    onChangeAmenities_L({ supermarkets_details: e.target.value });
  };

  const handleLocalEntertainmentChange = (e) => {
    onChangeAmenities_L({ local_entertainment_details: e.target.value });
  };

  return (
    <Box>
      <Typography sx={title}>Local Amenities</Typography>
      <Box sx={{ mt: 4 }}>
        <Typography sx={{ ...t, mb: 1 }}> BTS / MRTstations:</Typography>
        <TextField
          placeholder="Please give details about local BTS and MRT stations and how far they are walking distance from the condo"
          multiline
          rows={3}
          sx={{
            mb: 3,
            width: "70vw",
            [theme.breakpoints.down("md")]: {
              width: "60vw",
            },
          }}
          onChange={handleBTSChange}
        />
        <Typography sx={{ ...t, mb: 1 }}> Supermarkets:</Typography>
        <TextField
          placeholder="Please give details about supermarkets (Tops, Big C, Maxi Plus etc) and convenience stores (7 Eleven). Include how far they are walking distance from the condo"
          fullWidth
          multiline
          rows={3}
          sx={{
            mb: 3,
            width: "70vw",
            [theme.breakpoints.down("md")]: {
              width: "60vw",
            },
          }}
          onChange={handleSupermarketsChange}
        />
        <Typography sx={{ ...t, mb: 1 }}>
          {" "}
          Restaurants/cafes/bars/street food:
        </Typography>
        <TextField
          placeholder=" Please give details about local entertainment."
          fullWidth
          multiline
          rows={3}
          sx={{
            mb: 3,
            width: "70vw",
            [theme.breakpoints.down("md")]: {
              width: "60vw",
            },
          }}
          onChange={handleLocalEntertainmentChange}
        />
      </Box>
    </Box>
  );
};

export default Amenities_Local;
