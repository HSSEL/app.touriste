import './Container2.css';
import postData1 from '../../../data/postData';
import like from '../../../assets/Options/like.svg';
import comment from '../../../assets/Options/comment.svg';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Container2 = ({ filterEtab }) => {
  {/*const navigate = useNavigate();

  const handleIconClicketab = (nom) => {
    navigate('/etabmoreinfo', { state: { nom, filterEtab: nom } });
  };*/}

  const [postData, setPostData] = useState(postData1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/pub/Publications'); 
        setPostData(response.data);
      } catch (error) {
        console.error("Error fetching publications:", error);
      }
    };

    fetchData();
  }, []);
 

  return (
    <div>
      <div className="container" id="container2">
        <div className='posts'>
          {postData
            .filter(data => !filterEtab || data.nom === filterEtab)
            .map((data, index) => (
              <div key={index} className='post'>
                <div className='postname'>
                  <img className='pdp' src={data.img1} alt='' />
                  <h2>
                      {data.nom}
                  </h2>
                </div>

                <div className='postdes'>
                  <h5>
                      {data.desc}
                  </h5>
                </div>

                <div className='postimg'>
                  <img src={data.img2} alt='' />
                </div>

                <div className='LCM'>
                  <div className='LC'>
                    <img src={like} alt='' />
                    <img src={comment} alt='' />
                  </div>

                  <div className='moreinfo'>
                    <h5>
                        More info
                      
                    </h5>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Container2;
