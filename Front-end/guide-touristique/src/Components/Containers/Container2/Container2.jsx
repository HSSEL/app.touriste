import './Container2.css';
import { staticPostData, fetchPostData } from '../../../data/postData';
import { fetchetabData } from '../../../data/EtabData';
import like from '../../../assets/Options/like.svg';
import comment from '../../../assets/Options/comment.svg';
import React, { useEffect, useState } from 'react';

const Container2 = ({ filterEtab }) => {
  // const navigate = useNavigate();

  // const handleIconClicketab = (nom) => {
  //   navigate('/etabmoreinfo', { state: { nom, filterEtab: nom } });
  // };

  const [postData, setPostData] = useState(staticPostData);
  const [etabData, setEtabData] = useState([]);

  useEffect(() => {
    const getPostData = async () => {
      const postData = await fetchPostData(); 
      console.log('Fetched post data:', postData); 
      if (postData.length > 0) {
        setPostData(postData);
      }
    };

    getPostData();
  }, []);
  
  useEffect(() => {
    const getEtabData = async () => {
      const etabData = await fetchetabData(); 
      console.log('Fetched etab data:', etabData); 
      if (etabData.length > 0) {
        setEtabData(etabData);
      }
    };

    getEtabData();
  }, []);
 
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
                        <img className='pdp' src={`http://localhost:8080/eta/EtablissementImage/${data.etablissement_id}`} alt={`${etab.nom} profile`} />
                        <h2>{etab.nom}</h2>
                      </div>
                      <div className='postdes'>
                        <h5>{data.text}</h5>
                      </div>
                      <div className='postimg'>
                        <img src={`http://localhost:8080/pub/publicationImage/${data.id_publication}`} alt='Post image' />
                      </div>
                      <div className='LCM'>
                        <div className='LC'>
                          <img src={like} alt='Like icon' />
                          <img src={comment} alt='Comment icon' />
                        </div>
                        <div className='moreinfo'>
                          <h5>More info</h5>
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
