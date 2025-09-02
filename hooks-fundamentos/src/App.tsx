import "./App.css";
import UseCallbackExample from "./components/useCallback";
import UseContextExample from "./components/useContext";
import UseIdExample from "./components/useId";
import UseLayoutEffectExample from "./components/useLayoutEffect";
import UseReducerExample from "./components/useReducer";

export default function App() {
  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "20px",
        padding: "40px",
        borderRadius: "20px",
      }}
    >
      <div style={cardStyle}>
        <UseCallbackExample />
      </div>
      <div style={cardStyle}>
        <UseReducerExample />
      </div>
      <div style={cardStyle}>
        <UseLayoutEffectExample />
      </div>
      <div style={cardStyle}>
        <UseIdExample />
      </div>
      <div style={cardStyle}>
        <UseContextExample />
      </div>
    </div>
  );
}

const cardStyle: React.CSSProperties = {
  flex: "1 1 250px",
  padding: "20px",
  borderRadius: "12px",
  boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
};
