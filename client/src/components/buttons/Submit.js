import React from "react";

const Submit = ({ handleDayClick }) => {
  return (
    <div>
      <button type="button" onClick={handleDayClick}>
        Submit!
      </button>
    </div>
  );
};

export default Submit;
