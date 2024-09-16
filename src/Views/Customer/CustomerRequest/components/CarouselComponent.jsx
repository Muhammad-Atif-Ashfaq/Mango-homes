import React from "react";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import { useTheme, Box, IconButton } from "@mui/material";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

const CarouselComponent = ({ Card_Data }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const theme = useTheme();
  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleBack = () => {
    handleStepChange(activeStep - 1);
  };

  const handleNext = () => {
    handleStepChange(activeStep + 1);
  };

  return (
    <Box position="relative">
      <AutoPlaySwipeableViews
        axis={theme.direction === "rtl" ? "x-reverse" : "x"}
        index={activeStep}
        onChangeIndex={handleStepChange}
        enableMouseEvents
      >
        {Card_Data.all_images.map((val, index) => (
          <div key={index}>
            {Math.abs(activeStep - index) <= 2 ? (
              <Box
                component="img"
                sx={{
                  display: "block",
                  overflow: "hidden",
                  // height: "100%",
                  maxWidth: "100%",
                  objectFit: "fill",
                  height: "500px",

                  [theme.breakpoints.down("sm")]: {
                    height: "250px",
                  },
                }}
                src={`${import.meta.env.VITE_STORAGE_URL}${val.url}`}
                alt="Images"
              />
            ) : null}
          </div>
        ))}
      </AutoPlaySwipeableViews>
      <IconButton
        sx={{
          position: "absolute",
          background: "#fff",
          "&:hover": {
            background: "#e2e2e2",
          },
          left: 0,
          top: "270px",
          transform: "translateY(-50%)",
          ml: 1,
          [theme.breakpoints.down("lg")]: {
            top: "120px",
          },
        }}
        onClick={handleBack}
        disabled={activeStep === 0}
      >
        <KeyboardArrowLeft />
      </IconButton>
      <IconButton
        sx={{
          "&:hover": {
            background: "#e2e2e2",
          },
          background: "#fff",
          position: "absolute",
          right: 0,
          top: "270px",
          transform: "translateY(-50%)",
          mr: 1,
          [theme.breakpoints.down("lg")]: {
            top: "120px",
          },
        }}
        onClick={handleNext}
        disabled={activeStep === Card_Data.all_images.length - 1}
      >
        <KeyboardArrowRight />
      </IconButton>
    </Box>
  );
};

export default CarouselComponent;
