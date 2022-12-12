import * as React from "react";
import Link from "@mui/material/Link";
import { CopyTextToClip } from "./CopyTextToClip";

const sliceHash = (hash) => {
  return hash
    ? `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`
    : "0x";
};

export default function Hash({
  hash = "0x",
  path,
  hasLink = true,
  hasCopy = true,
  ...props
}) {
  const hrefPath = path ? `/${path}/${hash}` : `/${hash}`;

  return (
    <span {...props}>
      <span sx={{ flex: "1 1 80%" }}>
        {hasLink ? (
          <Link color="primary" href={hrefPath}>
            {sliceHash(hash)}
          </Link>
        ) : (
          sliceHash(hash)
        )}
      </span>
      {hasCopy && (
        <span sx={{ m: 1, flex: "1 1 20%" }}>
          <CopyTextToClip text={hash} size="x-small" />
        </span>
      )}
    </span>
  );
}
