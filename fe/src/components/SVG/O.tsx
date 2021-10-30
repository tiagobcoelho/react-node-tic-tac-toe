import * as React from "react";

function SvgO(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 134 134"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="xMinYMin meet"
      {...props}
    >
      <path
        d="M134 67c0 37.003-29.997 67-67 67S0 104.003 0 67 29.997 0 67 0s67 29.997 67 67zm-90.45 0c0 12.951 10.499 23.45 23.45 23.45 12.951 0 23.45-10.499 23.45-23.45 0-12.951-10.499-23.45-23.45-23.45-12.951 0-23.45 10.499-23.45 23.45z"
        fill="#fff"
      />
    </svg>
  );
}

export default SvgO;