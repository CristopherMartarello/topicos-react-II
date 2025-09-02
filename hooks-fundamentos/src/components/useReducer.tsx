import { useReducer } from "react";

type State = { count: number };
type Action = { type: "increment" } | { type: "decrement" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    default:
      return state;
  }
}

export default function UseReducerExample() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div style={{ marginBottom: "0px" }}>
      <h2>useReducer (Estado)</h2>
      <p>Count: {state.count}</p>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 5,
        }}
      >
        <button onClick={() => dispatch({ type: "decrement" })}>
          Decrementar
        </button>
        <button onClick={() => dispatch({ type: "increment" })}>
          Incrementar
        </button>
      </div>
    </div>
  );
}
