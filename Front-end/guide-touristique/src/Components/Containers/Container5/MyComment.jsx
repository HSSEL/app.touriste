import './Container5.css';
import React, { useState , useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; 
import axios from 'axios';

const Mycomment = () => {
    const location = useLocation();
    const navigate = useNavigate();
  
    const { state } = location;
    const id = state ? state.userId : null;
    const id_publication = state ? state.id_publication : null;
   
    useEffect(() => {
      if (state) {
          console.log('Received state in container my comments:', state);
      }
  }, [state]);

    useEffect(() => {
        if (state) {
            console.log('Received state:', state);
        }
    }, [state]);

    const [comment, setComment] = useState('');

    const handleInputChange = (e) => {
        setComment(e.target.value);
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const id_touriste = id;
            const Texte = comment;
            const currentDate = new Date().toISOString().slice(0, 19).replace('T', ' '); 
            const image = '';

            const response = await axios.post('http://localhost:8080/compu/comment', {
                id_touriste,
                Texte,
                Date: currentDate,
                image,
                id_publication,
            });

            if (response.status === 201) {
                alert('Comment added successfully');
                setComment('');
                navigate('/comment', { state: { id_publication: id_publication, userId: id } });
            }
        } catch (error) {
            console.error('Error adding comment:', error);
            alert('Failed to add comment. Please try again.');
        }
    };

    return (
        <div className='mycomment'>
            <form className='form01' onSubmit={handleFormSubmit}>
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
