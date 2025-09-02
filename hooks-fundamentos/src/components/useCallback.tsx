import { useState, useCallback } from "react";

export default function UseCallbackExample() {
  const [count, setCount] = useState(0);

  const increment = useCallback(() => {
    setCount((prev) => prev + 1);
  }, []);

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>useCallback</h2>
      <p>Count: {count}</p>
      <button onClick={increment}>Incrementar</button>
    </div>
  );
}
