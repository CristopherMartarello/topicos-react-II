import { useLayoutEffect, useRef } from "react";

export default function UseLayoutEffectExample() {
  const boxRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (boxRef.current) {
      boxRef.current.style.color = "green";
      console.log("useLayoutEffect aplicado antes da tela ser pintada.");
    }
  }, []);

  return (
    <div style={{ marginBottom: "20px" }}>
      <h2>useLayoutEffect</h2>
      <div ref={boxRef}>Texto que muda de cor antes da renderização</div>
    </div>
  );
}
