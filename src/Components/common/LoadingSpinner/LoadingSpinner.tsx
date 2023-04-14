import React from 'react';

function LoadingSpinner(p: { containerStyle?: React.CSSProperties; color?: string; radius?: number }) {
  const radius = p.radius ? p.radius : 40;
  const color = p.color ? p.color : '#353935';
  return (
    <div style={p.containerStyle}>
      <svg
        version="1.1"
        id="loader-1"
        xmlns="http://www.w3.org/2000/svg"
        x="0px"
        y="0px"
        width={`${radius}px`}
        height={`${radius}px`}
        viewBox="0 0 50 50"
      >
        <path
          fill={color}
          d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z"
        >
          <animateTransform
            attributeType="xml"
            attributeName="transform"
            type="rotate"
            from="0 25 25"
            to="360 25 25"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
    </div>
  );
}

export default LoadingSpinner;
