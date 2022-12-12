import { Alchemy, Network } from "alchemy-sdk";

export const ALCHEMY_REFRESH_INTERVAL =
  process.env.REACT_APP_ALCHEMY_API_REFRESH_INERVAL;

// Refer to the README doc for more information about using API
// keys in client-side code. You should never do this in production
// level code.
export const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};

// In this week's lessons we used ethers.js. Here we are using the
// Alchemy SDK is an umbrella library with several different packages.
//
// You can read more about the packages here:
//   https://docs.alchemy.com/reference/alchemy-sdk-api-surface-overview#api-surface
export const alchemy = new Alchemy(settings);

// --

export const getBlock = async (_blockNumber) =>
  await alchemy.core.getBlock(_blockNumber);

export const getBlockWithTransactions = async (_blockNumber) =>
  await alchemy.core.getBlockWithTransactions(_blockNumber);

export const getLatestBlockNumber = async () =>
  await alchemy.core.getBlockNumber();