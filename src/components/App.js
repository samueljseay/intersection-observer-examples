import React, { useState, Fragment } from "react";

import { ExampleOne } from "./ExampleOne";

export const App = () => {
  const [currentExample, setCurrentExample] = useState(1);

  return (
    <Fragment>
      <h1>Intersection Observer Examples</h1>

      <a
        href="#"
        onClick={() => {
          setCurrentExample(1);
        }}
      >
        Example 1
      </a>
      <br></br>
      <a
        href="#"
        onClick={() => {
          setCurrentExample(2);
        }}
      >
        Example 2
      </a>
      <br></br>
      <a
        href="#"
        onClick={() => {
          setCurrentExample(3);
        }}
      >
        Example 3
      </a>

      {getExample(currentExample)}
    </Fragment>
  );
};

const getExample = (num) => {
  if (num === 1) {
    return <ExampleOne />;
  } else {
    return null;
  }
};
