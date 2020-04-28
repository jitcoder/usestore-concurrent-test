import React, { createContext, useContext, useTransition } from "react";
import {
  syncBlock,
  useRegisterIncrementDispatcher,
  ids,
  useCheckTearing
} from "./common";

import store, { useStore } from "@jitcoder/usestore";

const Counter = React.memo(() => {
  syncBlock();
  return <div className="count">{store.get("count")}</div>;
});

const Main = () => {
  const [count, setCount] = useStore("count");

  useCheckTearing();
  useRegisterIncrementDispatcher(
    React.useCallback(() => {
      setCount(count + 1);
    }, [setCount])
  );
  const [localCount, localIncrement] = React.useReducer(c => c + 1, 0);
  const normalIncrement = () => {
    setCount(count + 1);
  };
  const [startTransition, isPending] = useTransition();
  const transitionIncrement = () => {
    startTransition(() => {
      setCount(count + 1);
    });
  };

  return (
    <div>
      <button type="button" id="normalIncrement" onClick={normalIncrement}>
        Increment shared count normally (two clicks to increment one)
      </button>
      <button
        type="button"
        id="transitionIncrement"
        onClick={transitionIncrement}
      >
        Increment shared count in transition (two clicks to increment one)
      </button>
      <span id="pending">{isPending && "Pending..."}</span>
      <h1>Shared Count</h1>
      {ids.map(id => (
        <Counter key={id} />
      ))}
      <div className="count">{store}</div>
      <h1>Local Count</h1>
      {localCount}
      <button type="button" id="localIncrement" onClick={localIncrement}>
        Increment local count
      </button>
    </div>
  );
};

const App = () => {
  return <Main />;
};

export default App;
