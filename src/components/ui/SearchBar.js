import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import {
  getAddressBalance,
  getBlock,
  getTransactionReceipt,
} from "../AlchemySDK/commons";
import { useRouter } from "next/router";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "60ch",
    },
  },
}));

export default function SearchBar() {
  let router = useRouter();

  const goToAddressPage = async (text) => {
    let address = await getAddressBalance(text);

    if (!address) {
      return false;
    }
    router.push(`/address/${text}`);
    return true;
  };

  const goToBlockPage = async (text) => {
    let block = await getBlock(text);

    if (!block) {
      return false;
    }
    router.push(`/block/${text}`);
    return true;
  };

  const goToTransactionPage = async (text) => {
    let transaction = await getTransactionReceipt(text);

    if (!transaction) {
      return false;
    }
    router.push(`/transaction/${text}`);
    return true;
  };

  const resolveSearch = async (text) => {
    if (text.startsWith("0x")) {
      if (text.length === 42) {
        // Address
        await goToAddressPage(text);
      } else if (text.length === 66) {
        // block hash or transaction
        if (!(await goToBlockPage(text))) {
          await goToTransactionPage(text);
        }
      }
    } else if (Number.isSafeInteger(text)) {
      // Block number?
      await goToBlockPage(text);
    }
  };

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search block, transaction, wallet address or ENS …"
        inputProps={{
          "aria-label": "Search block, transaction, wallet address or ENS …",
        }}
        onKeyPress={(ev) => {
          if (ev.key === "Enter") {
            ev.preventDefault();
            resolveSearch(ev.target.value);
          }
        }}
      />
    </Search>
  );
}
