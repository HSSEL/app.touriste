import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { fetchPostData } from '../../../data/postData';
import './Posts.css'

const Posts = () => {

    const [ posts, setposts ] = useState([]);
    const [ etab, setetab ] = useState([]);

    
    useEffect(() => {
        const getposts = async () => {
        try {
            const data = await fetchPostData();
            console.log('Fetched posts data:', data);
            if (Array.isArray(data) && data.length > 0) {
            setposts(data);
            }
        } catch (error) {
            console.error('Error fetching etab data:', error);
        }
        };

        getposts();
    }, []);

    
    useEffect(() => {
        const getetab = async () => {
        try {
            const data = await fetchetabData();
            console.log('Fetched etab data:', data);
            if (Array.isArray(data) && data.length > 0) {
            setetab(data);
            }
        } catch (error) {
            console.error('Error fetching etab data:', error);
        }
        };

        getetab();
    }, []);


    return (
        <div className='pst01'>
            {/* hada kay5erej ga3 les publications */}
            <div className='pst02'>
                <div className='pst03'>
                    <h2>Tous les publications</h2>
                    <button>Voir tous</button>
                </div>
                <div className='pst04'>
                    {posts.map(( data, index) => (
                        <div key={index} className='pst05'>
                            <h2>{data.objet}</h2>
                            <h3>{data.text}</h3>
                            <img src={`http://localhost:8080/pub/publicationImage/${data.id_publication}`} alt=''/>
                        </div>
                    ))}
                </div>
            </div>
            {/* hada dyal ga3 les offres */}
            <div className='pst06'>
                <div className='pst07'>
                    <h2>Tous les offres</h2>
                    <button>Voir tous</button>
                </div>
                <div className='pst07'>
                    <h2>Tous les villes de SARINI</h2>
                    <button>Voir tous</button>
                </div>
            </div>
        </div>
    );
};

export default Posts;
