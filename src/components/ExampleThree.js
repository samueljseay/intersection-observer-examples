import React, { Fragment, useEffect, useRef, useState } from "react";
import Color from "color";

const baseColor = Color("#6EC2DE");

export const ExampleThree = () => {
  const rootRef = useRef(null);
  const circleRef = useRef(null);
  const [visibility, setVisibility] = useState(0);

  useEffect(() => {
    if (rootRef.current) {
      const opts = {
        // If you don't set this then the window is the root
        root: rootRef.current,
        rootMargin: "0px",
        // FROM THE MDN:
        // Either a single number or an array of numbers which
        // indicate at what percentage of the target's visibility
        // the observer's callback should be executed.

        // If you only want to detect when visibility passes the 50% mark,
        // you can use a value of 0.5. If you want the callback to run every
        // time visibility passes another 25%, you would specify the array [0, 0.25, 0.5, 0.75, 1].

        // The default is 0 (meaning as soon as even one pixel is visible, the callback will be run).
        // A value of 1.0 means that the threshold isn't considered passed until every pixel is visible.
        threshold: makeThresholdList(), // [0.01, 0.02... 1.0]
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          setVisibility(Math.round(entry.intersectionRatio * 100));

          circleRef.current.style.backgroundColor = `${baseColor
            .mix(Color("#6448DC"), entry.intersectionRatio)
            .hex()
            .toString()}`;
        });
      }, opts);

      observer.observe(circleRef.current);

      return () => {
        observer.unobserve(circleRef.current);
      };
    }
  }, []);

  return (
    <Fragment>
      <h1>Example 3 - Change based on entry.intersectionRatio</h1>
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
        <div style={{ height: "600px" }}>
          <div
            ref={circleRef}
            style={{
              marginTop: "350px",
              width: "150px",
              height: "400px",
              backgroundColor: "white",
            }}
          >
            <h1 style={{ textAlign: "center", paddingTop: "200px" }}>
              {visibility}%
            </h1>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const makeThresholdList = () => {
  const arr = [];
  for (let i = 1; i <= 100; i++) {
    arr.push(0.01 * i);
  }

  return arr;
};
