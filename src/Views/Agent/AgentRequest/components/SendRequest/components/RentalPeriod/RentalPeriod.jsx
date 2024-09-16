import { Box, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { styles } from "../../styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

const { title, radio_text, c_a, c_a_t } = styles;

const RentalPeriod = ({ onChangeRent }) => {
  const [rentalPeriod, setRentalPeriod] = useState("");
  const [moveInPeriod, setMoveInPeriod] = useState("");
  const handleRentalPeriodChange = (event) => {
    setRentalPeriod(event.target.value);
    onChangeRent({ rental_period: event.target.value });
  };
  const handleMovePeriodChange = (event) => {
    setMoveInPeriod(event.target.value);
    onChangeRent({ move_in_date: event.target.value });
  };
  return (
    <Box sx={{ mt: 3 }}>
      <Typography sx={title}>Rental Period</Typography>
      <Box>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={rentalPeriod}
            onChange={handleRentalPeriodChange}
          >
            <FormControlLabel
              sx={{ mr: 5 }}
              value="6 months"
              control={<Radio />}
              label={<Typography sx={radio_text}>6 months</Typography>}
            />
            <FormControlLabel
              sx={{ mr: 5 }}
              value="6 months - 1 year"
              control={<Radio />}
              label={<Typography sx={radio_text}>6 months - 1 year</Typography>}
            />
            <FormControlLabel
              sx={{ mr: 5 }}
              value="1 year"
              control={<Radio />}
              label={<Typography sx={radio_text}>1 year</Typography>}
            />
          </RadioGroup>
        </FormControl>
        <Typography sx={{ ...title, mt: 3 }}>Move in date</Typography>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            value={moveInPeriod}
            onChange={handleMovePeriodChange}
          >
            <FormControlLabel
              sx={{ mr: 5 }}
              value="Immediately"
              control={<Radio />}
              label={<Typography sx={radio_text}>Immediately</Typography>}
            />
            <FormControlLabel
              sx={{ mr: 5 }}
              value="Within a week"
              control={<Radio />}
              label={<Typography sx={radio_text}>Within a week</Typography>}
            />
            <FormControlLabel
              sx={{ mr: 5 }}
              value="Within two weeks"
              control={<Radio />}
              label={<Typography sx={radio_text}>Within two weeks</Typography>}
            />
            <FormControlLabel
              sx={{ mr: 5 }}
              value="One month"
              control={<Radio />}
              label={<Typography sx={radio_text}>One month</Typography>}
            />
            <FormControlLabel
              sx={{ mr: 5 }}
              value="Two months"
              control={<Radio />}
              label={<Typography sx={radio_text}>Two months</Typography>}
            />
            <FormControlLabel
              sx={{ mr: 5 }}
              value="Three months or longer"
              control={<Radio />}
              label={
                <Typography sx={radio_text}>Three months or longer</Typography>
              }
            />
          </RadioGroup>
        </FormControl>
        <Typography sx={{ ...title, mt: 4 }}>
          Condo and project description:
        </Typography>
        <TextField
          fullWidth
          sx={{ mt: 2 }}
          multiline
          rows={4}
          placeholder="Enter Condo project description"
          onChange={(e) => onChangeRent({ condo_description: e.target.value })}
        />
        {/* <Box sx={c_a}>
          <Typography sx={c_a_t}>
            Lorem ipsum dolor sit amet consetetur Lorem ipsum dolor sit amet
            consetetur Lorem ipsum dolor sit amet consetetur Lorem ipsum dolor
            sit amet consetetur Lorem ipsum dolor sit amet consetetur Lorem
            ipsum dolor sit amet consetetur Lorem ipsum dolor sit amet
            consetetur Lorem ipsum dolor sit amet consetetur Lorem ipsum dolor
            sit amet consetetur
          </Typography>
        </Box> */}
      </Box>
    </Box>
  );
};

export default RentalPeriod;
