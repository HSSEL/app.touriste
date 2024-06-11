// HADA DYAL TYPE ETAB

import './Container1.css';
import types_etab_data from '../../../data/types_etab_data.js';
import search from '../../../assets/search.svg';
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Container1 = () => {
    const [Search, setSearch] = useState(''); // initialisina search
    const navigate = useNavigate();  // hadi hya li kat5elina nmchiw mn page l page u5ra
    const location = useLocation();  // hadi hya li kat5ellina nduwzu chi valeur mn page l page

    // definition dyal l'action fach ghadi nclickiw 3lih
    const handleetab = (etab) => {
        navigate('/etabs', { state: {...location.state , nom: etab.nom } });
    };

    return (
        <div>
            <div className="container01">
                <div className='searchbar'>
                    <img src={search} alt='' />
                    <input 
                        onChange={(e) => setSearch(e.target.value.toLowerCase())} 
                        type="text" 
                        placeholder="Chercher un etablissement"
                    />
                </div>
                <div className='etabscn1'>
                    {/* hada kay5rejlina ga3 les types de data li 3endna fdata file 
                    filter 3la wed ila ktebna chi 7aja fsearch kayfiltri lina dik data sinon ila maktebna walu kaytele3 lina kulchy*/}
                    {types_etab_data.filter((data) => {
                        return Search === '' ? data : data.nom.toLowerCase().includes(Search);
                    }).map((data, index) => (
                        <div key={index} className='etabcn1'>
                            <div className='etabimgcn1'>
                                <img src={data.img} onClick={() => handleetab(data)} alt='' />
                            </div>
                            <h5>{data.nom}</h5>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Container1;
