import '../Container2/Container2.css';
import { staticPostData, fetchPostData } from '../../../data/postData';
import { fetchetabData } from '../../../data/EtabData';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const Container2 = ({ filterEtab }) => {
  const location = useLocation();
  const { id_publication } = location.state;

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

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
 
  return (
    <div>
      <div className="container" id="container2">
        <div className='posts'>
          {postData
            .filter(data => data.id_publication === id_publication) 
            .map((data, index) => {
              const etab = etabData.find(etab => etab.etablissement_id === data.etablissement_id);
              return (
                <div key={index} className='post'>
                  {etab && (
                    <>
                      <div className='postname'>
                        <img className='pdp' src={`http://localhost:8080/eta/EtablissementImage/${data.etablissement_id}`} alt={`${etab.nom} profile`} />
                        <div className='postname01'>
                            <h2>{etab.nom}</h2>
                            <h6>{formatDate(data.date)}</h6>
                        </div>
                      </div>
                      <div className='postdes'>
                        <h5>{data.text}</h5>
                      </div>
                      <div className='postimg'>
                        <img src={`http://localhost:8080/pub/publicationImage/${data.id_publication}`} alt='Post image' />
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
