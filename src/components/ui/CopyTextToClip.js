import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";
import ContentPasteOutlinedIcon from "@mui/icons-material/ContentPasteOutlined";
import InventoryOutlinedIcon from "@mui/icons-material/InventoryOutlined";

export const CopyTextToClip = ({ text, size = "small", ...props }) => {
  const [copied, setCopied] = useState(false);

  /**
   * Mark icon as copied and rolback to initial state after 3 seconds
   */
  const markCopiedAndResetIcon = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  return (
    <span {...props}>
      {copied ? (
        <InventoryOutlinedIcon color="primary" fontSize={size} />
      ) : (
        <CopyToClipboard text={text} onCopy={() => markCopiedAndResetIcon()}>
          <ContentPasteOutlinedIcon color="primary" fontSize={size} />
        </CopyToClipboard>
      )}
    </span>
  );
};
