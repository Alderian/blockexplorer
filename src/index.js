import React from "react";
import * as ReactDOMClient from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { sendToVercelAnalytics } from "./vitals";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./pages/App";
import Transaction from "./pages/Transaction";
import HeaderToolBar from "./components/HeaderToolBar";
import Copyright from "./components/Copyright";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Grid } from "@mui/material";
import Block from "./pages/Block";
import Address from "./pages/Address";

const mdTheme = createTheme();

const root = ReactDOMClient.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ThemeProvider theme={mdTheme}>
      {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
      <CssBaseline />
      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === "light"
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: "100vh",
          overflow: "auto",
        }}
      >
        <HeaderToolBar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<App />} />
                <Route path="/tx/:transaction" element={<Transaction />} />
                <Route path="/block/:block" element={<Block />} />
                <Route path="/address/:address" element={<Address />} />
              </Routes>
            </BrowserRouter>
          </Grid>
          <Copyright sx={{ pt: 4 }} />
        </Container>
      </Box>
    </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(sendToVercelAnalytics);
