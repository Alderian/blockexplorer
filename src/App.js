import { useEffect, useState } from "react";
import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { Grid, Paper } from "@mui/material";
import HeaderToolBar from "./components/HeaderToolBar";
import Copyright from "./components/Copyright";
import EthereumPrice from "./components/EthereumPrice";
import BlockData from "./components/BlockData";
import BlockInformation from "./components/BlockInformation";
import Transactions from "./components/Transactions";
import { getLatestBlockNumber } from "./components/AlchemySDK/commons";
import Blocks from "./components/Blocks";

function App() {
  const [blockNumber, setBlockNumber] = useState();

  useEffect(() => {
    if (!blockNumber) getLatestBlockNumber().then((res) => setBlockNumber(res));
  });

  return (
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
          {/* Ethereum statistics */}
          <Grid item xs={12}>
            <Paper
              sx={{
                pl: 2,
                display: "flex",
                flexDirection: "row",
              }}
            >
              <EthereumPrice />
            </Paper>
          </Grid>

          {/* Block main statistics */}
          <Grid item xs={12} md={6} lg={4}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 220,
              }}
            >
              <BlockData blockNumber={blockNumber} />
            </Paper>
          </Grid>
          {/* Block information data */}
          <Grid item xs={12} md={6} lg={8}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 220,
              }}
            >
              <BlockInformation blockNumber={blockNumber} />
            </Paper>
          </Grid>
          {/* Recent Blocks */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Blocks blockNumber={blockNumber} />
            </Paper>
          </Grid>
          {/* Recent Transactions */}
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
              <Transactions blockNumber={blockNumber} />
            </Paper>
          </Grid>
        </Grid>
        <Copyright sx={{ pt: 4 }} />
      </Container>
    </Box>
  );
}

export default App;
