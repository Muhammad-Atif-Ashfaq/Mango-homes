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
const { heading, valueStyle, text, text2, sara, loc_text } = styles;

const StyledBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));
const StyledTypo = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    fontSize: "15px",
  },
}));
const StyledTypoTxt = styled(Typography)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    fontSize: "10px",
  },
}));
const Small_Screen = ({ Card_Data, formattedDate }) => {
  const theme = useTheme();
  return (
    <Box sx={{ mt: -10 }}>
      <Box>
        <Box
          sx={{
            flex: "30%",
            padding: "0 15px",
            display: "flex",
            alignItems: "start",
            // justifyContent: "center",
            flexDirection: "column",
            [theme.breakpoints.down("md")]: {
              flex: "50%",
            },
            [theme.breakpoints.down("sm")]: {
              flex: "70%",
              mt: 4,
              padding: "0px",
            },
          }}
        >
          <StyledTypo
            sx={{
              ...sara,
              mb: 3,
              [theme.breakpoints.down("md")]: {
                mb: 1,
                fontSize: "25px",
              },
            }}
          >
            {Card_Data.condo_name}
          </StyledTypo>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 3,
              [theme.breakpoints.down("md")]: {
                mb: 1,
              },
            }}
          >
            <LocationOnIcon
              sx={{
                color: "#0A6EB7",
                [theme.breakpoints.down("md")]: { fontSize: "20px" },
              }}
            />
            <StyledTypoTxt
              sx={{
                ...loc_text,
                color: "#212529",
                [theme.breakpoints.down("md")]: {
                  fontSize: "15px",
                },
              }}
            >
              {Card_Data.condo_location}
            </StyledTypoTxt>
          </Box>
          {Object.values(Card_Data.location_bts_mrt).some((val) =>
            val.startsWith("BTS")
          ) && (
            <StyledTypo
              sx={{
                ...sara,
                mb: 3,
                [theme.breakpoints.down("md")]: {
                  mb: 1,
                  fontSize: "17px",
                },
              }}
            >
              BTS Station:
              <StyledTypoTxt
                sx={{
                  ...loc_text,
                  display: "inline",
                  ml: 1,
                  [theme.breakpoints.down("md")]: {
                    fontSize: "15px",
                  },
                }}
              >
                {Object.values(Card_Data.location_bts_mrt)
                  .filter((val) => val.startsWith("BTS"))
                  .join(", ") || "- - - -"}
                ,
              </StyledTypoTxt>
            </StyledTypo>
          )}
          {Object.values(Card_Data.location_bts_mrt).some((val) =>
            val.startsWith("MRT")
          ) && (
            <StyledTypo
              sx={{
                ...sara,
                mb: 3,
                [theme.breakpoints.down("md")]: {
                  mb: 1,
                  fontSize: "17px",
                },
              }}
            >
              MRT Station:
              <StyledTypoTxt
                sx={{
                  ...loc_text,
                  display: "inline",
                  ml: 1,
                  [theme.breakpoints.down("md")]: {
                    fontSize: "15px",
                  },
                }}
              >
                {Object.values(Card_Data.location_bts_mrt)
                  .filter((val) => val.startsWith("MRT"))
                  .join(", ") || "- - - -"}
                ,
              </StyledTypoTxt>
            </StyledTypo>
          )}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 3,
              [theme.breakpoints.down("md")]: {
                mb: 1,
              },
            }}
          >
            <BedIcon
              sx={{
                color: "#0A6EB7",
                [theme.breakpoints.down("md")]: {
                  fontSize: "20px",
                },
              }}
            />
            <StyledTypoTxt
              sx={{
                ...loc_text,
                ml: 1,
                [theme.breakpoints.down("md")]: {
                  fontSize: "15px",
                },
              }}
            >
              {Card_Data.bedrooms}
            </StyledTypoTxt>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 3,
              [theme.breakpoints.down("md")]: {
                mb: 1,
              },
            }}
          >
            <Crop54Icon
              sx={{
                color: "#0A6EB7",
                [theme.breakpoints.down("md")]: {
                  fontSize: "20px",
                },
              }}
            />
            <StyledTypoTxt
              sx={{
                ...loc_text,
                ml: 1,
                [theme.breakpoints.down("md")]: {
                  fontSize: "15px",
                },
              }}
            >
              {Card_Data.condo_size} <strong>m sq</strong>
            </StyledTypoTxt>
          </Box>
          <StyledTypo
            sx={{
              ...sara,
              mb: 3,
              [theme.breakpoints.down("md")]: {
                mb: 1,
                fontSize: "17px",
              },
            }}
            textAlign="center"
          >
            B{Card_Data.monthly_cos}/month
          </StyledTypo>
          <StyledTypo
            sx={{
              ...sara,
              mb: 3,
              [theme.breakpoints.down("md")]: {
                mb: 1,
                fontSize: "17px",
              },
            }}
          >
            Move in date:
            <StyledTypoTxt
              sx={{
                ...loc_text,
                display: "inline",
                ml: 1,
                [theme.breakpoints.down("md")]: {
                  fontSize: "15px",
                },
              }}
            >
              {formattedDate}
            </StyledTypoTxt>
          </StyledTypo>
          <StyledTypo
            sx={{
              ...sara,
              [theme.breakpoints.down("md")]: {
                fontSize: "15px",
              },
            }}
          >
            Rental Period:
            <StyledTypoTxt
              sx={{
                ...loc_text,
                display: "inline",
                ml: 1,
                [theme.breakpoints.down("md")]: {
                  fontSize: "15px",
                },
              }}
            >
              {Card_Data.rental_period}
            </StyledTypoTxt>
          </StyledTypo>
          <Box>
            {/* <Button onClick={() => handleChatBox(Card_Data)}>
                        OpenChat
                      </Button> */}
            {/* {liked && (
                        <Button
                          variant="contained"
                          startIcon={<Chat />}
                          onClick={() => handleChatBox(Card_Data)}
                        >
                          Chat
                        </Button>
                      )} */}
            {/* {type === "prospect" && Card_Data.is_prospect_chat && (
                        <Badge
                          badgeContent={Card_Data.unreadChatCount}
                          sx={{
                            "& .MuiBadge-badge": {
                              color: "white",
                              backgroundColor: "green",
                              minWidth: "25px",
                              minHeight: "25px",
                              fontSize: "15px",
                            },
                          }}
                        >
                          <Button
                            variant="contained"
                            startIcon={<Chat />}
                            onClick={() => handleChatBox(Card_Data)}
                          >
                            Chat
                          </Button>
                        </Badge>
                      )}
                      {type === "agent" && Card_Data.is_paid_agent && (
                        <Button
                          variant="contained"
                          startIcon={<Chat />}
                          onClick={() => handleChatBox(Card_Data)}
                        >
                          Chat
                        </Button>
                      )} */}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Small_Screen;
