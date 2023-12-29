import { useEffect, useState } from "react";

import { Graph, LeftForm, TopCards } from "./components";
import {
  DEFAULT_PRICE_VALUE,
  DEFAULT_SYMBOL_VALUE,
  WEBSOCKET_URL,
} from "./constants";
import { StockData } from "./types/stockData";

import "./App.css";

function App() {
  const [selectedStockName, setSelectedStockName] =
    useState(DEFAULT_SYMBOL_VALUE);
  const [priceAlert, setPriceAlert] = useState(DEFAULT_PRICE_VALUE);
  const [connectionError, setConnectionError] = useState<Error | null>(null);
  const [historicalPrices, setHistoricalPrices] = useState<StockData[]>([]);
  const currentStockData = historicalPrices[historicalPrices.length - 1];

  const updateHistoricalPrices = (pricesArr: StockData[]) =>
    setHistoricalPrices((prevPrices) => [...prevPrices, ...pricesArr]);

  useEffect(() => {
    const socket = new WebSocket(WEBSOCKET_URL);

    // Connection opened -> Subscribe
    socket.addEventListener("open", () =>
      socket.send(
        JSON.stringify({ type: "subscribe", symbol: selectedStockName })
      )
    );

    // Listen for messages
    socket.addEventListener("message", function (e) {
      const liveStockData = JSON.parse(e.data).data;
      if (!liveStockData) return;
      updateHistoricalPrices(liveStockData);
      setConnectionError(null);
    });

    // Event handler for when an error occurs
    socket.addEventListener("error", (e) => {
      console.error("WebSocket error:", e);
      if (e instanceof Error) {
        setConnectionError(e);
      } else {
        setConnectionError(
          new Error("Something went wrong. Please try again...")
        );
      }
    });

    // Event handler for when the connection is closed
    socket.addEventListener("close", () =>
      socket.send(
        JSON.stringify({ type: "unsubscribe", symbol: selectedStockName })
      )
    );

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      socket.close();
      setHistoricalPrices([]);
      setConnectionError(null);
    };
  }, [selectedStockName]);

  useEffect(() => {
    window.localStorage.setItem(
      "stockValues",
      JSON.stringify(historicalPrices)
    );
  }, [historicalPrices]);

  return (
    <div className="bg-gray-200 min-h-screen">
      <div className="max-w-7xl px-8 xl:px-4 2xl:px-2 py-6 mx-auto flex flex-col  gap-8">
        <TopCards
          selectedStockName={selectedStockName}
          stockData={currentStockData}
          priceAlert={priceAlert}
          connectionError={connectionError}
        />
        <div className="grid lg:grid-cols-3 gap-8 ">
          <div className="lg:col-span-1">
            <LeftForm
              priceAlert={priceAlert}
              handleNameChange={(name: string) => setSelectedStockName(name)}
              handlePriceChange={(price: number) => setPriceAlert(price)}
            />
          </div>
          <div className="lg:col-span-2">
            <Graph historicalPrices={historicalPrices} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
