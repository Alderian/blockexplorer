import * as React from "react";
import Link from "@mui/material/Link";
import { CopyTextToClip } from "./CopyTextToClip";
import { Link as LinkRouter } from "react-router-dom";

const sliceHash = (hash) => {
  return hash
    ? `${hash.substring(0, 6)}...${hash.substring(hash.length - 4)}`
    : "0x";
};

export default function Hash({
  hash = "0x",
  text,
  path,
  hasLink = true,
  hasCopy = true,
  isCompressed = true,
  ...props
}) {
  const hrefPath = path ? `/${path}/${hash}` : `/${hash}`;
  const hashText = text ? text : isCompressed ? sliceHash(hash) : hash;

  return (
    <span {...props}>
      <span>
        {hasLink ? (
          <Link color="primary" component={LinkRouter} to={hrefPath}>
            {hashText}
          </Link>
        ) : (
          hashText
        )}
      </span>
      {hasCopy && (
        <span sx={{ m: 2 }}>
          <CopyTextToClip text={hash} size="x-small" />
        </span>
      )}
    </span>
  );
}
