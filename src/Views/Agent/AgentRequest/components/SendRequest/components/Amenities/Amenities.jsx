import { Box, Chip, Typography } from "@mui/material";
import React, { useState } from "react";
import { styles } from "../../styles";
import { CheckCircle } from "@mui/icons-material";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
const { title } = styles;

const Amenities = ({ onChangeAmenities }) => {
  const [selectedChips, setSelectedChips] = useState([]);

  const data = [
    { title: "Washing Machine", value: "Washing Machine" },
    { title: "Refrigerator", value: "Refrigerator" },
    { title: "Smoke detector", value: "Smoke detector" },
    { title: "Microwave", value: "Microwave" },
    { title: "Store", value: "Store" },
    { title: "Air Conditioning", value: "Air Conditioning" },
    { title: "Balcony", value: "Balcony" },
    { title: "TV", value: "TV" },
  ];

  const handleChipClick = (chipTitle) => {
    if (selectedChips.includes(chipTitle)) {
      setSelectedChips(selectedChips.filter((title) => title !== chipTitle));
    } else {
      setSelectedChips([...selectedChips, chipTitle]);
    }
  };
  React.useMemo(() => {
    onChangeAmenities({
      condo_amenities: JSON.stringify(Object.assign({}, selectedChips)),
    });
  }, [selectedChips]);

  return (
    <Box>
      <img alt="house" src="/house.png" />
      <Typography sx={title}>Condo Amenities</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "8px", mt: 4 }}>
        {data.map((item) => (
          <Chip
            key={item.title}
            label={item.title}
            clickable
            onClick={() => handleChipClick(item.title)}
            color={selectedChips.includes(item.title) ? "primary" : "default"}
            icon={
              selectedChips.includes(item.title) ? (
                <CheckCircle />
              ) : (
                <PanoramaFishEyeIcon />
              )
            }
            sx={{
              height: "50px",
              "& .MuiChip-icon": {
                color: "#fff",
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default Amenities;
