import { fetchetabData } from './EtabData'; 

export const fetchHotelData = async (type) => {
    try {
        const etabData = await fetchetabData();
        const filteredData = etabData.filter(etab => etab.type === type);
        return filteredData;
    } catch (error) {
        console.error("Error fetching data:", error);
        return [];
    }
};
