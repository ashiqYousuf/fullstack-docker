import { useState } from "react";
import "./App.css";
import { ping } from "./api";

function App() {
  const [count, setCount] = useState(0);
  const [pingRes, setPingRes] = useState<string | null>(null);

  const handlePing = () => {
    ping()
      .then((data) => {
        setPingRes(data);
      })
      .catch((err) => {
        console.error(err.message);
        setPingRes("Error");
      });
  };

  return (
    <div className="w-full">
      <div className="flex flex-row gap-20">
        <div className="flex flex-col gap-2">
          {pingRes}
          <button className="" onClick={() => handlePing()}>
            Ping
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {count}
          <button className="" onClick={() => setCount(count + 1)}>
            Increment
          </button>
        </div>
        <div className="flex flex-col gap-2">
          {count}
          <button className="" onClick={() => setCount(count + 1)}>
            Increment
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
