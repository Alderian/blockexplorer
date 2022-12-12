/**
 *
 * @param {*} blockTimestamp block or transaction timestamp in seconds
 * @returns
 */
export default function formatAgeInSeconds(blockTimestamp) {
  return (Date.now() / 1000 - blockTimestamp).toFixed(2) + " secs";
}
