import React, { useEffect, useState } from 'react';
import Service from '../Service/Service';
import './Services.css'

const Services = () => {
    const [services, setServices] = useState([])
    useEffect(() => {
        fetch(`services.json`)
            .then(res => res.json())
            .then(data => setServices(data))
    }, [])
    return (
        <div className='services-bg'>
            <h1 id="services" className='service-title mt-5 text-primary'>Our Services</h1>
            <div className='services-container container'>
                {
                    services.map(service => <Service
                        key={service.id}
                        service={service}
                    ></Service>)
                }
            </div>

        </div>
    );
};

export default Services;