import React, { useState } from 'react';
import axios from 'axios';
import './Newaccount.css'; 
import { useNavigate } from 'react-router-dom';

const NewAccountEta = () => {
    const navigate = useNavigate();
    const handleClicknew = () => {
        navigate("/logout")
    }

    const getVilleId = (nomVille) => {
        const villes = {
            "Rabat": 1,
            "Marrakech": 2,
            "Fes": 3,
            "Casablanca": 5,
            "Ouarzazate": 8,
            "Chefchaouen": 9,
            "Essaouira": 10,
            "El Jadida": 11,
            "Tetouan": 12,
            "Nador": 13,
            "Oujda": 14,
            "Safi": 15,
        };
        return villes[nomVille] || null; // Retourne null si la ville n'est pas trouvée
    };
    
    const [formData, setFormData] = useState({
        ville: '', // Utiliser ville au lieu de id_ville
        type: '',
        nom: '',
        description: '',
        adresse: '',
        telephone: '',
        horaires_ouverture: '',
        site_web: '',
        services_offerts: '',
        reseau_sociaux: '',
        image: '',
        image2: '',
        image3: '',
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
    
    const handleVilleChange = (e) => {
        const selectedVille = e.target.value;
        const villeId = getVilleId(selectedVille);
        setFormData((prevFormData) => ({
            ...prevFormData,
            ville: selectedVille,
            id_ville: villeId, // Assurez-vous de mettre à jour id_ville
        }));
    };

    const handleImageChange = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            image: e.target.files[0],
        }));
    };
    const handleImage2Change = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            image2: e.target.files[0],
        }));
    };
    
    const handleImage3Change = (e) => {
        setFormData((prevFormData) => ({
            ...prevFormData,
            image3: e.target.files[0],
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
                    <select
                        name="ville"
                        value={formData.ville}
                        onChange={handleVilleChange}
                    >
                        <option value="">Sélectionner une ville</option>
                        <option value="Rabat">Rabat</option>
                        <option value="Marrakech">Marrakech</option>
                        <option value="Fes">Fes</option>
                        <option value="Casablanca">Casablanca</option>
                        <option value="Ouarzazate">Ouarzazate</option>
                        <option value="Chefchaouen">Chefchaouen</option>
                        <option value="Essaouira">Essaouira</option>
                        <option value="El Jadida">El Jadida</option>
                        <option value="Tetouan">Tetouan</option>
                        <option value="Nador">Nador</option>
                        <option value="Oujda">Oujda</option>
                        <option value="Safi">Safi</option>
                    </select>
                    
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleInputChange}
                    >
                        <option value="">Sélectionner un type</option>
                        <option value="restaurant">Restaurant</option>
                        <option value="cinema">Cinéma</option>
                        <option value="hotel">Hôtel</option>
                        <option value="musee">Musée</option>
                        <option value="jardin">Jardin</option>
                        <option value="hopital">Hôpital</option>
                        <option value="mall">Mall</option>
                        <option value="banque">Banque</option>
                        <option value="pharmacie">Pharmacie</option>
                        <option value="mosquee">Mosquée</option>
                        <option value="bibliotheque">Bibliothèque</option>
                        <option value="plage">Plage</option>
                    </select>
                    
                    <input
                        type="text"
                        name="nom"
                        placeholder="Nom"
                        value={formData.nom}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="description"
                        placeholder="Description"
                        value={formData.description}
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
                        placeholder="Téléphone"
                        value={formData.telephone}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="horaires_ouverture"
                        placeholder="Horaires d'ouverture"
                        value={formData.horaires_ouverture}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="site_web"
                        placeholder="Site web"
                        value={formData.site_web}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="services_offerts"
                        placeholder="Services offerts"
                        value={formData.services_offerts}
                        onChange={handleInputChange}
                    />
                    <input
                        type="text"
                        name="reseau_sociaux"
                        placeholder="Réseau sociaux"
                        value={formData.reseau_sociaux}
                        onChange={handleInputChange}
                    />
                    
                    <input
                        type="file"
                        accept="image/*"
                        name="image"
                        onChange={handleImageChange}
                    />
                    
                    <input
                        type="file"
                        accept="image/*"
                        name="image2"
                        onChange={handleImage2Change}
                    />

                    <input
                        type="file"
                        accept="image/*"
                        name="image3"
                        onChange={handleImage3Change}
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
                    <h4>Vous avez déjà un compte? <a onClick={handleClicknew} style={{ cursor: 'pointer' }}>Connectez-vous!</a></h4>
               </form>
            </div>
        </div>
    );
};

export default NewAccountEta;
