import Layout from "./Layout";
import Card from "./Components/Card";
import { useEffect, useMemo, useState } from "react";
import Show from "./utils/Show";
import { Virtuoso } from "react-virtuoso";
import { DataBinance, Item } from "./Types";
import { css } from "@emotion/css";
const hashmap = new Map();
function App() {
  const [data, setData] = useState<DataBinance[]>([]);
  const [loading, setLoading] = useState(true);
  const [lagecyData, setLagecyData] = useState<Item[]>([]);
  //use Effect to connect to websocket
  useEffect(() => {
    const socket = new WebSocket("wss://stream.binance.com:9443/ws/ethusdt@1s");
    socket.onopen = () => {
      console.log("Connected to Binance");
      socket.send(
        JSON.stringify({
          method: "SUBSCRIBE",
          params: ["!ticker@arr"],
        })
      );
    };
    socket.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      // Update the data state with the received data
      setLagecyData(Array.from(hashmap.values()));
      setData(receivedData);
    };

    socket.onerror = (error) => {
      // Handle WebSocket error
      console.error("WebSocket error:", error);
    };

    socket.onclose = (event) => {
      console.log("WebSocket connection closed:", event.code, event.reason);
    };

    return () => {
      // Clean up the WebSocket connection when the component unmounts
      socket.close();
    };
  }, []);
  //use Effect to update loading state
  useEffect(() => {
    if (data && data.length && loading) {
      setLoading(false);
    }
  }, [data]);
  //add items to hash list stop to update position
  const sortedData = useMemo(() => {
    function checkContainMinus(value: string | null) {
      if ((value || "").includes("-")) {
        return true;
      } else return false;
    }
    if (data && data.length > 0) {
      data.forEach((item) => {
        hashmap.set(item.s, {
          checkContainMinus: checkContainMinus(item.P),
          data: item,
        });
      });
    }
    return Array.from(hashmap.values());
  }, [data]);
  //  console.log(Array.from(hashmap.values()));
  return (
    <Layout>
      <Show>
        <Show.When isTrue={loading}>
          {Array.from({ length: 20 }).map((_, index) => (
            <div
              className="cover-image-skeleton"
              key={index}
              style={{ height: 50 }}
            />
          ))}
        </Show.When>
        <Show.When
          isTrue={Boolean(data && Array.from(hashmap.values()).length)}
        >
          <div
            className={css`
              max-width: 600px;
              margin: auto;
            `}
          >
            <Virtuoso
              style={{ width: "100%", height: "100vh" }}
              totalCount={hashmap.size}
              item={(index: number) => (
                <Card item={sortedData[index]} lagecy={lagecyData[index]} />
              )}
            />
          </div>
        </Show.When>
      </Show>
    </Layout>
  );
}

export default App;
