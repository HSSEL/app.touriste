import React, { useEffect, useState } from 'react'; // Importation des fonctions React nécessaires pour définir les composants fonctionnels et pour gérer les effets de bord.

import { BrowserRouter, Routes, Route } from "react-router-dom"; // Importation des composants nécessaires pour la gestion des routes dans l'application à l'aide de React Router.

// Importations des différents composants de pages utilisés dans l'application.
import Home from './Pages/Home';
import Comment from './Pages/Comment';
import Etabs from './Pages/Etabs';
import Services from './Pages/Services';
import Etabviewmore from './Pages/Etabviewmore';
import Villes from './Pages/Villes';
import Ville from './Pages/Ville';
import Reetab from './Pages/Reetab';
import Reserver from './Pages/Reserver';
import Logout from './Pages/Logout';
import New from './Pages/New';
import TouristesPage from './Pages/Admin/Touristes';
import Admin from './Pages/Admin/Admin';
import EtabPage from './Pages/Admin/Etablissement';
import Villesadmin from './Pages/Admin/Villesadm';
import PubAdmin from './Pages/Admin/PubAdmin';
import UserTouriste from './Pages/Users/UserTouriste';
import UserEtab from './Pages/Users/UserEtab';
import ContactForm from './Pages/ContactForm';
import Ajouterpub from './Pages/Users/Ajouterpub';

const App = () => { // Déclaration du composant principal de l'application, nommé `App`, en tant que fonction fléchée.

    const [publications, setPublications] = useState([]); // Déclaration de l'état `publications` à l'aide du Hook `useState`, qui stockera les données des publications récupérées depuis l'API.
    const [loading, setLoading] = useState(true); // Déclaration de l'état `loading` à l'aide du Hook `useState`, qui indiquera si les données sont en cours de chargement.
    const [error, setError] = useState(null); // Déclaration de l'état `error` à l'aide du Hook `useState`, qui contiendra les erreurs éventuelles lors du chargement des données.

    useEffect(() => { // Utilisation du Hook `useEffect` pour effectuer une requête API lors du chargement initial du composant afin de récupérer les publications.
        const fetchPublications = async () => {
            try {
                const response = await fetch('http://localhost:8080/pub/Publications');
                const data = await response.json();
                setPublications(data);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchPublications();
    }, []);

    if (loading) { // Si l'application est en cours de chargement (`loading` est vrai), un message "Loading..." est affiché.
        return <div>Loading...</div>;
    }

    if (error) { // Si une erreur survient lors du chargement des données (`error` nul), un message d'erreur est affiché.
        return <div>Error: {error.message}</div>;
    }

    return (
        <div>
            {/* 
            <h1>Publications</h1>
            <ul>
                {publications.map((publication) => (
                    <li key={publication.id_publication}>
                        {publication.objet} - {publication.text}
                        <img src={`http://localhost:8080/pub/publicationImage/${publication.id_publication}`} alt={publication.objet} />
                    </li>
                ))}
            </ul>
            */}
            
            <BrowserRouter> 
                {/* //Mise en place du routage avec React Router à l'aide du composant `BrowserRouter` qui encapsule les routes de l'application */}
                <Routes>
                    {/* Définition des routes de l'application à l'aide du composant `Routes` et des composants `Route`. */}
                    <Route index element={<Home />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/comment" element={<Comment />} />
                    <Route path="/etabs" element={<Etabs />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/etab" element={<Etabviewmore />} />
                    <Route path="/villes" element={<Villes />} />
                    <Route path="/ville" element={<Ville />} />
                    <Route path="/reetab" element={<Reetab />} />
                    <Route path="/reserver" element={<Reserver />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/new" element={<New />} />
                    <Route path="/touristes" element={<TouristesPage />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/etablissements" element={<EtabPage />} />
                    <Route path="/villesadm" element={<Villesadmin />} />
                    <Route path="/pubadmin" element={<PubAdmin />} />
                    <Route path="/usertouriste" element={<UserTouriste />} />
                    <Route path="/useretab" element={<UserEtab />} />
                    <Route path="/ContactForm" element={<ContactForm />} />
                    <Route path="/ajouterpub" element={<Ajouterpub />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
};

export default App; // Exportation du composant `App` pour être utilisé dans d'autres parties de l'application.
