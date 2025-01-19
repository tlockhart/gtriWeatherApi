const getCurrentForecast = async (stationId) => {
    console.log("Route:", REACT_APP_API_URL)
    return fetch(`{REACT_APP_API_URL}/api/weather/${stationId}`, {
        method: "GET", 
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export default getCurrentForecast;
