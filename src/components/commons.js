/**
 * Calculate elapsed time in seconds
 *
 * @param {*} blockTimestamp block or transaction timestamp in seconds
 * @returns
 */
export function formatAgeInSeconds(blockTimestamp) {
  return (Date.now() / 1000 - blockTimestamp).toFixed(2) + " secs";
}

/**
 * Format MM/DD/YYYY
 *
 * @param {*} timestamp block or transaction timestamp in seconds
 * @returns
 */
export function formatTimestamp(timestamp) {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(timestamp * 1000);
}

/**
 * Format currency
 *
 * @param {*} timestamp block or transaction timestamp in seconds
 * @returns
 */
export function formatCurrency(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amount);
}
