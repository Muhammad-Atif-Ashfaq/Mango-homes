import { Suspense, useState } from "react";
import Router from "./routes";
import { StyledEngineProvider, ThemeProvider } from "@mui/material";
import { theme } from "./Theme";
import ErrorBoundary from "./components/ErrorBoundary/ErrorBoundary";
import "./App.css";
import { SnackbarProvider } from "notistack";
function App() {
  return (
    <ThemeProvider theme={theme}>
      <StyledEngineProvider injectFirst>
        <SnackbarProvider
          autoHideDuration={3000}
          anchorOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <ErrorBoundary>
            <Suspense fallback={<>Please Wait</>}>
              <Router />
            </Suspense>
          </ErrorBoundary>
        </SnackbarProvider>
      </StyledEngineProvider>
    </ThemeProvider>
  );
}

export default App;
