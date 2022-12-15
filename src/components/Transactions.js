import {
  Link,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Hash from "./ui/Hash";
import { getBlockWithTransactions } from "./AlchemySDK/commons";
import { Utils } from "alchemy-sdk";

const MAX_ITEMS_PRE_PAGE = process.env.REACT_APP_MAX_ITEMS_PER_PAGE;

function preventDefault(event) {
  event.preventDefault();
}

export default function Transactions({ blockNumber }) {
  let [blockWithTransactions, setBlockWithTransactions] = useState();

  useEffect(() => {
    if (blockNumber && !blockWithTransactions)
      getBlockWithTransactions(blockNumber).then((res) =>
        setBlockWithTransactions(res)
      );
  });

  return (
    <>
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
        }}
      >
        <Typography
          sx={{ flex: "1 1 70%" }}
          component="h2"
          variant="h6"
          color="primary"
          gutterBottom
        >
          Latest Transactions
        </Typography>
        <Link
          color="primary"
          href="#"
          onClick={preventDefault}
          sx={{ fontSize: "small" }}
        >
          View all transactions
        </Link>
      </Toolbar>
      {blockNumber &&
      blockWithTransactions &&
      blockWithTransactions.transactions ? (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Tx Hash</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>From/To</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blockWithTransactions.transactions
              .slice(0, MAX_ITEMS_PRE_PAGE)
              .map((t, i) => (
                <TableRow key={i} variant="overline">
                  <TableCell>
                    <Hash path="tx" hash={t.hash} />
                  </TableCell>
                  <TableCell>{t.type}</TableCell>
                  <TableCell>
                    <Hash path="address" hash={t.from} />
                    <br />
                    <Hash path="address" hash={t.to} />
                  </TableCell>
                  <TableCell>
                    {parseFloat(Utils.formatEther(t.value)).toFixed(6)} ETH
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      ) : (
        <Skeleton variant="rectangular" width="100%" height={220} />
      )}
    </>
  );
}
