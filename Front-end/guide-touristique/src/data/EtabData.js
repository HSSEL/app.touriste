import axios from "axios";

export const fetchetabData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/eta/etablissements');
      return response.data;
    } catch (error) {
      console.error("Error fetching etablissement:", error);
      return [];
    }
  };