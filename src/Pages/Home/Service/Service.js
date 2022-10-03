import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Service.css'

const Service = ({ service }) => {
    const { name, price, description, img, id } = service
    const navigate = useNavigate()
    const handleNavigate = (id) => {
        navigate(`/service/${id}`)
    }
    return (
        <div className='service'>
            <img src={img} alt="" />
            <h3 className='text-dark mt-3'>{name}</h3>
            <p>Price:{price}</p>
            <p>Description:{description}</p>
            <button onClick={() => handleNavigate(id)} className='btn btn-primary'>Book:{name}</button>

        </div>
    );
};

export default Service;