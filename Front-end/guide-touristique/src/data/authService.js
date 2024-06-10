
// services/authService.js
import axios from "axios";

export const login = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:8080/aut/auth', { email, password });
        return response.data;
    } catch (error) {
        console.error("Error fetching authentification:", error);
        throw new Error("Login failed");
    }
};
