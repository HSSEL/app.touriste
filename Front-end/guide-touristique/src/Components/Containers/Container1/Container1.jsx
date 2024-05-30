import './Container1.css'
/* import etabData from '../../../data/etabData'*/

import search from '../../../assets/search.svg'
import { useState } from 'react';



const Container1 = () => {
    
    const [Search, setSearch] = useState('');  

    return (
        <div>
            <div className="container" id="container1">

                <div className='searchbar'>
                    <img src={search} alt=''/>
                    <input 
                    onChange={(e) => setSearch(e.target.value)} type="text" placeholder="Chercher un etablissement"/>

                </div>

                {/* <div className='etabs'>
                    {etabData.filter((data) => {
                    return Search.toLowerCase() === '' ? data : data.nom.toLowerCase().includes(Search);
                    }).map((data, index) => (
                    <div key={index} className='etab'>
                        <img src={data.img} alt=''/>
                        <h5>{data.nom}</h5>
                    </div>
                    ))}
                </div> */}
            </div>
        </div>
    );
};

export default Container1;
