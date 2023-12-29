import { useEffect, useState } from "react";
import { StockData } from "../types/stockData";
import { LocatedSpinner } from "./Spinner";

type TopCardsProps = {
  selectedStockName: string;
  stockData: StockData;
  priceAlert: number;
  connectionError: Error | null;
};

const TopCards = ({
  selectedStockName,
  stockData,
  priceAlert,
  connectionError,
}: TopCardsProps) => {
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // Wait for 10 seconds in case web connection doesn't get any response
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 10000);

    // Clean up the timeout when the component unmounts
    return () => clearTimeout(timeoutId);
  }, [selectedStockName]);

  if (isLoading && !stockData) {
    return (
      <div className="flex justify-center items-center">
        <LocatedSpinner />
      </div>
    );
  }

  if (connectionError) {
    return (
      <div className="text-[#f45b5b] text-center">
        {connectionError.message}
      </div>
    );
  }

  const { p: currentPrice, s: symbol } = stockData ?? {};
  const shouldbeAlerted = currentPrice <= priceAlert;
  return (
    <div className="p-4">
      <div className="block max-w-sm p-6 bg-white border border-gray-200 mx-auto rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <div className="flex justify-between items-center">
          <div className="font-semibold">{selectedStockName}</div>
          <div
            className={`font-semibold ${
              shouldbeAlerted ? "text-[#f45b5b]" : "text-[#1db954]"
            }`}
          >
            {selectedStockName === symbol ? currentPrice : "-"}
          </div>
        </div>
        {/* <div>{percentChange}%</div> */}
      </div>
      {!stockData && (
        <div className="text-center text-lg p-2">
          There's no current stock <span className="font-semibold">LIVE</span>{" "}
          information. Try again...
        </div>
      )}
    </div>
  );
};

export default TopCards;
