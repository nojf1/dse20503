import React, { useState, useEffect, useContext } from 'react';
import CarService from '../../services/CarService';
import '../../assets/styles/styles.css';
import { AuthContext } from '../../services/AuthContext';
import BidService from '../../services/BidService';

const ManageCars = () => {
    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);
    const [message, setMessage] = useState('');
    const { userRole } = useContext(AuthContext);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const carsData = await CarService.getAllCars();
                setCars(carsData);
            } catch (error) {
                console.error('Error fetching cars:', error);
                setMessage('Error fetching cars');
            }
        };

        fetchCars();
    }, []);

    const handleEditCar = (car) => {
        setSelectedCar(car);
    };

    const handleUpdateCar = async (e) => {
        e.preventDefault();
        try {
            const updatedCar = await CarService.updateCar(selectedCar.id, selectedCar);
            setCars(cars.map(car => car.id === updatedCar.id ? updatedCar : car));
            setMessage('Car updated successfully');
        } catch (error) {
            setMessage(error.message);
        }
    };

    const handleDeleteCar = async (id) => {
        try {
            // Delete associated bids first
            const bids = await BidService.getBidsByCarId(id);
            for (const bid of bids) {
                await BidService.deleteBid(bid.id);
            }

            // Delete the car
            await CarService.deleteCar(id);
            setCars(cars.filter(car => car.id !== id));
            setMessage('Car and associated bids deleted successfully');
        } catch (error) {
            setMessage(error.message);
        }
    };

    if (userRole !== 'ROLE_ADMIN') {
        return <div>Access denied. Admins only.</div>;
    }

    return (
        <div className="admin-container">
            <h2>Manage Cars</h2>
            {message && <p className="message">{message}</p>}
            <div className="car-list">
                <h3>Cars</h3>
                <table className="car-table">
                    <thead>
                        <tr>
                            <th>Brand</th>
                            <th>Model</th>
                            <th>Year</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cars.map(car => (
                            <tr key={car.id}>
                                <td>{car.brand}</td>
                                <td>{car.model}</td>
                                <td>{car.year}</td>
                                <td>{car.price}</td>
                                <td>{car.status}</td>
                                <td>
                                    <button onClick={() => handleEditCar(car)}>Edit</button>
                                    <button onClick={() => handleDeleteCar(car.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectedCar && (
                <div className="car-edit">
                    <h3>Edit Car</h3>
                    <form onSubmit={handleUpdateCar}>
                        <div className="form-group">
                            <label>Brand:</label>
                            <input type="text" value={selectedCar.brand} onChange={(e) => setSelectedCar({ ...selectedCar, brand: e.target.value })} required />
                        </div>
                        <div className="form-group">
                            <label>Model:</label>
                            <input type="text" value={selectedCar.model} onChange={(e) => setSelectedCar({ ...selectedCar, model: e.target.value })} required />
                        </div>
                        <div className="form-group">
                            <label>Year:</label>
                            <input type="text" value={selectedCar.year} onChange={(e) => setSelectedCar({ ...selectedCar, year: e.target.value })} required />
                        </div>
                        <div className="form-group">
                            <label>Price:</label>
                            <input type="text" value={selectedCar.price} onChange={(e) => setSelectedCar({ ...selectedCar, price: e.target.value })} required />
                        </div>
                        <div className="form-group">
                            <label>Status:</label>
                            <select value={selectedCar.status} onChange={(e) => setSelectedCar({ ...selectedCar, status: e.target.value })} required>
                                <option value="AVAILABLE">Available</option>
                                <option value="UNAVAILABLE">Unavailable</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Description:</label>
                            <textarea value={selectedCar.description} onChange={(e) => setSelectedCar({ ...selectedCar, description: e.target.value })} required></textarea>
                        </div>
                        <div className="form-group">
                            <label>Image URL:</label>
                            <input type="text" value={selectedCar.imageUrl} onChange={(e) => setSelectedCar({ ...selectedCar, imageUrl: e.target.value })} required />
                        </div>
                        <button className="btn" type="submit">Update Car</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ManageCars;