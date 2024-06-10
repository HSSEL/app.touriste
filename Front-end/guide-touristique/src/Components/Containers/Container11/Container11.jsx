/* hada dyal reserver */

import './Container11.css';
import React, { useState, useEffect } from 'react';
import { fetchetabData } from '../../../data/EtabData';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const Container11 = () => {
    const location = useLocation();
    const { etablissement_id } = location.state;
    const { userId } = location.state;
    const [etab, setEtab] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [nombrePersonne, setNombrePersonne] = useState('');
    const [dateDebut, setDateDebut] = useState('');
    const [dateFin, setDateFin] = useState('');

    useEffect(() => {
        const getEtabData = async () => {
            try {
                const data = await fetchetabData();
                const filteredData = data.find(item => item.etablissement_id === etablissement_id);
                if (filteredData) {
                    setEtab(filteredData);
                } else {
                    setError('Etablissement not found');
                }
            } catch (error) {
                console.error('Error fetching etab data:', error);
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };
        getEtabData();
    }, [etablissement_id]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        const reservationData = {
            id_touriste: userId,  
            etablissement_id: etablissement_id,
            dateReservation: new Date().toISOString().split('T')[0],
            debut_temp: `${dateDebut} 00:00:00`, 
            fin_temp: `${dateFin} 00:00:00`,     
            nombrePersonne: nombrePersonne
        };

        try {
            const response = await axios.post('http://localhost:8080/res/Reservation', reservationData);

            if (response.status === 201) {
                console.log('Reservation created successfully:', response.data);
                setNombrePersonne('');
                setDateDebut('');
                setDateFin('');
            } else {
                console.error('Failed to create reservation');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='container11'>
            {etab && (
                <div className='con11all'>
                    <div className='con11_01'>
                        <h1>{etab.nom}</h1>
                        <img className='con11_1' src={`http://localhost:8080/eta/etablissementImage/${etab.etablissement_id}`} alt='' />
                        <p>{etab.description}</p>
                        <img className='con11_2' src={`http://localhost:8080/eta/etablissementImage2/${etab.etablissement_id}`} alt='' />
                        <img className='con11_3' src={`http://localhost:8080/eta/etablissementImage3/${etab.etablissement_id}`} alt='' />
                    </div>

                    <div className='c11form'>
                        <form className="login1" onSubmit={handleSubmit}>
                            <h1>Reserver</h1>
                            <h5>Nombre de personnes</h5>
                            <input
                                type="number"
                                name="nombrePersonne"
                                placeholder="Entrer le nombre de personnes"
                                value={nombrePersonne}
                                onChange={(e) => setNombrePersonne(e.target.value)}
                                required
                            />
                            <h5>Date début</h5>
                            <input
                                type="date"
                                name="datedebut"
                                placeholder="Entrer la date de debut"
                                value={dateDebut}
                                onChange={(e) => setDateDebut(e.target.value)}
                                required
                            />
                            <h5>Date fin</h5>
                            <input
                                type="date"
                                name="datefin"
                                placeholder="Entrer la date de fin"
                                value={dateFin}
                                onChange={(e) => setDateFin(e.target.value)}
                                required
                            />
                            <div className='button_low'>
                                <button type="submit">Reserver</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Container11;
