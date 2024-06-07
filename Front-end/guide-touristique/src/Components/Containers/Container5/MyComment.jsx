import './Container5.css';
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Mycomment = () => {
    const location = useLocation();
    const { id_publication } = location.state;

    const [comment, setComment] = useState('');

    const handleInputChange = (e) => {
        setComment(e.target.value);
    };

    

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const id_touriste = 1;
            const Texte = comment;
            const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' '); 
            const image = '';

            const response = await axios.post('http://localhost:8080/compu/commentspublication', {
                id_touriste,
                Texte,
                Date: currentDate,
                image,
                id_publication,
            });

            if (response.status === 201) {
                alert('Comment added successfully');
                setComment('');
                navigate('/comment', { state: { id_publication: id_publication} });
            }
        } catch (error) {
            console.error('Error adding comment:', error);
        }
    };

    return (
        <div className='mycomment'>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    name="mycomment0"
                    placeholder="Ajouter un commentaire..."
                    value={comment}
                    onChange={handleInputChange}
                />
                <button type="submit">Ajouter</button>
            </form>
        </div>
    );
};

export default Mycomment;
