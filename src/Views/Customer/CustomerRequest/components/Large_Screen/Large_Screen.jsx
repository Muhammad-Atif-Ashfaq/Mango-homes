import { useTheme } from "@emotion/react";
import { Box, Typography, styled } from "@mui/material";
import React from "react";
import { styles } from "../styles";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import Crop54Icon from "@mui/icons-material/Crop54";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import DateRangeIcon from "@mui/icons-material/DateRange";
import BedIcon from "@mui/icons-material/Bed";
import BodyText from "../../../../../components/Text/BodyText";

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  // alignItems: "center",
  width: "100%",
  marginBottom: "15px",
}));

const Large_Screen = ({ Card_Data, formattedDate }) => {
  const theme = useTheme();
  // console.log(Card_Data);
  const data = [
    { title: "Name", val: `${Card_Data.condo_name}` },
    { title: "Address", val: `${Card_Data.condo_location}` },
    {
      title: "BTS Stations",
      val: `${
        Object.values(Card_Data.location_bts_mrt)
          .filter((val) => val.startsWith("BTS"))
          .join(", ") || ""
      }`,
    },
    {
      title: "MRT Stations",
      val: `${
        Object.values(Card_Data.location_bts_mrt)
          .filter((val) => val.startsWith("MRT"))
          .join(", ") || ""
      }`,
    },
    { title: "Bedrooms", val: `${Card_Data.bedrooms}` },
    { title: "Area", val: `${Card_Data.condo_size + " "}m sq` },
    { title: "Monthly Budget", val: `${Card_Data.monthly_cos}/month` },
    { title: "Move in date", val: `${Card_Data.move_in_date}` },
    { title: "Rental Period", val: `${Card_Data.rental_period}` },
  ];

  return (
    <Box>
      <Box sx={{ width: "45vw", mt: 3 }}>
        {data.map((val, ind) => {
          // console.log(val.val == "");
          if (val.val !== "") {
            return (
              <StyledBox key={ind}>
                <BodyText fontWeight="bold">{val.title}</BodyText>
                <BodyText
                  width="300px"
                  textAlign="right"
                  sx={{ fontSize: "13pt" }}
                >
                  {val.val}
                </BodyText>
              </StyledBox>
            );
          }
          return null;
        })}
      </Box>
    </Box>
  );
};

export default Large_Screen;
