import axios from "axios";
import { API_CONFIG } from "../../config";
import { GetCurrentWeatherParams, GetCurrentWeatherResponse } from "../../types/dto/open-weather/weatherType";
import queryString from 'query-string';

const weatherApi = {
    currentWeather: `${API_CONFIG.OPEN_WEATHER_MAP_API}/weather`
}

export const getCurrentWeatherApi = async (params: GetCurrentWeatherParams): Promise<GetCurrentWeatherResponse> => {
    try {

        const apiKey = API_CONFIG.OPEN_WEATHER_MAP_API_KEY;

        const searchParams = queryString.stringify({
            ...params,
            appid: apiKey,
        });

        const response = await axios.get<GetCurrentWeatherResponse>(`${weatherApi.currentWeather}?${searchParams}`);

        return response.data;

    }
    catch (error) {
        console.error("Get Current Weather Error:", error);
        throw error;
    }
}