import * as React from "react";
import {
  Grid,
  Paper,
  Typography,
  Skeleton,
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
} from "@mui/material";
import Hash from "../../components/ui/Hash";
import {
  getAddressBalance,
  getAddressTokens,
  getAddressTransactions,
} from "../../components/AlchemySDK/commons";
import { Utils } from "alchemy-sdk";
import { useEthPrice } from "../../components/hooks/useEthPrice";
import { formatCurrency } from "../../components/commons";

import { plainBigNumber, toBigNumber } from "../../components/commons";

export default function Address({ data }) {
  const { eth } = useEthPrice();

  let address = data ? data.address : null;
  let addressBalance = data ? data.addressBalance : null;
  let addressTokens = data ? data.addressTokens : null;
  let addressTransactions = data ? data.addressTransactions : null;

  return (
    <>
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
            Address detail
          </Typography>
          {addressBalance ? (
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell style={{ whiteSpace: "nowrap" }}>
                    Address:
                  </TableCell>
                  <TableCell>
                    <Hash hash={address} isCompressed={false} hasLink={false} />
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ whiteSpace: "nowrap" }}>
                    Balance:
                  </TableCell>
                  <TableCell>
                    {addressBalance.balance ? (
                      <span>
                        {parseFloat(
                          Utils.formatEther(addressBalance.balance)
                        ).toFixed(6)}{" "}
                        ETH
                      </span>
                    ) : (
                      <Skeleton variant="text" width="100%" />
                      // height={220}
                    )}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell style={{ whiteSpace: "nowrap" }}>
                    Ether value:
                  </TableCell>
                  <TableCell>
                    {addressBalance.balance && eth.data ? (
                      <span>
                        {formatCurrency(
                          parseFloat(
                            Utils.formatEther(addressBalance.balance)
                          ) * parseFloat(eth.data.price_usd)
                        )}{" "}
                        (@ {formatCurrency(eth.data.price_usd)}/ETH)
                      </span>
                    ) : (
                      <Skeleton variant="text" width="100%" />
                      // height={220}
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          ) : (
            <Skeleton variant="rectangular" width="100%" height={220} />
          )}
          {/* 
              <TableRow>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  Timestamp:
                </TableCell>
                <TableCell>
                  Mined {formatAgeInSeconds(addressDetail.timestamp)} ago (@{" "}
                  {formatTimestamp(blockDetail.timestamp)})
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ whiteSpace: "nowrap" }}>Status:</TableCell>
                <TableCell>
                  {addressDetail.timestamp ? "Finalized" : "Pending"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  Transactions:
                </TableCell>
                <TableCell>
                  {addressDetail.transactions.length} transactions in this
                  address
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  Fee Recipient:
                </TableCell>
                <TableCell>
                  <Hash path="address" hash={addressDetail.miner} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  Gas Limit:
                </TableCell>
                <TableCell>
                  {Utils.formatEther(addressDetail.gasLimit)} ETH (
                  {Utils.formatUnits(addressDetail.gasLimit, "gwei")} Gwei)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  Base Fee Per Gas:
                </TableCell>
                <TableCell>
                  {Utils.formatEther(addressDetail.baseFeePerGas)} ETH (
                  {Utils.formatUnits(addressDetail.baseFeePerGas, "gwei")} Gwei)
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  Burnt Fees::
                </TableCell>
                <TableCell>
                  🔥
                  {Utils.formatEther(
                    addressDetail.baseFeePerGas.mul(addressDetail.gasUsed)
                  )}{" "}
                  ETH (
                  {Utils.formatUnits(
                    addressDetail.baseFeePerGas.mul(addressDetail.gasUsed),
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
                    hash={addressDetail.hash}
                  />
                </TableCell>
              </TableRow>
              <TableCell style={{ whiteSpace: "nowrap" }}>
                Parent Address:
              </TableCell>
              <TableCell>
                <Hash isCompressed={false} hash={addressDetail.parentHash} />
              </TableCell> */}
          {/* Use collapsible row to show even more information https://mui.com/material-ui/react-table/#collapsible-table
              <TableRow>
                <TableCell style={{ whiteSpace: "nowrap" }}>
                  Address JSON
                </TableCell>
                <TableCell>{JSON.stringify(addressDetail)}</TableCell>
              </TableRow> */}
        </Paper>
      </Grid>

      {/* Tokens */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Tokens
          </Typography>
          {addressTokens ? (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Asset name</TableCell>
                  <TableCell>Symbol</TableCell>
                  <TableCell>Contract address</TableCell>
                  <TableCell>Quantity</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {addressTokens.tokenBalances.map((t, i) => (
                  <TableRow key={i} variant="overline">
                    <TableCell>
                      <span>
                        {t.logo && (
                          <img
                            style={{
                              width: "auto",
                              maxHeight: "16px",
                            }}
                            src={t.logo}
                            alt={t.name}
                          />
                        )}{" "}
                        {t.name.substring(0, 10)}...
                      </span>
                    </TableCell>
                    <TableCell>{t.symbol.substring(0, 10)}...</TableCell>
                    <TableCell>
                      <Hash path="address" hash={t.contractAddress} />
                    </TableCell>
                    <TableCell>
                      {parseFloat(t.normalizedBalance).toPrecision(8)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Skeleton variant="rectangular" width="100%" height={220} />
          )}
        </Paper>
      </Grid>

      {/* Recent Transactions */}
      <Grid item xs={12} md={6}>
        <Paper sx={{ p: 2, display: "flex", flexDirection: "column" }}>
          <Typography component="h2" variant="h6" color="primary" gutterBottom>
            Transactions
          </Typography>
          {addressTransactions ? (
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Tx Hash</TableCell>
                  <TableCell>Asset</TableCell>
                  <TableCell>From/To</TableCell>
                  <TableCell>Value</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {addressTransactions.transfers.map((t, i) => (
                  <TableRow key={i} variant="overline">
                    <TableCell>
                      <Hash path="transaction" hash={t.hash} />
                    </TableCell>
                    <TableCell>{t.asset}</TableCell>
                    <TableCell>
                      <Hash path="address" hash={t.from} />
                      <br />
                      <Hash path="address" hash={t.to} />
                    </TableCell>
                    <TableCell>{parseFloat(t.value).toFixed(6)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Skeleton variant="rectangular" width="100%" height={220} />
          )}
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
export async function getServerSideProps({ params, req, res }) {
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=100, stale-while-revalidate=59"
  );

  const { address } = params;

  const addressBalance = await getAddressBalance(address);
  const addressTokens = await getAddressTokens(address);
  const addressTransactions = await getAddressTransactions(address);

  const data = {
    address: address,
    addressBalance: {
      balance: plainBigNumber(addressBalance.balance),
    },
    addressTokens: {
      ...addressTokens,
    },
    addressTransactions: {
      ...addressTransactions,
    },
  };

  // Pass data to the page via props
  return { props: { data } };
}