import React, { useContext } from "react";
import { CountContext } from "../context/CountContext";

function CountRerender() {
  const count = useContext(CountContext);
  return <div>Count: {count}</div>;
}

export default CountRerender;
