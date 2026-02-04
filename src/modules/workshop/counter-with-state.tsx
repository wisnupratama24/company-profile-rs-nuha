"use client";
import React from "react";

function CounterWithState() {
  const [counter, setCounter] = React.useState(0);

  const handleClick = () => {
    setCounter(counter + 1);
  };
  
  return (
    <div>
      Counter: {counter}
      <br />
      <button
        type="button"
        className="border bg-amber-400 py-4 px-2"
        onClick={handleClick}
      >
        Increment
      </button>
    </div>
  );
}

export default CounterWithState;
