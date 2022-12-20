import { Alchemy, Network } from "alchemy-sdk";

export const ALCHEMY_REFRESH_INTERVAL =
  process.env.NEXT_PUBLIC_ALCHEMY_API_REFRESH_INERVAL;

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
export const settings = {
  apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
export const alchemy = new Alchemy(settings);

const MAX_ITEMS_PRE_PAGE = process.env.NEXT_PUBLIC_MAX_ITEMS_PER_PAGE;

// --

export const getBlock = async (_blockNumber) =>
  await alchemy.core.getBlock(_blockNumber);

export const getBlockWithTransactions = async (_blockNumber) =>
  await alchemy.core.getBlockWithTransactions(_blockNumber);

export const getLatestBlockNumber = async () =>
  await alchemy.core.getBlockNumber();

/**
 * Return the result of adding up transact.getTransaction and core.getTransactionReceipt
 * @param {*} transaction hash
 * @returns
 */
export const getTransactionReceipt = async (transaction) => {
  return {
    ...(await alchemy.transact.getTransaction(transaction)),
    ...(await alchemy.core.getTransactionReceipt(transaction)),
  };
};

// -- Address

export const getAddressBalance = async (_address) => {
  return {
    balance: await alchemy.core.getBalance(_address),
  };
};

export const getAddressTokens = async (_address) => {
  let tokenBalances = await alchemy.core.getTokenBalances(_address);
  if (tokenBalances && tokenBalances.tokenBalances) {
    tokenBalances = tokenBalances.tokenBalances
      .filter((token) => {
        return (
          token.tokenBalance !==
          "0x0000000000000000000000000000000000000000000000000000000000000000"
        );
      })
      .slice(0, MAX_ITEMS_PRE_PAGE);

    // Loop through all tokens with non-zero balance
    for (let token of tokenBalances) {
      // Get balance of token
      let balance = token.tokenBalance;

      // Get metadata of token
      const metadata = await alchemy.core.getTokenMetadata(
        token.contractAddress
      );

      // Compute token balance in human-readable format
      balance = balance / Math.pow(10, metadata.decimals);
      balance = balance.toFixed(2);

      token.normalizedBalance = balance;

      Object.assign(token, metadata);
    }
  } else {
    tokenBalances = [];
  }

  return {
    tokenBalances: tokenBalances,

    // Contract storage data if address is a contract
    //...await alchemy.core.getStorageAt(_address, slot position in hex, "latest")
  };
};

export const getAddressTransactions = async (
  _address,
  _fromBlock = "0x0",
  _categories = ["external", "internal", "erc20", "erc721", "erc1155"]
) => {
  let transactions = await alchemy.core.getAssetTransfers({
    fromBlock: _fromBlock,
    toAddress: _address,
    category: _categories,
    maxCount: MAX_ITEMS_PRE_PAGE,
  });
  return transactions;
};
