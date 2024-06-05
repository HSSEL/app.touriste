import axios from "axios";

export const fetchcometabData = async () => {
    try {
      const response = await axios.get('http://localhost:8080/coeta/CommentsEtablissement');
      return response.data;
    } catch (error) {
      console.error("Error fetching comment etablissement:", error);
      return [];
    }
  };