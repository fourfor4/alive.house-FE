import React from "react";
import {
  StackedCarousel,
  ResponsiveContainer,
} from "react-stacked-center-carousel";

import cover from "../../../../assets/SongHomePage/carcard.svg";
import sliderightarrow from "../../../../assets/SongHomePage/slideArrorRight.svg";
import sliderightleft from "../../../../assets/SongHomePage/slideArrowLeft.svg";

export const data = [
  {
    cover: cover,
    title: "1",
  },
  {
    cover: cover,
    title: "2",
  },
  {
    cover: cover,
    title: "3",
  },
  {
    cover: cover,
    title: "4",
  },
  {
    cover: cover,
    title: "5",
  },
  {
    cover: cover,
    title: "6",
  },
  {
    cover: cover,
    title: "7",
  },
  {
    cover: cover,
    title: "8",
  },
  {
    cover: cover,
    title: "9",
  },
  {
    cover: cover,
    title: "10",
  },
];

export default function ResponsiveCarousel({ buttonsVisibility = true }) {
  const ref = React.useRef();
  return (
    <div style={{ width: "80rem", position: "relative" }}>
      <ResponsiveContainer
        carouselRef={ref}
        render={(parentWidth, carouselRef) => {
          // If you want to use a ref to call the method of StackedCarousel, you cannot set the ref directly on the carousel component
          // This is because ResponsiveContainer will not render the carousel before its parent's width is determined
          // parentWidth is determined after your parent component mounts. Thus if you set the ref directly it will not work since the carousel is not rendered
          // Thus you need to pass your ref object to the ResponsiveContainer as the carouselRef prop and in your render function you will receive this ref object
          let currentVisibleSlide = parseInt(data.length / 2);
          return (
            <StackedCarousel
              ref={carouselRef}
              slideComponent={Card}
              slideWidth={350}
              carouselWidth={parentWidth}
              data={data}
              currentVisibleSlide={currentVisibleSlide}
              maxVisibleSlide={5}
              useGrabCursor
              height={450}
            />
          );
        }}
      />
      {buttonsVisibility && (
        <>
          <img
            src={sliderightleft}
            style={{
              height: "3rem",
              position: "absolute",
              top: "40%",
              left: -10,
              zIndex: 10,
            }}
            onClick={() => {
              ref.current?.goBack();
            }}
            alt=""
          />
          <img
            src={sliderightarrow}
            style={{
              height: "3rem",
              position: "absolute",
              top: "40%",
              right: -10,
              zIndex: 10,
            }}
            onClick={() => {
              ref.current?.goNext(6);
            }}
          />
        </>
      )}
    </div>
  );
}

// Very import to memoize your Slide component otherwise there might be performance issue
// At minimum your should do a simple React.memo(SlideComponent)
// If you want the absolute best performance then pass in a custom comparator function like below
export const Card = React.memo(function (props) {
  const { data, dataIndex } = props;
  const { cover } = data[dataIndex];
  return (
    <div
      style={{
        width: "100%",
        height: 300,
        userSelect: "none",
      }}
      className="my-slide-component"
    >
      <img
        style={{
          height: "100%",
          width: "100%",
          objectFit: "cover",
          borderRadius: 0,
        }}
        draggable={false}
        src={cover}
      />
    </div>
  );
});
