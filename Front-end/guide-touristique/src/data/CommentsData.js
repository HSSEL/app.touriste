import axios from "axios";

export const fetchcomData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/coeta/CommentsEtablissement');
      return response.data;
    } catch (error) {
      console.error("Error fetching etablissement:", error);
      return [];
    }
  };