import React from "react";
import { styles } from "../../styles";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  Box,
  Checkbox,
  useTheme,
} from "@mui/material";
import FiberManualRecordOutlinedIcon from "@mui/icons-material/FiberManualRecordOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const { title, location_box } = styles;

const Location = ({ onChange }) => {
  const [selectedLocations, setSelectedLocations] = React.useState([]);
  const theme = useTheme();
  const handleChange = (event) => {
    setSelectedLocations(event.target.value);
    onChange({
      location_bts_mrt: JSON.stringify(Object.assign({}, event.target.value)),
    });
  };
  const data = [
    "Kjam, Lumphini area",
    "Lower Sukhumvit (Nana-Asok) O",
    "Middle Sukhumvit (Phrom Phong-Ekkamai)",
    "Upper Sukhumvit (Phra Khanong-Udom Suk)",
    "Silom Sathon",
    "Bang Na & surrounds",
    "Victory Monument, Ari area",
    "Chao Phraya River",
    "Bang Lampu (Royal Palace / Khao San Road)",
    "Thonburi and surrounds",
    "Nonthaburi (Don Mueng)",
    "BTS Ari",
    "BTS Asoke",
    "BTS Bang Bua",
    "BTS Bang Chak",
    "BTS Bang Na",
    "BTS Bang Wa",
    "BTS Bearing",
    "BTS Chit Lom",
    "BTS Chong Nonsi",
    "BTS Ekkamai",
    "BTS Klong San",
    "BTS Krung Thon Buri",
    "BTS Mochit",
    "BTS Nana",
    "BTS National Stadium",
    "BTS On Nut",
    "BTS Phaya Thai",
    "BTS Phloen Chit",
    "BTS Pho Nimit",
    "BTS Phra Khanong",
    "BTS Phrom Phong",
    "BTS Punnawithi",
    "BTS Ratchadamri",
    "BTS Sai Yud",
    "BTS Saint Luis",
    "BTS Sala Daeng",
    "BTS Sanam Pao",
    "BTS Saphan Taksin",
    "BTS Siam",
    "BTS Surasak",
    "BTS Talat Phlu",
    "BTS Thong Lor",
    "BTS Udom Suk",
    "BTS Victory Monument",
    "BTS Wongwian Yai",
    "BTS Wutthakat",
    "Ha Yaek Lat Phrao",
    "BTS Saphan Khwai",
    "MRT Bang Khae",
    "MRT Bang Sue",
    "MRT Chatuchak Park",
    "MRT Hua Lamphong",
    "MRT Huay Kwang",
    "MRT Kamphaeng Phet",
    "MRT Khlong Toei",
    "MRT Lat Phrao",
    "MRT Lumpini",
    "MRT Phahon Yothin",
    "MRT Phetchaburi",
    "MRT Phra Ram",
    "MRT Queen Sirikit National Convention Centre.",
    "MRT Ratchadaphisek",
    "MRT Sam Yan",
    "MRT Si lam",
    "MRT Si Lom",
    "MRT Sukhumvit",
    "MRT Sutthisan",
    "MRT Taopoon",
  ];
  return (
    <>
      <Typography sx={title}>
        Please only respond to requests that match all (or most) of the
        prospect’s specifications.
      </Typography>
      <Grid container spacing={2} sx={{ mt: 2 }}>
        <Grid item xs={12} md={6} lg={6}>
          <TextField
            label="Condo Name"
            placeholder="Please write your condo name"
            fullWidth
            onChange={(e) => onChange({ condo_name: e.target.value })}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <FormControl fullWidth>
            <InputLabel id="condo-location-bts-label">
              Condo Locations (BTS / MRT stations)
            </InputLabel>
            <Select
              labelId="condo-location-bts-label"
              id="condo-location-bts"
              multiple
              label="Condo Locations (BTS / MRT stations)"
              value={selectedLocations}
              onChange={handleChange}
              renderValue={(selected) => selected.join(", ")}
            >
              {/* <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  ml: 2,
                }}
              >
                Areas
              </Typography> */}
              {/* 
              {data
                .filter(
                  (location) =>
                    !location.startsWith("BTS") && !location.startsWith("MRT")
                )
                .map((location) => (
                  <MenuItem
                    key={location}
                    value={location}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontSize: "14px" }}>
                      {location}
                    </Typography>
                    <Box>
                      <Checkbox
                        checked={selectedLocations.indexOf(location) > -1}
                        icon={
                          <FiberManualRecordOutlinedIcon
                            sx={{ fontSize: "25px", color: "black" }}
                          />
                        }
                        checkedIcon={
                          <CheckCircleIcon
                            sx={{
                              fontSize: "25px",
                              color: theme.palette.primary.main,
                            }}
                          />
                        }
                      />
                    </Box>
                  </MenuItem>
                ))} */}

              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  ml: 2,
                }}
              >
                BTS Stations
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: "12px",
                  ml: 2,
                }}
              >
                (Multiple Choice)
              </Typography>
              {data
                .filter((location) => location.startsWith("BTS"))
                .map((location) => (
                  <MenuItem
                    key={location}
                    value={location}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontSize: "14px" }}>
                      {location}
                    </Typography>
                    <Box>
                      <Checkbox
                        checked={selectedLocations.indexOf(location) > -1}
                        icon={
                          <FiberManualRecordOutlinedIcon
                            sx={{ fontSize: "25px", color: "black" }}
                          />
                        }
                        checkedIcon={
                          <CheckCircleIcon
                            sx={{
                              fontSize: "25px",
                              color: theme.palette.primary.main,
                            }}
                          />
                        }
                      />
                    </Box>
                  </MenuItem>
                ))}
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: "bold",
                  ml: 2,
                }}
              >
                MRT Stations
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  fontSize: "12px",
                  ml: 2,
                }}
              >
                (Multiple Choice)
              </Typography>
              {data
                .filter((location) => location.startsWith("MRT"))
                .map((location) => (
                  <MenuItem
                    key={location}
                    value={location}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Typography sx={{ fontSize: "14px" }}>
                      {location}
                    </Typography>
                    <Box>
                      <Checkbox
                        checked={selectedLocations.indexOf(location) > -1}
                        icon={
                          <FiberManualRecordOutlinedIcon
                            sx={{ fontSize: "25px", color: "black" }}
                          />
                        }
                        checkedIcon={
                          <CheckCircleIcon
                            sx={{
                              fontSize: "25px",
                              color: theme.palette.primary.main,
                            }}
                          />
                        }
                      />
                    </Box>
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        {/* <Grid item xs={12} lg={12}>
          <TextField
            label="Location"
            placeholder="Search Location"
            fullWidth
            sx={{ my: 3 }}
            onChange={(e) => onChange({ condo_location: e.target.value })}
          />
        </Grid> */}
        <Grid item xs={12} lg={12}>
          <TextField
            fullWidth
            label="Condo Address"
            placeholder="Write Address"
            onChange={(e) => onChange({ condo_location: e.target.value })}
            sx={{ mb: 2 }}
          />
        </Grid>
      </Grid>
      <Box sx={location_box}></Box>
    </>
  );
};

export default Location;
