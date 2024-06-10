/* hada fih touristes kulum  */

import React, { useState, useEffect } from 'react';
import './Touristes.css';
import { fetchPostData } from '../../../data/postData';
import searchIcon from '../../../assets/search.svg';
import { Navigate, useNavigate } from 'react-router-dom';

const Publicationadmin = () => {
    const [post, setPost] = useState([]);
    const [search, setSearch] = useState(''); 

    useEffect(() => {
        const getPost = async () => {
            try {
                const data = await fetchPostData();
                if (Array.isArray(data) && data.length > 0) {
                    setPost(data);
                }
            } catch (error) {
                console.error('Error fetching ville data:', error);
            }
        };
        getPost();
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value.toLowerCase());
    };


    return (
        <div className='container8'>
            <div className='search0'>
                <img src={searchIcon} alt='Search Icon' />
                <input 
                    onChange={handleSearchChange}
                    type="text" 
                    placeholder="Chercher une publication par objet"
                />
            </div>
            <div className='cities'>
                {post
                .filter((data) => {
                    return search === '' ? data : data.objet.toLowerCase().startsWith(search);
                })
                .map((data, index) => (
                    <div key={index} className='onecity'>
                        <h2>{data.objet}</h2>
                        <img 
                            src={`http://localhost:8080/pub/publicationImage/${data.id_publication}`}
                            alt={data.objet}
                        />
                        <button>Voir</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Publicationadmin;
