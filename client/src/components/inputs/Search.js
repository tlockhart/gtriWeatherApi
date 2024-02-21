import React, { useState } from "react";
import Submit from "../buttons/Submit";
/**
 * 
 **/
 const Text = ({ inputRef, handleDayClick }) => {


  return (
    <div className="search-group">
      <p>Station Id: </p>
      <input
        className="search-input"
        type="search"
        name="search"
        placeholder="katl"
        ref={inputRef}
      />
      <Submit handleDayClick={handleDayClick} />
    </div>
  );
};

export default Text;
