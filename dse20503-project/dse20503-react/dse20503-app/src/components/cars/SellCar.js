import React, { useState } from 'react';
import CarService from '../../services/CarService';
import { getUserIdFromToken } from '../../services/authUtils';
import '../../assets/styles/styles.css';

const SellCar = () => {
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [color, setColor] = useState('');
    const [licensePlate, setLicensePlate] = useState('');
    const [year, setYear] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [message, setMessage] = useState('');

    const handleSellCar = async (e) => {
        e.preventDefault();
        const userId = getUserIdFromToken();
        if (!userId) {
            setMessage('You must be logged in to sell a car.');
            return;
        }

        const car = {
            brand,
            model,
            color,
            licensePlate,
            year,
            price,
            description,
            imageUrl,
            status: 'AVAILABLE', // Default status
            seller: { id: userId } // Use the logged-in user's ID
        };

        try {
            await CarService.createCar(car);
            setMessage('Car listed for sale successfully');
            // Clear form fields
            setBrand('');
            setModel('');
            setColor('');
            setLicensePlate('');
            setYear('');
            setPrice('');
            setDescription('');
            setImageUrl('');
        } catch (error) {
            setMessage(error.message);
        }
    };

    return (
        <div className="sell-car-container">
            <h2>Sell Your Car</h2>
            <form onSubmit={handleSellCar}>
                <div className="form-group">
                    <label>Brand:</label>
                    <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Model:</label>
                    <input type="text" value={model} onChange={(e) => setModel(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Color:</label>
                    <input type="text" value={color} onChange={(e) => setColor(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>License Plate:</label>
                    <input type="text" value={licensePlate} onChange={(e) => setLicensePlate(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Year:</label>
                    <input type="text" value={year} onChange={(e) => setYear(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Price:</label>
                    <input type="text" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Description:</label>
                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
                </div>
                <div className="form-group">
                    <label>Image URL:</label>
                    <input type="text" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} required />
                </div>
                <button className="btn" type="submit">Sell Car</button>
            </form>
            {message && <p className="message">{message}</p>}
        </div>
    );
};

export default SellCar;