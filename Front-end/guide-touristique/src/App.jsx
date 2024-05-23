import React, { useEffect, useState } from 'react';
import { getPublications } from '../../../mysql/controllers/publicationController';

const App = () => {
    const [publications, setPublications] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPublications = async () => {
            try {
                const data = await getPublications();
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
            <h1>Publications</h1>
            <ul>
                {publications.map((publication) => (
                    <li key={publication.id}>
                        {publication.title} - {publication.author}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
