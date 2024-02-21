import React from "react";

const Submit = ({ handleDayClick }) => {
  return (
    <button type="button" onClick={handleDayClick} className="submit-btn">
      Submit
    </button>
  );
};

export default Submit;
