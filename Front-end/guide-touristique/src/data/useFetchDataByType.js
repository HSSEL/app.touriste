import { useState, useEffect } from 'react';
import { fetchHotelData } from './HotelData';

const useFetchDataByType = (type) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await fetchHotelData(type);
                setData(result);
            } catch (err) {
                setError(err);
                console.error("Error fetching data:", err);
            }
        };

        if (type) {
            fetchData();
        }
    }, [type]);

    return { data, error };
};

export default useFetchDataByType;
