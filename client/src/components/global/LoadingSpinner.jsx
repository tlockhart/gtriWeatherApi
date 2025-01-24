import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRotateRight } from "@fortawesome/free-solid-svg-icons";

const LoadingSpinner = ({ width, height }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 1000,
      }}
    >
      <div className="fas fa-spin center">
        <FontAwesomeIcon
          icon={faRotateRight}
          // size='5x'
          color="#3B5998"
          style={{
            width: `${width}`,
            height: `${height}`,
          }}
        />
      </div>
    </div>
  );
};

export default LoadingSpinner;
