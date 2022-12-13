import { useEffect, useState } from "react";
import * as React from "react";
import { Grid, Paper } from "@mui/material";
import EthereumPrice from "../components/EthereumPrice";
import BlockData from "../components/BlockData";
import BlockInformation from "../components/BlockInformation";
import Transactions from "../components/Transactions";
import { getLatestBlockNumber } from "../components/AlchemySDK/commons";
import Blocks from "../components/Blocks";

export default function App() {
  const [blockNumber, setBlockNumber] = useState();

  useEffect(() => {
    if (!blockNumber) getLatestBlockNumber().then((res) => setBlockNumber(res));
  });

  return (
    <>
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
    </>
  );
}
