import React, { useState } from 'react';
import axios from 'axios';
import './Newaccount.css';
import { useNavigate } from 'react-router-dom';

const Newaccount = () => {
    const navigate = useNavigate();
    const handleClicknew = () => {
        navigate("/logout")
    }
    const [formData, setFormData] = useState({
        Nom: '',
        Prenom: '',
        adresse: '',
        telephone: '',
        localisation: '',
        villeVisite: '',
        image: '',
        password: '',
        email: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/tou/Touriste', formData);
            if (response.status === 201) {
                alert('Touriste created successfully');
                setFormData({
                    Nom: '',
                    Prenom: '',
                    adresse: '',
                    telephone: '',
                    localisation: '',
                    villeVisite: '',
                    image: '',
                    password: '',
                    email: ''
                });
            }
        } catch (error) {
            console.error('Error creating touriste:', error);
            alert('Failed to create touriste. Please try again.');
        }
    };

    return (
        <div className='new'>
        <div className="touriste-form">
            <h2>Créer un compte</h2>
            <form classname='form01' onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    name="Nom"
                    placeholder="Nom"
                    value={formData.Nom}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="Prenom"
                    placeholder="Prenom"
                    value={formData.Prenom}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="adresse"
                    placeholder="Adresse"
                    value={formData.adresse}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="telephone"
                    placeholder="Telephone"
                    value={formData.telephone}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="localisation"
                    placeholder="Localisation"
                    value={formData.localisation}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="villeVisite"
                    placeholder="Ville Visite"
                    value={formData.villeVisite}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="image"
                    placeholder="Image URL"
                    value={formData.image}
                    onChange={handleInputChange}
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleInputChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                />
                <button type="submit">Creer un compte</button>
                <h4>Vous avez déjà un compte?<a onClick={handleClicknew}>Connectez vous!</a></h4>
            </form>
        </div>
        </div>
    );
};

export default Newaccount;
