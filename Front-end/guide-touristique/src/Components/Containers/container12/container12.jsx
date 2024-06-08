import React, { useState, useEffect } from 'react';
import './container12.css';
import { fetchetabData } from '../../../data/EtabData';

const Container12 = () => {
    const [establishments, setEstablishments] = useState([]);
    const [newEstablishment, setNewEstablishment] = useState({
        nom: '', description: '', adresse: '', telephone: '', email: '',
        horaires_ouverture: '', site_web: '', services_offerts: '',
        reseau_sociaux: '', latitude: '', longitude: '', rating: ''
    });
    const [editEstablishment, setEditEstablishment] = useState(null);

    useEffect(() => {
        fetchEstablishments();
    }, []);

    const fetchEstablishments = async () => {
        const response = await fetch('http://localhost:8080/eta/Etablissements');
        const data = await response.json();
        setEstablishments(data);
    };

    const handleAdd = async () => {
        const response = await fetch('http://localhost:8080/eta/Etablissement', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newEstablishment)
        });
        if (response.ok) {
            fetchEstablishments();
            setNewEstablishment({
                nom: '', description: '', adresse: '', telephone: '', email: '',
                horaires_ouverture: '', site_web: '', services_offerts: '',
                reseau_sociaux: '', latitude: '', longitude: '', rating: ''
            });
        }
    };

    const handleEdit = (etablissement) => {
        setEditEstablishment({ ...etablissement });
    };

    const handleUpdate = async () => {
        const response = await fetch(`http://localhost:8080/eta/Etablissement/${editEstablishment.etablissement_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editEstablishment)
        });
        if (response.ok) {
            fetchEstablishments();
            setEditEstablishment(null);
        }
    };

    const handleDelete = async (id) => {
        const response = await fetch(`http://localhost:8080/eta/Etablissement/${id}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            fetchEstablishments();
        }
    };

    return (
        <div>

            <h1>Gérer les établissements</h1>

            <div>
                <h2>Ajouter un établissement</h2>
                <input
                    type="text"
                    placeholder="Nom"
                    value={newEstablishment.nom}
                    onChange={(e) => setNewEstablishment({ ...newEstablishment, nom: e.target.value })}
                />
                {/* Ajoutez les autres champs ici */}
                <button onClick={handleAdd}>Ajouter</button>
            </div>

            <div>
                <h2>Liste des établissements</h2>
                {establishments.map((etablissement) => (
                    <div key={etablissement.etablissement_id}>
                        {editEstablishment && editEstablishment.etablissement_id === etablissement.etablissement_id ? (
                            <div>
                                {/* Champ d'édition à ajouter ici */}
                                <button onClick={handleUpdate}>Mettre à jour</button>
                                <button onClick={() => setEditEstablishment(null)}>Annuler</button>
                            </div>
                        ) : (
                            <div>
                                <span>{etablissement.nom} ({etablissement.description})</span>
                                <button onClick={() => handleEdit(etablissement)}>Modifier</button>
                                <button onClick={() => handleDelete(etablissement.etablissement_id)}>Supprimer</button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Container12;
