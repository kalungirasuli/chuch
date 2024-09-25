import  { useState } from "react";
import InputCode from "./InputCode";

import "./styles.css";

export default function Code() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="App">
      <h1>Code Input</h1>

      <InputCode
        length={6}
        label="Code Label"
        loading={loading}
        onComplete={code => {
          setLoading(true);
          setTimeout(() => setLoading(false), 10000);
        }}
      />
    </div>
  );
}

