import { Skeleton, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getBlockWithTransactions } from "./AlchemySDK/commons";
import { formatAgeInSeconds, formatTimestamp } from "./commons";

export default function BlockData({ blockNumber }) {
  let [blockWithTransactions, setBlockWithTransactions] = useState();

  useEffect(() => {
    if (blockNumber && !blockWithTransactions)
      getBlockWithTransactions(blockNumber).then((res) =>
        setBlockWithTransactions(res)
      );
  });

  return blockNumber && blockWithTransactions ? (
    <div>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Block Number
      </Typography>
      <Typography component="p" variant="h6">
        {blockWithTransactions.number}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Mined {formatAgeInSeconds(blockWithTransactions.timestamp)} ago
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        @ {formatTimestamp(blockWithTransactions.timestamp)}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Transactions in block:
        {blockWithTransactions?.transactions?.length}
      </Typography>
    </div>
  ) : (
    <Skeleton variant="rectangular" width={210} height={118} />
  );
}
