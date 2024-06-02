import { fetchetabData } from './EtabData'; 

export const fetchHotelData = async () => {
    try {
        const etabData = await fetchetabData();
        const hotelData = etabData.filter(etab => etab.type === 'hotel');
        return hotelData;
    } catch (error) {
        console.error("Error fetching hotel data:", error);
        return [];
    }
};
