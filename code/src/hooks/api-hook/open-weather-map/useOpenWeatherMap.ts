import { useQuery } from "@tanstack/react-query"
import { getCurrentWeatherApi } from "../../../api/open-weather-map/weatherApi"
import { GetCurrentWeatherParams, GetCurrentWeatherResponse } from "../../../types/dto/open-weather/weatherType"
import { NormalizedError } from "../../../utils/error"

export const useGetCurrentWeather = (params: GetCurrentWeatherParams) => {
    return useQuery<GetCurrentWeatherResponse, NormalizedError>({
        queryKey: ['getCurrentWeather', params],
        queryFn: () => {
            return getCurrentWeatherApi(params);
        },
        enabled: !!params.lat && !!params.lon,
    })
}