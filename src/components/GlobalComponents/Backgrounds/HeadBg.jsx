import React, { useState } from "react";
import { animated, useSpring } from "react-spring";
import { makeStyles } from "@material-ui/core";

const HeadBg = () => {
  const [active, setActive] = useState(false);
  const { x } = useSpring({ config: { duration: 200 }, x: active ? 1 : 0 });

  const classes = useStyles();

  return (
    <svg
      width="600"
      height="275"
      viewBox="0 0 600 275"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={classes.headBg}
    >
      <animated.path
        d={x.to({
          range: [0, 1],
          output: [
            "M600 0H0V274.087C85.0754 232.41 188.267 208 299.5 208C411.169 208 514.734 232.602 600 274.578V0Z",
            "M600 0H0V186.5C87.587 274.087 219.267 277 299.5 279C380.169 277 512.413 274.087 600 186.5V0Z",
          ],
        })}
        fill="url(#paint0_linear)"
      />
      {/* <path fill-rule="evenodd" clip-rule="evenodd" d="M375 0H0V180.379C55.9668 220.768 119.775 230 187.5 230C255.225 230 319.033 220.768 375 180.379V0Z" fill="url(#paint0_linear)"/> */}
      {/* <path fill-rule="evenodd" clip-rule="evenodd" d="M375 0H0V230.379C55.9668 200.768 119.775 184 187.5 184C255.225 184 319.033 200.768 375 230.379V0Z" fill="url(#paint0_linear)"/> */}
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="-193.359"
          y1="-161.266"
          x2="134.684"
          y2="329.56"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.362709" stopColor="#8EFF66" />
          <stop offset="0.952851" stopColor="#45D9E2" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const useStyles = makeStyles((theme) => ({
  headBg: {
    position: "absolute",
    top: 0,
    left: "50%",
    transform: "translateX(-50%)",
    zIndex: "-1",
  },
}));

export default HeadBg;
