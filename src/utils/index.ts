import {
  API_KEY,
  BASE_URL,
  STOCKS_DATA_ENDPOINT,
  STOCKS_LIST_ENDPOINT,
} from "../constants";

function createStockListEndpoint(exchange: string) {
  return `${BASE_URL}${STOCKS_LIST_ENDPOINT}?token=${API_KEY}&exchange=${exchange}`;
}

function createStockDataEndpoint(symbol: string) {
  return `${BASE_URL}${STOCKS_DATA_ENDPOINT}?token=${API_KEY}&symbol=${symbol}`;
}

export { createStockListEndpoint, createStockDataEndpoint };
