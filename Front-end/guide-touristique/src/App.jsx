import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Comment from './Pages/Comment'
import Etabs from './Pages/Etabs'
import Services from './Pages/Services'
import Etabviewmore from './Pages/Etabviewmore';
import Ville from './Pages/Ville';

const App = () => {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
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
            <Routes>
            <Route index element={<Home/>} />
            <Route path="/home" element={<Home/>} />
            <Route path="/comment" element={<Comment/>} />
            <Route path="/etabs" element={<Etabs/>} />
            <Route path="/services" element={<Services/>} />
            <Route path="/etab" element={<Etabviewmore/>} />
            <Route path="/ville" element={<Ville/>} />
            </Routes> 
            </BrowserRouter>
        </div>
    );
};

export default App;

