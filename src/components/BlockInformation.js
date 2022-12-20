import { Container, Grid, Skeleton, Typography } from "@mui/material";
import Hash from "./ui/Hash";

export default function BlockInformation({ blockWithTransactions }) {
  return blockWithTransactions ? (
    <Container>
      <Typography component="h2" variant="h6" color="primary" gutterBottom>
        Block Information
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ul>
            <li>Gas limit: {blockWithTransactions.gasLimit.toString()}</li>
            <li>Gas used: {blockWithTransactions.gasUsed.toString()}</li>
            <li>Base Fee: {blockWithTransactions.baseFeePerGas.toString()} </li>
          </ul>
        </Grid>
        <Grid item xs={12} md={6}>
          <ul>
            <li>
              Block Hash:{" "}
              <Hash path="block" hash={blockWithTransactions.hash} />
            </li>
            <li>
              Parent hash:{" "}
              <Hash path="block" hash={blockWithTransactions.parentHash} />
            </li>
            <li>
              Block miner:{" "}
              <Hash path="address" hash={blockWithTransactions.miner} />
            </li>
          </ul>
        </Grid>
      </Grid>
    </Container>
  ) : (
    <Skeleton variant="rectangular" width={210} height={118} />
  );
}
