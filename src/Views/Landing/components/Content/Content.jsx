import { Box, Button, Typography, styled, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import HeadingText from "../../../../components/Text/HeadingText";
const StyledRoot = styled(Box)({
  minHeight: "90vh",
  overflow: "hidden",
});

const StyledContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(0),
  display: "flex",
  justifyContent: "center",
  backgroundImage: `url(/bg.jpg)`,
  backgroundSize: "cover",
  backgroundPosition: "center",
  // backgroundSize: "100%",
  backgroundRepeat: "no-repeat",
  height: "100vh",
  overflow: "hidden",
  overflowY: "hidden",
  [theme.breakpoints.down("md")]: {
    backgroundImage: `url(bg2.jpeg)`,
    height: "100vh",
  },
}));

const StyledBtn = styled(Button)({
  height: "60px",
  width: "220px",
  borderRadius: "20px",
  color: "#3f27b9",
  background: "white",
  "&:hover": {
    background: "#e2e2e2",
  },
});

const Content = () => {
  const theme = useTheme();
  return (
    <StyledRoot>
      <StyledContent>
        <Box
          sx={{
            mt: 5,
            [theme.breakpoints.down("md")]: {
              mt: 15,
            },
          }}
        >
          <HeadingText
            variant="h2"
            color="#000"
            mt={5}
            sx={{
              fontWeight: "bold",
            }}
            textAlign="center"
          >
            Find your Bangkok condo
          </HeadingText>
          <Box sx={{ display: "flex", justifyContent: "center", mt: 5 }}>
            <StyledBtn
              variant="contained"
              component={Link}
              to="/register"
              disableRipple
              sx={{
                color: "#000",
                fontWeight: "bold",
              }}
            >
              Get Started Now
            </StyledBtn>
          </Box>
        </Box>
      </StyledContent>
    </StyledRoot>
  );
};

export default Content;
