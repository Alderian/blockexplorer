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
import Hash from "../../components/ui/Hash";
import { getTransactionReceipt } from "../../components/AlchemySDK/commons";
import { Utils } from "alchemy-sdk";
import { plainBigNumber, toBigNumber } from "../../components/commons";

export default function Transaction({ data }) {
  let transactionDetail = data ? data.transactionDetail : null;

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
          Transaction detail
        </Typography>

        {transactionDetail ? (
          <Table>
            <TableBody>
              <TableRow>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  Transaction Hash:
                </TableCell>
                <TableCell>
                  <Hash
                    isCompressed={false}
                    hasLink={false}
                    hash={transactionDetail.hash}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ whiteSpace: "nowrap" }}>Status:</TableCell>
                <TableCell>
                  {transactionDetail.status ? "Success" : "Pending"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ whiteSpace: "nowrap" }}>Block:</TableCell>
                <TableCell>
                  <Hash
                    path="block"
                    text={transactionDetail.blockNumber}
                    hash={transactionDetail.blockHash}
                  />{" "}
                  {transactionDetail.confirmations} confirmations
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ whiteSpace: "nowrap" }}>From:</TableCell>
                <TableCell>
                  <Hash
                    path="address"
                    hash={transactionDetail.from}
                    isCompressed={false}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ whiteSpace: "nowrap" }}>To:</TableCell>
                <TableCell>
                  <Hash
                    path="address"
                    hash={transactionDetail.to}
                    isCompressed={false}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ whiteSpace: "nowrap" }}>Value:</TableCell>
                <TableCell>
                  {parseFloat(
                    Utils.formatEther(transactionDetail.value)
                  ).toFixed(6)}{" "}
                  ETH
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  Transaction fee:
                </TableCell>
                <TableCell>
                  {Utils.formatEther(
                    toBigNumber(transactionDetail.maxFeePerGas).mul(
                      transactionDetail.gasUsed
                    )
                  )}{" "}
                  ETH ( gasPrice * gasUsed (in Gwei):{" "}
                  {Utils.formatUnits(
                    toBigNumber(transactionDetail.gasPrice).mul(
                      transactionDetail.gasUsed
                    ),
                    "gwei"
                  )}
                  )
                </TableCell>
              </TableRow>
              {/* TODO: <TableRow>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  Transaction action:
                </TableCell>
                <TableCell>GET THIS FROM LOGS</TableCell>
              </TableRow> */}
              <TableRow>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  Gas used:
                </TableCell>
                <TableCell>
                  {Utils.formatEther(transactionDetail.gasUsed)} ETH (
                  {Utils.formatUnits(transactionDetail.gasUsed, "gwei")} Gwei)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  Gas price:
                </TableCell>
                <TableCell>
                  {Utils.formatEther(transactionDetail.gasPrice)} ETH (
                  {Utils.formatUnits(transactionDetail.gasPrice, "gwei")} Gwei)
                </TableCell>
              </TableRow>
              {/* Use collapsible row to show even more information https://mui.com/material-ui/react-table/#collapsible-table
              <TableRow>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  Timestamp:
                </TableCell>
                <TableCell>GET THIS FROM BLOCK DATA</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  Transaction action:
                </TableCell>
                <TableCell>GET THIS FROM LOGS</TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  Transaction JSON
                </TableCell>
                <TableCell>{JSON.stringify(transactionDetail)}</TableCell>
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

// This value is considered fresh for ten seconds (s-maxage=10).
// If a request is repeated within the next 10 seconds, the previously
// cached value will still be fresh. If the request is repeated before 59 seconds,
// the cached value will be stale but still render (stale-while-revalidate=59).
//
// In the background, a revalidation request will be made to populate the cache
// with a fresh value. If you refresh the page, you will see the new value.
export async function getServerSideProps({ params, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=100, stale-while-revalidate=59"
  );

  const { transaction } = params;
  const t = await getTransactionReceipt(transaction);

  const data = {
    transactionDetail: {
      ...t,
      wait: null,
      gasPrice: plainBigNumber(t.gasPrice),
      maxPriorityFeePerGas: plainBigNumber(t.maxPriorityFeePerGas),
      maxFeePerGas: plainBigNumber(t.maxFeePerGas),
      gasLimit: plainBigNumber(t.gasLimit),
      value: plainBigNumber(t.value),
      gasUsed: plainBigNumber(t.gasUsed),
      cumulativeGasUsed: plainBigNumber(t.cumulativeGasUsed),
      effectiveGasPrice: plainBigNumber(t.effectiveGasPrice),
    },
  };

  // Pass data to the page via props
  return { props: { data } };
}
