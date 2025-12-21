import * as Location from 'expo-location';
import { useEffect, useState } from 'react';

const useLocation = () => {

    const [location, setLocation] = useState<Location.LocationObject>(undefined);


    useEffect(() => {
        const fetchLocation = async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') return;

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        };
        
        fetchLocation();
    }, [])

    return {
        location
    }
}

export default useLocation