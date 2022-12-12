import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { getBlockWithTransactions } from "./AlchemySDK/commons";
import Hash from "./ui/Hash";

export default function BlockInformation({ blockNumber }) {
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
          <li>Gas limit: {blockWithTransactions.gasLimit?.toString()}</li>
          <li>Gas used: {blockWithTransactions.gasUsed?.toString()}</li>
          <li>Base Fee: {blockWithTransactions.baseFeePerGas?.toString()} </li>
          <li>
            Block Hash: <Hash path="block" hash={blockWithTransactions.hash} />
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
      ) : (
        <Skeleton variant="rectangular" width={210} height={118} />
      )}
    </div>
  );
}
