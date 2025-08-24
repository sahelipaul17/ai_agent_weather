## 🌦️ Weather Assistant — AI Agent with Groq + Bun

This project is a Weather and Air Quality Assistant powered by Groq Cloud's openai/gpt-oss-120b model. The assistant can dynamically fetch weather and AQI (Air Quality Index) information for any city using an external API.

## 🧠 Features

Built using Groq SDK

Uses Tool calling to fetch weather data

Conversational CLI agent with real-time interaction

Weather + AQI support using weatherapi.com

Runs using Bun for ultra-fast performance

## 📁 Folder Structure
weather-assistant/
├── agent.js           # Defines the system prompt, tools, and exports Groq model
├── index.js           # Main CLI entry point with interaction loop
├── toolFunction.js    # Weather and AQI tool implementation using external API
├── .env               # API keys for Groq and WeatherAPI
├── jsconfig.json      # Module resolution configuration
├── README.md          # This file

## 🛠️ Setup Instructions
1. 🧱 Prerequisites

Bun

Groq Cloud account with API key

WeatherAPI.com account for weather + AQI data

2. 📦 Install Dependencies
bun install

3. 🔐 Environment Variables

Create a .env file at the root:

API_KEY=your_groq_api_key
MODEL=openai/gpt-oss-120b
WEATHER_API_KEY=your_weatherapi_key

## Run the Assistant
bun index.js


