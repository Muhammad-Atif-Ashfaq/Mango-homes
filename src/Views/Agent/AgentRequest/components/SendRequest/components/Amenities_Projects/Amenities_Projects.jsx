import React, { useState } from "react";
import {
  Box,
  Chip,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { styles } from "../../styles";
import { CheckCircle } from "@mui/icons-material";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";

const { title, radio_text } = styles;

const Amenities_Projects = ({ onChangeAmenities }) => {
  const [selectedChips, setSelectedChips] = useState([]);
  const [swimmingPoolValue, setSwimmingPoolValue] = useState("");

  const data = [
    { title: "Gym", value: "Gym" },
    { title: "Children's Play area", value: "Children's Play area" },
    { title: "Elevator", value: "Elevator" },
    { title: "Parking Area", value: "Parking Area" },
    { title: "CCTV", value: "CCTV" },
    { title: "24-hour security", value: "24-hour security" },
  ];

  const handleChipClick = (chipTitle) => {
    if (selectedChips.includes(chipTitle)) {
      setSelectedChips(selectedChips.filter((title) => title !== chipTitle));
    } else {
      setSelectedChips([...selectedChips, chipTitle]);
    }
  };

  const handleSwimmingPoolChange = (event) => {
    setSwimmingPoolValue(event.target.value);
    onChangeAmenities({ swimming_pool: event.target.value });
  };

  React.useEffect(() => {
    onChangeAmenities({
      project_amenities: JSON.stringify(Object.assign({}, selectedChips)),
      swimming_pool: swimmingPoolValue,
    });
  }, [selectedChips, swimmingPoolValue]);

  return (
    <Box sx={{ mt: 5 }}>
      <img alt="property" src="/property.png" />
      <Typography sx={title}>Project Amenities</Typography>
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "16px", mt: 4 }}>
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
      <Box sx={{ mt: 6 }}>
        <Typography>Swimming Pool</Typography>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={swimmingPoolValue}
            onChange={handleSwimmingPoolChange}
          >
            <FormControlLabel
              sx={{ mr: 5 }}
              value="In the Sun"
              control={<Radio />}
              label={<Typography sx={radio_text}>In the Sun</Typography>}
            />
            <FormControlLabel
              sx={{ mr: 5 }}
              value="In the shade"
              control={<Radio />}
              label={<Typography sx={radio_text}>In the shade</Typography>}
            />
            <FormControlLabel
              sx={{ mr: 5 }}
              value="In sun and shade"
              control={<Radio />}
              label={<Typography sx={radio_text}>In sun and shade</Typography>}
            />
          </RadioGroup>
        </FormControl>
      </Box>
    </Box>
  );
};

export default Amenities_Projects;
