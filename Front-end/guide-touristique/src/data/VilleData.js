import axios from "axios";

export const fetchVilleData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/vi/villes');
      return response.data;
    } catch (error) {
      console.error("Error fetching etablissement:", error);
      return [];
    }
  };