import { useId } from "react";

export default function UseIdExample() {
  const id = useId();
  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>useId Example ({id})</h2>
      <label htmlFor={id}>Nome: </label>
      <input id={id} type="text" placeholder="Digite seu nome" />
    </div>
  );
}
