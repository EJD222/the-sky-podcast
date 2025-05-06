import { LocationData } from "../types/location"

export const getLocations = async (city: string): Promise<LocationData[]> => {
    const limit = 5;
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY
    const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${apiKey}`

    try {
        const response = await fetch(url)
        const data = await response.json()

        if (!data || data.length === 0) {
            return []
        } else {
            const suggestedLocations = data.map((city: LocationData): LocationData => ({
                name: city.name,
                local_names: city.local_names ?? {},
                lat: city.lat,
                lon: city.lon,
                country: city.country,
                state: city.state ?? '',
            }))
            return suggestedLocations
        }
    } catch (error) {
        console.log(error)
        throw new Error('Oh no! An error occurred. Please try again.' + error)
    }
}