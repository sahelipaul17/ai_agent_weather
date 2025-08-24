import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// dynamic weather tool
export async function getWeatherDetails(city,aqi="no") {
    try {
        const apiKey = process.env.OPENWEATHER_API_KEY;
        const response = await axios.get(
            `http://api.weatherapi.com/v1/current.json?key=${process.env.WEATHER_API_KEY}&q=${city}&aqi=${aqi}`
        );

        const weather = response.data.current.condition.text;
        const temp = response.data.current.temp_c;

        if(aqi=="yes"){
            const aqi = calculateAQI(response.data.current.air_quality);
            return `The weather in ${city} is ${weather}, ${temp}°C and AQI is ${aqi}.`;
        }
        return `The weather in ${city} is ${weather}, ${temp}°C.`;
        
    } catch (error) {
        return `Sorry, I couldn't fetch weather details for ${city}.`;
    }
}

function calculateAQI(data) {
    const breakpoints = {
        pm25: [
            { bpLow: 0.0, bpHigh: 12.0, iLow: 0, iHigh: 50 },
            { bpLow: 12.1, bpHigh: 35.4, iLow: 51, iHigh: 100 },
            { bpLow: 35.5, bpHigh: 55.4, iLow: 101, iHigh: 150 },
            { bpLow: 55.5, bpHigh: 150.4, iLow: 151, iHigh: 200 },
            { bpLow: 150.5, bpHigh: 250.4, iLow: 201, iHigh: 300 },
            { bpLow: 250.5, bpHigh: 500.4, iLow: 301, iHigh: 500 }
        ],
        pm10: [
            { bpLow: 0, bpHigh: 54, iLow: 0, iHigh: 50 },
            { bpLow: 55, bpHigh: 154, iLow: 51, iHigh: 100 },
            { bpLow: 155, bpHigh: 254, iLow: 101, iHigh: 150 },
            { bpLow: 255, bpHigh: 354, iLow: 151, iHigh: 200 },
            { bpLow: 355, bpHigh: 424, iLow: 201, iHigh: 300 },
            { bpLow: 425, bpHigh: 604, iLow: 301, iHigh: 500 }
        ]
    };

    function getSubIndex(conc, ranges) {
        for (let r of ranges) {
            if (conc >= r.bpLow && conc <= r.bpHigh) {
                return ((r.iHigh - r.iLow) / (r.bpHigh - r.bpLow)) *
                       (conc - r.bpLow) + r.iLow;
            }
        }
        return null;
    }

    // truncate per EPA rules
    const pm25 = Math.floor(data.pm2_5 * 10) / 10;  // 0.1 µg/m³
    const pm10 = Math.floor(data.pm10);             // whole µg/m³

    const pm25AQI = getSubIndex(pm25, breakpoints.pm25);
    const pm10AQI = getSubIndex(pm10, breakpoints.pm10);

    // Overall AQI = highest sub-index
    const aqiValues = [
        { pollutant: "PM2.5", aqi: pm25AQI },
        { pollutant: "PM10", aqi: pm10AQI }
    ];

    const overall = aqiValues.reduce((max, cur) => cur.aqi > max.aqi ? cur : max);

    return overall.aqi;
}


