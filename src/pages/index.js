import { useEffect, useState } from "react";
import * as React from "react";
import { Grid, Paper } from "@mui/material";
import EthereumPrice from "../components/EthereumPrice";
import BlockData from "../components/BlockData";
import BlockInformation from "../components/BlockInformation";
import Transactions from "../components/Transactions";
import {
  getLatestBlockNumber,
  getBlockWithTransactions,
  getBlock,
} from "../components/AlchemySDK/commons";
import { plainBigNumber, formatAgeInSeconds } from "../components/commons";
import Blocks from "../components/Blocks";

export default function Index({ data }) {
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
          }}
        >
          <BlockData blockWithTransactions={data?.blockWithTransactions} />
        </Paper>
      </Grid>
      {/* Block information data */}
      <Grid item xs={12} md={6} lg={8}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <BlockInformation
            blockWithTransactions={data?.blockWithTransactions}
          />
        </Paper>
      </Grid>
      {/* Recent Blocks */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Blocks blocks={data?.blocks} />
        </Paper>
      </Grid>
      {/* Recent Transactions */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Transactions blockWithTransactions={data?.blockWithTransactions} />
        </Paper>
      </Grid>
    </>
  );
}

// This value is considered fresh for ten seconds (s-maxage=10).
// If a request is repeated within the next 10 seconds, the previously
// cached value will still be fresh. If the request is repeated before 59 seconds,
// the cached value will be stale but still render (stale-while-revalidate=59).
//
// In the background, a revalidation request will be made to populate the cache
// with a fresh value. If you refresh the page, you will see the new value.
export async function getServerSideProps({ req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=100, stale-while-revalidate=59"
  );

  async function getLatestBlocks(currentBlock, count = 10) {
    let latestBlocks = [];
    let lastBlock = currentBlock;

    for (let i = 0; i < count; i++) {
      const block = await getBlock(lastBlock - i);
      latestBlocks.push({
        hash: block.hash,
        number: block.number,
        timestamp: block.timestamp,
        timePassed: formatAgeInSeconds(block.timestamp),
        transactions: block.transactions.length,
      });
    }

    return latestBlocks;
  }

  const blockNumber = await getLatestBlockNumber();
  const blocks = await getLatestBlocks(blockNumber);
  const blockWithTransactions = await getBlockWithTransactions(blockNumber);

  // Make transactions smaller to list in main page
  const transactions = blockWithTransactions.transactions.map((t) => {
    return {
      hash: t.hash,
      type: t.type,
      // blockHash: t.blockHash,
      // transactionIndex: t.transactionIndex,
      // confirmations: t.confirmations,
      from: t.from,
      to: t.to,
      // nonce: t.nonce,
      // gasPrice: plainBigNumber(t.gasPrice),
      // maxPriorityFeePerGas: plainBigNumber(t.maxPriorityFeePerGas),
      // maxFeePerGas: plainBigNumber(t.maxFeePerGas),
      // gasLimit: plainBigNumber(t.gasLimit),
      value: plainBigNumber(t.value),
    };
  });

  const data = {
    blockNumber,
    blockWithTransactions: {
      hash: blockWithTransactions.hash,
      parentHash: blockWithTransactions.parentHash,
      number: blockWithTransactions.number,
      timestamp: blockWithTransactions.timestamp,
      timePassed: formatAgeInSeconds(blockWithTransactions.timestamp),
      miner: blockWithTransactions.miner,
      gasLimit: plainBigNumber(blockWithTransactions.gasLimit),
      gasUsed: plainBigNumber(blockWithTransactions.gasUsed),
      baseFeePerGas: plainBigNumber(blockWithTransactions.baseFeePerGas),
      // _difficulty: plainBigNumber(blockWithTransactions._difficulty),
      transactions: transactions,
    },
    blocks,
  };

  // Pass data to the page via props
  return { props: { data } };
}
