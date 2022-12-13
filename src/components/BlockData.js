import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { getBlockWithTransactions } from "./AlchemySDK/commons";
import formatAgeInSeconds from "./commons";

export default function BlockData({ blockNumber }) {
  let [blockWithTransactions, setBlockWithTransactions] = useState();

  useEffect(() => {
    if (blockNumber && !blockWithTransactions)
      getBlockWithTransactions(blockNumber).then((res) =>
        setBlockWithTransactions(res)
      );
  });

  return (
    <div>
      {blockNumber && blockWithTransactions ? (
        <ul>
          <li>Block number: {blockWithTransactions.number}</li>
          <li>
            Mined {formatAgeInSeconds(blockWithTransactions.timestamp)} ago (@
            {new Intl.DateTimeFormat("en-US", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            }).format(blockWithTransactions.timestamp * 1000)}
            )
          </li>
          <li>
            Transactions in block:
            {blockWithTransactions?.transactions?.length}
          </li>
        </ul>
      ) : (
        <Skeleton variant="rectangular" width={210} height={118} />
      )}
    </div>
  );
}
