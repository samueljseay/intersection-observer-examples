import React, { useEffect, Fragment, useState, useRef } from "react";

export const ExampleTwo = () => {
  const [items, setItems] = useState([1, 2, 3, 4]);
  const anchorRef = useRef(null);
  const rootRef = useRef(null);

  useEffect(() => {
    if (rootRef.current) {
      const opts = {
        // If you don't set this then the window is the root
        root: rootRef.current,
        rootMargin: "0px",
        threshold: [0, 1],
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              // Simulate network delay
              setItems(addItemsToArray(items));
            }, 500);
          }
        });
      }, opts);

      observer.observe(anchorRef.current);

      return () => {
        observer.unobserve(anchorRef.current);
      };
    }
  }, [items]);

  return (
    <Fragment>
      <h1>Example Two - Infinite Scrolling List using an "anchor"</h1>
      <div
        ref={rootRef}
        style={{
          backgroundColor: "grey",
          height: "350px",
          width: "50%",
          overflowY: "scroll",
          padding: "20px",
        }}
      >
        {items.map((i) => (
          <BlankTile title={i} key={i} />
        ))}
        <img
          ref={anchorRef}
          src="/img/load.svg"
          style={{ width: "50px", margin: "auto", display: "block" }}
        />
      </div>
    </Fragment>
  );
};

const BlankTile = ({ title }) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        height: "150px",
        margin: "auto",
        width: "50%",
        marginBottom: "20px",
      }}
    >
      <h1>{title}</h1>
    </div>
  );
};

const addItemsToArray = (arr) => {
  let lastItem = arr[arr.length - 1];
  const newArr = arr.slice();

  for (let i = 0; i < 4; i++) {
    lastItem++;
    newArr.push(lastItem);
  }

  return newArr;
};
