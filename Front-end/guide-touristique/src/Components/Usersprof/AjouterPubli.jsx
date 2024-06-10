import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const AjouterPubli = () => {
    const location = useLocation();
    const { state } = location; 

    const [objet, setObjet] = useState('');
    const [text, setText] = useState('');
    const [image, setImage] = useState(null); // Changed to null to handle file uploads
    const type = "pub";
    const [date, setDate] = useState('');
    const etablissement_id = state ?.etablissement_id || 3;

    useEffect(() => {
        const currentDate = new Date().toISOString().split('T')[0];
        setDate(currentDate);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('objet', objet);
        formData.append('text', text);
        formData.append('image', image);
        formData.append('type', type);
        formData.append('date', date);
        formData.append('etablissement_id', etablissement_id);

        try {
            const response = await fetch('http://localhost:8080/pub/Publication', {
                method: 'POST',
                body: formData, 
                        });

            if (response.ok) {
                const publicationId = await response.json();
                console.log('Publication created with ID:', publicationId);
            } else {
                console.error('Failed to create publication');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {/* 
            <div>
                <label>Objet:</label>
                <input type="text" value={objet} onChange={(e) => setObjet(e.target.value)} required />
            </div>
            <div>
                <label>Text:</label>
                <textarea value={text} onChange={(e) => setText(e.target.value)} required />
            </div>
            <div>
                <label>Image:</label>
                <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
            </div>
            <button type="submit">Create Publication</button>
 */}        </form>
    );
};

export default AjouterPubli;
