// postData.js
import axios from 'axios';
import CIH02 from '../assets/post/CIH/CIH02.jpg';
import CIH03 from '../assets/post/CIH/CIH03.jpg';
import CIH04 from '../assets/post/CIH/CIH04.jpg';
import CIH01 from '../assets/post/CIH/CIH01.png';

export const staticPostData = [
    { img1: CIH01, nom: "CIH BANK", image: CIH04, text: "L’inscription salate ! 🏁64 fer9a dial 5 personnes, tsejlou f la plateforme w aycharkou bach ireb7ou voyage l Valorant Champions f Séoul Teb3ouhoum fla chaîne Twitch de CIH Bank. Let’s go ! 👇🏻 https://bit.ly/49TmZnw"},
    { img1: CIH01, nom: "CIH BANK", image: CIH03, text: "Teb3ou le show dyal la finale de Valorant Gaming Cup sur la chaîne Twitch dyal CIH Bank"},
    { img1: CIH01, nom: "CIH BANK", image: CIH02, text: "بنك CIH يتمنى لكم جمعة مباركة"},    
];

export const fetchPostData = async () => {
  try {
    const response = await axios.get('http://localhost:8080/pub/Publications');
    return response.data;
  } catch (error) {
    console.error("Error fetching publications:", error);
    return [];
  }
};
