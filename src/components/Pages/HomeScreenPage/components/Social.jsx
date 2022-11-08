import React from "react";
import { memo } from "react";
import { Links } from "../../../../SocialLinks";

const Social = ({ classname, backIsDark }) => {
  return (
    <div className="flex gap-10">
      {Links.map((link, index) => (
        <a key={index} href={link.link} target="_blank">
          <img
            src={link.image}
            className={classname}
            style={{ filter: backIsDark && "invert(100%)" }}
          />
        </a>
      ))}
    </div>
  );
};

export default memo(Social);
