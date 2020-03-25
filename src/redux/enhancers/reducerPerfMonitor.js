const round = number => Math.round(number * 100) / 100;

const reducerPerfMonitor = createStore => (reducer, initialState, enhancer) => {
  const reducerMonitor = (state, action) => {
    const start = performance.now();
    const newState = reducer(state, action);
    const end = performance.now();
    const diff = round(end - start);

    console.log('Reducer process time:', diff);

    return newState;
  };

  return createStore(reducerMonitor, initialState, enhancer);
};

export default reducerPerfMonitor;
