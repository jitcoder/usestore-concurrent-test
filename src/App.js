import React, { useTransition } from 'react';
import store, { useStore } from '@jitcoder/usestore';

import {
  syncBlock,
  useRegisterIncrementDispatcher,
  reducer,
  ids,
  useCheckTearing,
} from './common';

const Counter = React.memo(() => {
  const count = store.get('count', 0);
  syncBlock();
  return <div className="count">{count}</div>;
});

const Main = () => {
  const [count, setCount] = useStore('count', 0);
  useCheckTearing();
  useRegisterIncrementDispatcher(React.useCallback(() => {
    setCount(count+1);
  }, [count]));

  const [localCount] = useStore('count', 0);
  const localIncrement = () => {
    store.set('count', localCount + 1);
  }

  const normalIncrement = () => {
    store.set('count', count + 1);
  };

  const [startTransition, isPending] = useTransition();
  const transitionIncrement = () => {
    startTransition(() => {
      store.set('count', count + 1);
    });
  };
  return (
    <div>
      <button type="button" id="normalIncrement" onClick={normalIncrement}>Increment shared count normally (two clicks to increment one)</button>
      <button type="button" id="transitionIncrement" onClick={transitionIncrement}>Increment shared count in transition (two clicks to increment one)</button>
      <span id="pending">{isPending && 'Pending...'}</span>
      <h1>Shared Count</h1>
      {ids.map((id) => <Counter key={id} />)}
      <div className="count">{count}</div>
      <h1>Local Count</h1>
      {localCount}
      <button type="button" id="localIncrement" onClick={localIncrement}>Increment local count</button>
    </div>
  );
};

const App = () => <Main />;

export default App;