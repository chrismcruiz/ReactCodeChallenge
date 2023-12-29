export type StockList = {
  currency: string;
  description: string;
  displaySymbol: string;
  figi: string;
  mic: string;
  symbol: string;
  type: string;
};

export type StockData = {
  c: number[];
  p: number;
  s: string;
  t: number;
  v: number;
};
