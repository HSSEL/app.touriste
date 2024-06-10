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
        const { name, value, type, checked } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleImageChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Vérification des champs obligatoires
        for (const key in formData) {
            if (formData[key] === '' && key !== 'image') {
                alert(`Le champ ${key} est obligatoire.`);
                return;
            }
        }
    
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
    
        try {
            console.log('Sending formData:', formData);
            const response = await axios.post('http://localhost:8080/aut/register', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('User registered:', response.data);
            setMessage(response.data.message || 'Inscription réussie !');
        } catch (error) {
            console.error('Error registering user:', error);
            setMessage(error.response?.data?.message || 'Erreur lors de l\'inscription.');
        }
    };
    

    return (
        <div className='new'>
        <div className="touriste-form">
            <h2>Je suis un touriste</h2>
            <form classname='form01' onSubmit={handleSubmit}>
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
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleImageChange}
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
                    <button type="submit">Créer un compte</button>
                    <h4>Vous avez déjà un compte? <a onClick={handleClicknew} style={{ cursor: 'pointer' }}>Connectez vous!</a></h4>
               </form>
            </div>
        </div>
    );
};


export default Newaccount;

/*
import React, { useState } from 'react';
import axios from 'axios';

import { useNavigate } from 'react-router-dom';

const NewAccountEta = () => {
    const navigate = useNavigate();
    const handleClicknew = () => {
        navigate("/logout")
    }
    const [formData, setFormData] = useState({
        Ville: '',
        type: '',
        nom: '',
        description: '',
        adresse : '',
        telephone: '',
        Email : '',
        horaires_ouverture: '',
        site_web : '',
        services_offerts : '',
        reseau_sociaux  : '',
        image : '',
        image2  : '',
        image3 : ''
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleImageChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            image: e.target.files[0],
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Vérification des champs obligatoires
        for (const key in formData) {
            if (formData[key] === '' && key !== 'image') {
                alert(`Le champ ${key} est obligatoire.`);
                return;
            }
        }
    
        const data = new FormData();
        for (const key in formData) {
            data.append(key, formData[key]);
        }
    
        try {
            console.log('Sending formData:', formData);
            const response = await axios.post('http://localhost:8080/aut/registerEtablissement', data, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('User registered:', response.data);
            setMessage(response.data.message || 'Inscription réussie !');
        } catch (error) {
            console.error('Error registering user:', error);
            setMessage(error.response?.data?.message || 'Erreur lors de l\'inscription.');
        }
    };
    

    return (
        <div className='new'>
        <div className="touriste-form">
            <h2>Créer un compte</h2>
            <form classname='form01' onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="Ville"
                        placeholder="Ville"
                        value={formData.Ville}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="type"
                        placeholder="type"
                        value={formData.type}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="nom"
                        placeholder="nom"
                        value={formData.nom}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="description"
                        value={formData.description}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="adresse"
                        placeholder="adresse"
                        value={formData.adresse}
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
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleImageChange}
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
                    <button type="submit">Créer un compte</button>
                    <h4>Vous avez déjà un compte? <a onClick={handleClicknew} style={{ cursor: 'pointer' }}>Connectez vous!</a></h4>
               </form>
            </div>
        </div>
    );
};

export default NewAccountEta;
*/

