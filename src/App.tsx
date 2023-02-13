import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [itemsInPersonCart, setItemsInPersonCart] = useState<number>(0);
  const [lines, setLines] = useState([[10], [3], [6], [4], [2]]);

  function addPersonToQueue(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (itemsInPersonCart === undefined || itemsInPersonCart <= 0) return;

    let leastItemsAmount = 1e9;
    // loop through all lines,
    let lineWithLeast: number[] | undefined = undefined;
    //find line with the LEAST item count
    for (let line of lines) {
      const totalInLine = line.reduce((sum, value) => sum + value, 0);

      if (totalInLine < leastItemsAmount) {
        leastItemsAmount = totalInLine;
        lineWithLeast = line;
      }
    }

    if (!lineWithLeast) return;
    //push the itemsInPersonCart to line
    setLines((prevLines) =>
      prevLines.map((line) =>
        line === lineWithLeast ? [...line, itemsInPersonCart] : line,
      ),
    );
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setLines((prevLines) => {
        // reduce first item by 1 in each line
        return prevLines.map((line) => {
          return [line[0] - 1, ...line.slice(1)].filter((value) => value > 0);
        });
      });
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  return (
    <main className="App">
      <form onSubmit={addPersonToQueue}>
        <input
          required
          type="number"
          value={itemsInPersonCart}
          onChange={(e) => {
            setItemsInPersonCart(e.currentTarget.valueAsNumber);
          }}
        ></input>
        <button>Checkout</button>
      </form>

      <div className="lines">
        {lines.map((line, index) => (
          <div className="line" key={index}>
            {line.map((numberOfItems, lineIndex) => (
              <div key={lineIndex}>{numberOfItems}</div>
            ))}
          </div>
        ))}
      </div>
    </main>
  );
}

export default App;
