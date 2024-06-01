import axios from "axios";

export const fetchtouristebData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/tou/touristes');
      return response.data;
    } catch (error) {
      console.error("Error fetching etablissement:", error);
      return [];
    }
  };