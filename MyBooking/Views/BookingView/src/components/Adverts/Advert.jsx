import React from 'react';
import './Adverts.css';

const Advert = props => {
    const { advert } = props;
    return (
        <div className="advert">
            <img src={advert.photo} alt="Advert"/>
            <p>{advert.name}</p>
            <p>{advert.address}</p>
        </div>
    );
};

export default Advert;