import React, { useState, Fragment } from "react";

import { ExampleOne } from "./ExampleOne";
import { ExampleTwo } from "./ExampleTwo";

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
  switch (num) {
    case 1:
      return <ExampleOne />;
    case 2:
      return <ExampleTwo />;
    default:
      return null;
  }
};
