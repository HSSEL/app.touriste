// HADA DYAL DEALS

import './Container3.css'

import dealsData from '../../../data/dealsData'

const Container3 = () => {
  
    
    return (
        <div>
            <div className="container" id="container3">
                <div className="hot-deals">
                    <h2>HOT DEALS!</h2>
                </div>
                <div className="scrolling-images">
                    {dealsData.map((data, index) => (
                        <div key={index} className="image-container">
                            <img src={data.img} alt=''/>
                        <div className="image-overlay">Check this out!</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Container3;
