import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ServiceCards.css'; // Import external CSS file

const services = [
    { title: 'Business Strategy', description: 'Optimize your business strategies for maximum efficiency.', path: '/business-strategy' },
    { title: 'Website Development', description: 'Develop cutting-edge websites that captivate your audience.', path: '/website-development' },
    { title: 'Marketing & Reporting', description: 'Enhance your marketing strategies with comprehensive reporting.', path: '/marketing-reporting' },
    { title: 'Mobile App Development', description: 'Create responsive and efficient mobile applications.', path: '/mobile-app-development' }
];

const ServiceCard = ({ title, description, path }) => {
    const navigate = useNavigate();

    const navigateTo = () => {
        navigate(path);
    };

    return (
        <div onClick={navigateTo} className="service-card"> {/* Apply CSS class */}
            <h2 className="service-title">{title}</h2> {/* Apply CSS class */}
            <p>{description}</p>
        </div>
    );
};

const ServiceCards = () => {
    return (
        <div className="service-cards-container"> {/* Apply CSS class */}
            <h1 className="service-cards-heading">Our Services</h1> {/* Heading */}
            <div className="service-cards"> {/* Apply CSS class */}
                {services.map(service => (
                    <ServiceCard key={service.title} {...service} />
                ))}
            </div>
        </div>
    );
};

export default ServiceCards;
