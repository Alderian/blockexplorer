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
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import Hash from "../components/ui/Hash";
import {
  getAddressBalance,
  getAddressTokens,
  getAddressTransactions,
} from "../components/AlchemySDK/commons";
import { Utils } from "alchemy-sdk";
import { useEthPrice } from "../components/hooks/useEthPrice";

export default function Address() {
  let { address } = useParams();
  const [addressBalance, setAddressBalance] = useState();
  const [addressTokens, setAddressTokens] = useState();
  const [addressTransactions, setAddressTransactions] = useState();
  const { eth } = useEthPrice();

  useEffect(() => {
    if (address) {
      getAddressBalance(address).then((res) => {
        console.log(res);
        setAddressBalance(res);
      });
      getAddressTokens(address).then((res) => {
        console.log(res);
        setAddressTokens(res);
      });
      getAddressTransactions(address).then((res) => {
        console.log(res);
        setAddressTransactions(res);
      });
    }
  }, [address]);

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
                    {addressBalance.balance ? (
                      <span>
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                        }).format(
                          parseFloat(
                            Utils.formatEther(addressBalance.balance)
                          ) * parseFloat(eth.data.price_usd)
                        )}{" "}
                        (@ ${eth.data.price_usd}/ETH)
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
                  Mined {formatAgeInSeconds(addressDetail.timestamp)} ago (@
                  {new Intl.DateTimeFormat("en-US", {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    second: "2-digit",
                  }).format(addressDetail.timestamp * 1000)}
                  )
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
                      <Hash path="tx" hash={t.hash} />
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
