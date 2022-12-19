import { Divider, Skeleton, Typography } from "@mui/material";
import { formatCurrency } from "./commons";
import { useEthPrice } from "./hooks/useEthPrice";

export default function EthereumPrice() {
  const { eth } = useEthPrice();

  return (
    <>
      {eth && eth.data ? (
        <>
          <Typography variant="overline" m={1}>
            Ether Price: {formatCurrency(eth.data.price_usd)} @
            {eth.data.price_btc} BTC
          </Typography>
          <Typography
            variant="overline"
            m={1}
            ml={0}
            color={eth.data.price_change_percentage_24h >= 0 ? "green" : "red"}
          >
            ({eth.data.price_change_percentage_24h}%)
          </Typography>
          <Divider orientation="vertical" variant="middle" flexItem />
          <Typography variant="overline" m={1}>
            Market Cap: {formatCurrency(eth.data.marketCap_usd)}
          </Typography>
        </>
      ) : (
        <Skeleton variant="rectangular" width={210} height={118} />
      )}
    </>
  );
}
