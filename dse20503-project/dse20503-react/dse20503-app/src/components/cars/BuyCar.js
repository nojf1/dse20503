import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CarService from '../../services/CarService';
import '../../assets/styles/styles.css';

const BuyCar = () => {
    const { id } = useParams();
    const [car, setCar] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const carData = await CarService.getCarById(id);
                setCar(carData);
            } catch (error) {
                console.error('Error fetching car:', error);
                setMessage('Error fetching car');
            }
        };

        fetchCar();
    }, [id]);

    const handleApproveSale = async () => {
        try {
            await CarService.approveSale(id);
            setMessage('Sale approved successfully');
        } catch (error) {
            setMessage(error.message);
        }
    };

    if (!car) {
        return <div>Loading...</div>;
    }

    if (car.status !== 'AVAILABLE') {
        return <div>This car is not available for purchase.</div>;
    }

    return (
        <div className="buy-car-container">
            <h2>Buy Car</h2>
            <div className="car-details">
                <img src={car.imageUrl} alt={`${car.brand} ${car.model}`} className="car-image" />
                <h3>{car.brand} {car.model}</h3>
                <p>{car.year}</p>
                <p>${car.price}</p>
                <p>{car.description}</p>
                <p>Status: {car.status}</p>
            </div>
            <button className="btn" onClick={handleApproveSale}>Approve Sale</button>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default BuyCar;