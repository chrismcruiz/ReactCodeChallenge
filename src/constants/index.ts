const API_KEY = "cm6q7lhr01qjend39mtgcm6q7lhr01qjend39mu0";

const BASE_URL = "https://finnhub.io/api/v1";

const WEBSOCKET_URL = `wss://ws.finnhub.io?token=${API_KEY}`;

const STOCKS_LIST_ENDPOINT =
  "/stock/symbol"; /* I was only allowed to retrieved data from US stocks */

const STOCKS_DATA_ENDPOINT = "/quote";

const DEFAULT_SYMBOL_VALUE = "BINANCE:BTCUSDT";
const DEFAULT_PRICE_VALUE = 42442;

export {
  API_KEY,
  BASE_URL,
  WEBSOCKET_URL,
  STOCKS_LIST_ENDPOINT,
  STOCKS_DATA_ENDPOINT,
  DEFAULT_SYMBOL_VALUE,
  DEFAULT_PRICE_VALUE,
};
