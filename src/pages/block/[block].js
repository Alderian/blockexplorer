import * as React from "react";
import {
  Grid,
  Paper,
  Typography,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@mui/material";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useState } from "react";
import Hash from "../../components/ui/Hash";
import { getBlock } from "../../components/AlchemySDK/commons";
import { Utils } from "alchemy-sdk";
import { formatAgeInSeconds, formatTimestamp } from "../../components/commons";

export default function Block() {
  const router = useRouter();
  const { block } = router.query;
  const [blockDetail, setBlockDetail] = useState();

  useEffect(() => {
    if (block) {
      getBlock(block).then((res) => {
        setBlockDetail(res);
      });
    }
  }, [block]);

  return (
    <Grid item xs={12}>
      <Paper
        sx={{
          px: 4,
          pt: 4,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography component="h2" variant="h6" color="primary" gutterBottom>
          Block detail
        </Typography>

        {blockDetail ? (
          <Table>
            <TableBody>
              <TableRow>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  Block High:
                </TableCell>
                <TableCell>{blockDetail.number}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  Timestamp:
                </TableCell>
                <TableCell>
                  Mined {formatAgeInSeconds(blockDetail.timestamp)} ago (@{" "}
                  {formatTimestamp(blockDetail.timestamp)}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ whiteSpace: "nowrap" }}>Status:</TableCell>
                <TableCell>
                  {blockDetail.timestamp ? "Finalized" : "Pending"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  Transactions:
                </TableCell>
                <TableCell>
                  {blockDetail.transactions.length} transactions in this block
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  Fee Recipient:
                </TableCell>
                <TableCell>
                  <Hash path="address" hash={blockDetail.miner} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  Gas Used:
                </TableCell>
                <TableCell>
                  {Utils.formatEther(blockDetail.gasUsed)} ETH (
                  {Utils.formatUnits(blockDetail.gasUsed, "gwei")} Gwei)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  Gas Limit:
                </TableCell>
                <TableCell>
                  {Utils.formatEther(blockDetail.gasLimit)} ETH (
                  {Utils.formatUnits(blockDetail.gasLimit, "gwei")} Gwei)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  Base Fee Per Gas:
                </TableCell>
                <TableCell>
                  {Utils.formatEther(blockDetail.baseFeePerGas)} ETH (
                  {Utils.formatUnits(blockDetail.baseFeePerGas, "gwei")} Gwei)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  Burnt Fees::
                </TableCell>
                <TableCell>
                  🔥
                  {Utils.formatEther(
                    blockDetail.baseFeePerGas.mul(blockDetail.gasUsed)
                  )}{" "}
                  ETH (
                  {Utils.formatUnits(
                    blockDetail.baseFeePerGas.mul(blockDetail.gasUsed),
                    "gwei"
                  )}{" "}
                  Gwei)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ whiteSpace: "nowrap" }}>Hash:</TableCell>
                <TableCell>
                  <Hash
                    isCompressed={false}
                    hasLink={false}
                    hash={blockDetail.hash}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  Parent Block:
                </TableCell>
                <TableCell>
                  <Hash
                    path={"block"}
                    hash={blockDetail.parentHash}
                    isCompressed={false}
                  />
                </TableCell>
              </TableRow>
              {/* Use collapsible row to show even more information https://mui.com/material-ui/react-table/#collapsible-table
              <TableRow>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  Block JSON
                </TableCell>
                <TableCell>{JSON.stringify(blockDetail)}</TableCell>
              </TableRow> */}
            </TableBody>
          </Table>
        ) : (
          <Skeleton variant="rectangular" width="100%" height={220} />
        )}
      </Paper>
    </Grid>
  );
}
