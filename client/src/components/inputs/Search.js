import React, { useState } from "react";

/**
 * 
 **/
 const Text = ({ inputRef }) => {


  return (
    <div>
      <input
        type="search"
        name="search"
        placeholder="Search"
        ref={inputRef}
      />
    </div>
  );
};

export default Text;
