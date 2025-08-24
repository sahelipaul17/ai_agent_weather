import Groq from 'groq-sdk';
import dotenv from "dotenv";
dotenv.config();

import { getWeatherDetails } from "./toolFunction.js";



const model = new Groq({
    apiKey: process.env.API_KEY,
    model: process.env.MODEL,
});

export const systemPrompt = `You are an AI Assistant that helps users get weather and air quality information.
Follow this process: start → plan (tools) → action (use tools) → observe → think → final response.`;


export const tools = [
    // name: "Weather Agent",
    // description: "Helps users get weather information.",
    // tools: [{
    {
        type: "function",
        function: {
            description: "Get weather details for a specific city.",
            name: "getWeatherDetails",
            parameters: {
                type: "object",
                properties: {
                    city: {
                        type: "string",
                        description: "The name of the city.",
                    },
                    aqi: {
                        type: "string",
                        description: "yes or no.",
                    },
                },
                required: ["city"],
            }
        }
    }
]
// ],
// };
export default model;

//tools
// function getWeatherDetails(city) {
//     const weatherData = {
//         "Delhi": "Sunny- 25°C",
//         "Mumbai": "Rainy- 22°C",
//         "Bangalore": "Cloudy- 28°C",
//         "Hyderabad": "Sunny- 26°C",
//         "Chennai": "Sunny- 24°C",
//         "Kolkata": "Rainy- 23°C",
//         "Ahmedabad": "Cloudy- 27°C",
//         "Surat": "Sunny- 25°C",
//         "Visakhapatnam": "Rainy- 22°C",
//         "Indore": "Cloudy- 28°C",
//         "Lucknow": "Sunny- 26°C",
//         "Jaipur": "Rainy- 24°C",
//         "Pune": "Cloudy- 27°C",
//         "Patna": "Sunny- 25°C",
//         "Coimbatore": "Rainy- 22°C"
//     };
//     if (!weatherData[city]) {
//         return `I don't know about the weather in ${city}.`;
//     }
//     return `The weather in ${city} is ${weatherData[city]}`;
// }