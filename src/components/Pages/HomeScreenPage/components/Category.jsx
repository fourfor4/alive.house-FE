import React from "react";
import { memo } from "react";

const Category = ({ light, customClick, activeColor }) => {
  const [cat, setCat] = React.useState([
    { id: 1, name: "new music", active: true },
    { id: 2, name: "trending", active: false },
    { id: 3, name: "collections", active: false },
  ]);

  const handleTitleClick = (id) => {
    customClick && customClick(id);
    setCat(
      cat.map((item) => {
        if (item.id === id) {
          item.active = true;
        } else {
          item.active = false;
        }
        return item;
      })
    );
  };

  return (
    <div>
      <div className="flex justify-center gap-16">
        {cat.map((item, index) => {
          if (index === cat.length - 1) {
            return (
              <p
                onClick={() => handleTitleClick(item.id)}
                key={index}
                className={`font-bold ${
                  item.active
                    ? activeColor
                      ? activeColor
                      : "text-green"
                    : light
                    ? "text-gray"
                    : "text-white"
                } text-[24px]`}
              >
                {item.name}
              </p>
            );
          } else {
            return (
              <React.Fragment key={item.id}>
                <p
                  onClick={() => handleTitleClick(item.id)}
                  className={`${
                    item.active
                      ? activeColor
                        ? activeColor
                        : "text-green"
                      : light
                      ? "text-gray"
                      : "text-white"
                  } text-[24px] font-bold`}
                >
                  {item.name}
                </p>
                <p
                  className={`font-bold ${
                    light ? "text-gray" : "text-white"
                  } text-[24px]`}
                >
                  /
                </p>
              </React.Fragment>
            );
          }
        })}
      </div>
    </div>
  );
};

export default memo(Category);
