const convertToFarenheit = (temperature) => {
    const farenheit = (temperature * 9/5) + 32;
    // console.log("Farenheit:", farenheit)
    return Math.round(farenheit);
}

export default convertToFarenheit