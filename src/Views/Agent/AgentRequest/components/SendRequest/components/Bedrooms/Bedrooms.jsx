import { Box, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { styles } from "../../styles";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import RentalPeriod from "../RentalPeriod";
const { title, chip_box } = styles;
const Bedrooms = ({ onChangeBed, onChangeRent }) => {
  const [selected, setSelected] = useState(false);
  const [rooms, setRooms] = React.useState("");
  const handleChange = (event) => {
    setRooms(event.target.value);
    onChangeBed({ bedrooms: event.target.value });
  };
  // const handleSelected = (val) => {
  //   setSelected(val);
  //   onChangeBed({ bedrooms: val });
  // };
  // const bedRooms = [
  //   { title: "Studio", value: "studio" },
  //   { title: "1", value: 1 },
  //   { title: "2", value: 2 },
  //   { title: "3", value: 3 },
  //   { title: "4", value: 4 },
  //   { title: "5", value: 5 },
  //   { title: "6", value: 6 },
  //   { title: "7", value: 7 },
  //   { title: "8", value: 8 },
  //   { title: "9", value: 9 },
  //   { title: "10", value: 10 },
  //   { title: "11", value: 11 },
  //   { title: "12", value: 12 },
  //   { title: "13", value: 13 },
  //   { title: "14", value: 14 },
  //   { title: "15", value: 15 },
  //   { title: "16", value: 16 },
  //   { title: "17", value: 17 },
  // ];
  const handlecondoSize = (e) => {
    onChangeBed({ condo_size: e.target.value });
  };
  const handlecondoAddress = (e) => {
    onChangeBed({ condo_location: e.target.value });
  };
  const monthlyCost = (e) => {
    onChangeBed({ monthly_cos: e.target.value });
  };
  return (
    <Box>
      <Typography sx={title}>Additional Details</Typography>
      {/* <Grid container spacing={3} sx={{ mt: 4 }}>
        {bedRooms.map((val, ind) => {
          return (
            <Grid
              item
              xs={4}
              md={1.15}
              lg={1.15}
              sx={{ mr: ind === 0 ? 2 : null }}
            >
              <Box
                sx={{
                  ...chip_box,
                  border:
                    selected === val.value
                      ? "1px solid #0A6EB7"
                      : "1px solid #EAEAEA",
                }}
                onClick={() => handleSelected(val.value)}
              >
                <Typography sx={{ color: "#7E7E7E", fontWeight: "bold" }}>
                  {val.title}
                </Typography>
              </Box>
            </Grid>
          );
        })} 
      </Grid> */}
      <Grid container sx={{ mt: 2 }} spacing={2}>
        {/* <Grid item xs={12} lg={12}>
          <TextField
            fullWidth
            label="Condo Address"
            placeholder="Write Address"
            onChange={handlecondoAddress}
          />
        </Grid> */}
        <Grid item xs={12} md={6} lg={6}>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Bedrooms</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={rooms}
              label="Bedrooms"
              onChange={handleChange}
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 16, 17].map(
                (val, ind) => {
                  return (
                    <MenuItem value={val} key={ind}>
                      {val}
                    </MenuItem>
                  );
                }
              )}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <TextField
              label="Condo Size"
              placeholder="Write Condo Size"
              fullWidth
              onChange={handlecondoSize}
            />
            <Box
              sx={{
                background: "#e2e2e2",
                height: "3.5em",
                width: "80px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography fontWeight="bold">m sq</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            label="Monthly Cost in ฿"
            placeholder="0 - 100฿"
            fullWidth
            onChange={monthlyCost}
          />
        </Grid>
      </Grid>
      <RentalPeriod onChangeRent={onChangeRent} />
    </Box>
  );
};

export default Bedrooms;
