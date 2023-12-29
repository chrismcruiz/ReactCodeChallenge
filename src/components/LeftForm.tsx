import { ChangeEvent } from "react";

import { DEFAULT_SYMBOL_VALUE } from "../constants";
import { createStockListEndpoint } from "../utils";
import { StockList } from "../types/stockData";
import useFetch from "../hooks/useFetch";
import { Spinner } from ".";

type LeftFormProps = {
  priceAlert: number;
  handleNameChange: (stockName: string) => void;
  handlePriceChange: (price: number) => void;
};

const LeftForm = ({
  priceAlert,
  handleNameChange,
  handlePriceChange,
}: LeftFormProps) => {
  const DEFAULT_EXCHANGE = "US";
  const { data, loading, error } = useFetch<StockList[] | null>(
    createStockListEndpoint(DEFAULT_EXCHANGE)
  );
  const slicedData = data?.slice(0, 30);

  function handleSelectChange(e: ChangeEvent<HTMLSelectElement>) {
    const exchangeCode = e.target.value;
    handleNameChange(exchangeCode);
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const priceAlert = e.target.value;
    handlePriceChange(Number(priceAlert));
  }

  if (loading) return <Spinner />;

  return (
    <form className="w-full mx-auto flex flex-col sm:flex-row lg:flex-col justify-center gap-6">
      <div>
        <label
          htmlFor="stockName"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Select a Stock
        </label>
        <select
          id="stockName"
          onChange={handleSelectChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
          <option defaultValue={DEFAULT_SYMBOL_VALUE}>
            {DEFAULT_SYMBOL_VALUE}
          </option>
          <option value="AAPL">AAPL</option>
          <option value="IC MARKETS:1">IC MARKETS:1</option>
          {slicedData?.map(({ symbol, description }: StockList) => (
            <option key={symbol} value={symbol}>
              {description}
            </option>
          ))}
        </select>
        {error && <div className="text-red-500">{error.message}</div>}
      </div>
      <div>
        <label
          htmlFor="priceInput"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Price Alert:
        </label>
        <input
          type="number"
          id="priceInput"
          value={priceAlert}
          onChange={handleInputChange}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="90210"
          required
        />
      </div>
    </form>
  );
};

export default LeftForm;
