import React, { Fragment, useRef, useEffect, useState } from "react";

export const ExampleOne = () => {
  const scrollContainerRef = useRef(null);

  return (
    <Fragment>
      <h1>Example 1 - Lazy Image Loading</h1>

      <div
        style={{
          backgroundColor: "grey",
          height: "350px",
          width: "50%",
          overflowY: "scroll",
          padding: "20px",
        }}
        ref={scrollContainerRef}
      >
        {[
          "waterfall",
          "water",
          "bird",
          "rainforest",
          "kitten",
          "monkey",
          "reef",
          "sunset",
          "night",
          "calm",
        ].map((keyword) => (
          <LazyImageTile
            term={keyword}
            key={keyword}
            rootRef={scrollContainerRef}
          />
        ))}
      </div>
    </Fragment>
  );
};

const LazyImageTile = ({ rootRef, term }) => {
  const [startLoad, setStartLoad] = useState(false);
  const tileRef = useRef(null);

  useEffect(() => {
    if (rootRef.current) {
      const opts = {
        // If you don't set this then the window is the root
        root: rootRef.current,
        rootMargin: "0px",
        //threshold: [0, 1],
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (!startLoad) {
              setStartLoad(true);
            }
          }
        });
      }, opts);

      observer.observe(tileRef.current);

      return () => {
        observer.unobserve(tileRef.current);
      };
    }
  }, []);

  return (
    <div
      ref={tileRef}
      style={{
        height: "300px",
        width: "50%",
        backgroundColor: "white",
        margin: "20px auto",
      }}
    >
      {startLoad && (
        <img
          style={{ height: "300px", width: "100%" }}
          src={`https://source.unsplash.com/featured/?${term}`}
        />
      )}
    </div>
  );
};
