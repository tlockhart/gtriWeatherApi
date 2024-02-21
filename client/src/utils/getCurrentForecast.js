const getCurrentForecast = async (stationId) => {
    return fetch(`/api/weather/${stationId}`, {
        method: "GET", 
        headers: {
            "Content-Type": "application/json"
        }
    })
}

export default getCurrentForecast;
