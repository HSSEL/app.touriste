/* hada dyal les chercher etab selon la ville */

import React, { useState, useEffect } from 'react';
import './Container10.css';
import { fetchetabData } from '../../../data/EtabData';
import searchIcon from '../../../assets/search.svg';
import { useNavigate , useLocation} from 'react-router-dom';

const Container10 = () => {
    const [etab, setEtab] = useState([]);
    const [search, setSearch] = useState(''); 
    const location = useLocation();
    const { state } = location;

    useEffect(() => {
        if (state) {
            console.log('Received hna hnaa spaaaaaaaaaaaaaaaaaaaaaaaamSS:', state);
        }
    }, [state]);


    useEffect(() => {
        const getEtabData = async () => {
            try {
                const data = await fetchetabData();
                if (Array.isArray(data) && data.length > 0) {
                    setEtab(data);
                }
            } catch (error) {
                console.error('Error fetching etab data:', error);
            }
        };
        getEtabData();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value.toLowerCase());
    };

    const navigate = useNavigate();
    const handleClickEtab = (etab) => {
        navigate('/etab', { state: { ...location.state, etablissement_id: etab.etablissement_id } });
    }

    return (
        <div className='container8'>
            <div className='search0'>
                <img src={searchIcon} alt='Search Icon' />
                <input 
                    onChange={handleSearchChange}
                    type="text" 
                    placeholder="Chercher un etablissement"
                />
            </div>
            
            <div className='cities'>
                {etab
                .filter((data) => {
                    return search === '' ? data : data.nom.toLowerCase().startsWith(search);
                })
                .map((data, index) => (
                    <div key={index} className='onecity'>
                        <h2>{data.nom}</h2>
                        <img 
                            src={`http://localhost:8080/eta/EtablissementImage/${data.etablissement_id}`}
                            alt={data.nom} 
                            onError={(e) => { e.target.src = '/path/to/placeholder_image.png'; }}
                        />
                        <button onClick={() => handleClickEtab(data)}>Visiter</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Container10;
