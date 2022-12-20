import { Skeleton, Typography } from "@mui/material";
import { formatTimestamp } from "./commons";

export default function BlockData({ blockWithTransactions }) {
  return blockWithTransactions ? (
    <div>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Block Number
      </Typography>
      <Typography component="p" variant="h6">
        {blockWithTransactions.number}
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Mined {blockWithTransactions.timePassed} ago
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
