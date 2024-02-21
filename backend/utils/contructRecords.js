const constructRecords = (date, temperature, stationId) => {
    const tempObject = {
      date: date.split("T")[0],
      temperature,
      stationId,
    };
    return tempObject;
  }

  export default constructRecords;