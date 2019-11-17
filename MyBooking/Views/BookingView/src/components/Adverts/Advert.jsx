import React from 'react';
import './Adverts.css';

const Advert = props => {
    const { advert } = props;
    return (
        <div className="advert">
            <img src={advert.photo} alt="Advert photo"/>
            <p>{advert.name}</p>
            <p>{advert.address}</p>
        </div>
    );
};

export default Advert;