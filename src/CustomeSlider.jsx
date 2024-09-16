import React, { useState, useEffect } from "react";
import "./styles.css";
import { Box } from "@mui/material";

const CustomSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [intervalDuration, setIntervalDuration] = useState(200);
  const [sliderValue, setSliderValue] = useState(1000 - intervalDuration);
  const [backgroundStyle, setBackgroundStyle] = useState({});

  const images = Array.from(Array(330).keys()).map(
    (index) => `/frames/image${index + 1}.gif`
  );

  useEffect(() => {
    const incrementIndex = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const interval = setInterval(incrementIndex, intervalDuration);

    return () => clearInterval(interval);
  }, [images.length, intervalDuration]);

  const handleSliderChange = (event) => {
    const invertedValue = 1000 - Number(event.target.value);
    setIntervalDuration(invertedValue);
    setSliderValue(event.target.value);

    // Calculate percentage progress
    const progress = ((event.target.value - 700) / (1000 - 700)) * 100;
    setBackgroundStyle({
      background: `linear-gradient(to right, blue ${progress + 1}%, #fff ${
        progress - 4
      }%)`,
    });
  };

  return (
    <div>
      <div>
        <img src={images[currentIndex]} alt={`image-${currentIndex}`} />
      </div>
      <Box sx={{ px: 8 }}>
        <input
          type="range"
          min="700"
          max="1000"
          value={sliderValue}
          onChange={handleSliderChange}
          className="slider"
          style={backgroundStyle}
        />
      </Box>
    </div>
  );
};

export default CustomSlider;
