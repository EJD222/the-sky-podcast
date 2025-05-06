import { WeatherData } from "../types/weather";

export const getWeather = async (city: string): Promise<WeatherData> => {
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`

    try {
        const response = await fetch(url)
        const data = await response.json()

        if (!data || data.length === 0) {
            throw new Error('No weather data found.');
        } else {
            return data as WeatherData
        }

    } catch (error) {
        console.log(error)
        throw new Error('Oh no! An error occurred. Please try again.')
    }
}