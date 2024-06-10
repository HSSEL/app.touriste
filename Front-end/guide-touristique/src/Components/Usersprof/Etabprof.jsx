import './Etabprof.css'
import { useLocation, useNavigate } from 'react-router-dom';
import { fetchetabData } from '../../data/EtabData';
import { fetchPostData } from '../../data/postData';
import { useState, useEffect } from 'react';
import adress from '../../assets/info/adress.svg';
import phone from '../../assets/info/phone.svg';
import mail from '../../assets/info/mail.svg';
import website from '../../assets/info/website.svg';
import time from '../../assets/info/time.svg';
import MapComponent from '../../Map/Map';

const Etabprof = () => {

    const location = useLocation();
    const { state } = location;

    const etablissement_id = state ?.userId || 3 ;

    const [ etab, setEtab] = useState(null);
    const [postData, setPostData] = useState([]);

    useEffect(() => {
        const getEtab = async () => {
          try {
            const data = await fetchetabData();
            const filteredData = data.filter(etab => etab.etablissement_id === etablissement_id);
            if (filteredData.length > 0) {
              setEtab(filteredData[0]);
            }
          } catch (error) {
            console.error('Error fetching etab data:', error);
          }
        };
    
        getEtab();
        }, [etablissement_id]);
    
    
    useEffect(() => {
        const getPostData = async () => {
        try {
            const data = await fetchPostData();
            const filteredData = data.filter(post => post.etablissement_id === etablissement_id);
            if (filteredData.length > 0) {
            setPostData(filteredData);
            }
        } catch (error) {
            console.error('Error fetching post data:', error);
        }
        };
        getPostData();
    }, [etablissement_id]);


    return (
        <div className='Etabprof01'>
            {etab ? (
                <div>
                <div className='Etabprof02'>
                    <img className="Etabprof03" src={`http://localhost:8080/eta/EtablissementImage/${etab.etablissement_id}`} alt=''/>
                    <div className='Etabprof05'>
                    <h2>{etab.nom}</h2>
                    <h3>{etab.description}</h3>

                    {/* hada dyal les infos */}
                    <div className='Etabprof04'>
                    <div className='oneetabinfo'>
                        <img src={adress} alt='' />
                        <h5>{etab.adresse}</h5>
                    </div>

                    <div className='oneetabinfo'>
                        <img src={phone} alt='' />
                        <h5>+ {etab.telephone}</h5>
                    </div>

                    <div className='oneetabinfo'>
                        <img src={mail} alt='' />
                        <h5>{etab.Email}</h5>
                    </div>

                    <div className='oneetabinfo'>
                        <img src={website} alt='' />
                        <h5>{etab.site_web}</h5>
                    </div>

                    <div className='oneetabinfo'>
                        <img src={time} alt='' />
                        <h5>{etab.horaires_ouverture}</h5>
                    </div>
                    </div>
                    </div>

                </div>
                {/* hada dyal les pubs */}
                <div className='Etabprof06'>
                    <h1>Nos publications</h1>
                <div className='Etabprof08'>
                    {postData.map(( data, index ) => (
                        
                        <div key={index} className='Etabprof07'>
                            <h4>{data.objet}</h4>
                            <h5>{data.text}</h5>
                            <img src={`http://localhost:8080/pub/publicationImage/${data.id_publication}`} alt=''/>
                        </div>
                    ))}
                    </div>
                </div> 
                <div className='MAPETAB'>
                    <MapComponent latitude={etab.latitude} longitude={etab.longitude} />
                </div> 
                </div>) : ('loading...')}
        </div>
    );
};

export default Etabprof;
