import './Container2.css';
import { staticPostData, fetchPostData } from '../../../data/postData';
import { fetchetabData } from '../../../data/EtabData';
import like from '../../../assets/Options/like.svg';
import like1 from '../../../assets/Options/like1.svg';
import comment from '../../../assets/Options/comment.svg';
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Container2 = ({ filterEtab }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;
  useEffect(() => {
    if (state) {
        console.log('Received state in container2:', state);
    }
}, [state]);

  const handleCommentClick = (publication) => {
    navigate('/comment', { state: {
                                ...location.state,
                                id_publication: publication.id_publication } });
  };

  const handleetabClick = (publication) => {
    navigate('/etab', { state: {
                          ...location.state,
                          etablissement_id: publication.etablissement_id } });
  };

  const [postData, setPostData] = useState(staticPostData);
  const [etabData, setEtabData] = useState([]);

  useEffect(() => {
    const getPostData = async () => {
      const postData = await fetchPostData();
      if (postData.length > 0) {
        setPostData(postData);
      }
    };

    getPostData();
  }, []);

  useEffect(() => {
    const getEtabData = async () => {
      const etabData = await fetchetabData();
      if (etabData.length > 0) {
        setEtabData(etabData);
      }
    };

    getEtabData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleLikeClick = async (publication) => {
    try {
      const response = await fetch(`http://localhost:8080/pub/publication/${publication.id_publication}/coeur`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ coeur: !publication.coeur })
      });
      if (response.ok) {
        setPostData(prevPostData => 
          prevPostData.map(post =>
            post.id_publication === publication.id_publication ? { ...post, coeur: !post.coeur } : post
          )
        );
      } else {
        console.error('Failed to update like status');
      }
    } catch (error) {
      console.error('Failed to update like status:', error);
    }
  };

  return (
    <div>
      <div className="container" id="container2">
        <div className='posts'>
          {postData
            .filter(data => {
              const etab = etabData.find(etab => etab.etablissement_id === data.etablissement_id);
              return !filterEtab || (etab && etab.nom === filterEtab);
            })
            .map((data, index) => {
              const etab = etabData.find(etab => etab.etablissement_id === data.etablissement_id);
              return (
                <div key={index} className='post'>
                  {etab && (
                    <>
                      <div className='postname'>
                        <img onClick={() => handleetabClick(data)} className='pdp' src={`http://localhost:8080/eta/EtablissementImage/${data.etablissement_id}`} alt={`${etab.nom} profile`} />
                        <div className='postname01'>
                          <h2 onClick={() => handleetabClick(data)}>{etab.nom}</h2>
                          <h6>{formatDate(data.date)}</h6>
                        </div>
                      </div>
                      <div className='postdes'>
                        <h5>{data.text}</h5>
                      </div>
                      <div className='postimg'>
                        <img src={`http://localhost:8080/pub/publicationImage/${data.id_publication}`} alt='Post image' />
                      </div>
                      <div className='LCM'>
                        <div className='LC'>
                          <img
                            src={data.coeur ? like1 : like}
                            alt='Like icon'
                            onClick={() => handleLikeClick(data)}
                            style={{ cursor: 'pointer' }}
                          />
                          <img src={comment} alt='Comment icon' onClick={() => handleCommentClick(data)} />
                        </div>
                        <div className='moreinfo'>
                          <h5 onClick={() => handleetabClick(data)}>More info</h5>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Container2;
