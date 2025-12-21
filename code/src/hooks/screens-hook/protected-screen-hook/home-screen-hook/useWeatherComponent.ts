import { useEffect } from "react";
import useLocation from "../../../common-hook/location/useLocation"
import { useGetCurrentWeather } from "../../../api-hook/open-weather-map/useOpenWeatherMap";


const useWeatherComponent = () => {

    const {location} = useLocation();

    const getCurrentWeather = useGetCurrentWeather({
        lat: location?.coords.latitude,
        lon: location?.coords.longitude
    })

    useEffect(() => {
        if(location){
            getCurrentWeather.refetch();
        }
    }, [location, getCurrentWeather])
    

    return {
        location,
        weatherData: getCurrentWeather.data,
        isLoading: getCurrentWeather.isLoading,
        isError: getCurrentWeather.isError
    }
}

export default useWeatherComponent