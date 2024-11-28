import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import CarService from '../../services/CarService';
import BidService from '../../services/BidService';
import Appointments from './Appointments';
import { getUserIdFromToken } from '../../services/authUtils';
import '../../assets/styles/styles.css';

const CarCards = () => {
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);
    const [filters, setFilters] = useState({
        make: '',
        model: '',
        year: '',
        minPrice: '',
        maxPrice: ''
    });
    const userId = getUserIdFromToken();

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const carsData = await CarService.getAllCars();
                const carsWithBids = await Promise.all(carsData.map(async (car) => {
                    const highestBid = await BidService.getHighestBidForCar(car.id);
                    return { ...car, highestBid: highestBid ? highestBid.amount : null };
                }));
                setCars(carsWithBids);
                setFilteredCars(carsWithBids);
            } catch (error) {
                console.error('Error fetching cars:', error);
            }
        };

        fetchCars();
    }, []);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({
            ...filters,
            [name]: value
        });
    };

    const applyFilters = () => {
        let filtered = cars;

        if (filters.make) {
            filtered = filtered.filter(car => car.brand.toLowerCase().includes(filters.make.toLowerCase()));
        }
        if (filters.model) {
            filtered = filtered.filter(car => car.model.toLowerCase().includes(filters.model.toLowerCase()));
        }
        if (filters.year) {
            filtered = filtered.filter(car => car.year.includes(filters.year));
        }
        if (filters.minPrice) {
            filtered = filtered.filter(car => parseFloat(car.price) >= parseFloat(filters.minPrice));
        }
        if (filters.maxPrice) {
            filtered = filtered.filter(car => parseFloat(car.price) <= parseFloat(filters.maxPrice));
        }

        setFilteredCars(filtered);
    };

    const handlePlaceBid = async (carId) => {
        const bidAmount = prompt('Enter your bid amount:');
        if (bidAmount) {
            const bid = {
                car: { id: carId },
                user: { id: userId }, // Use the logged-in user's ID
                amount: parseFloat(bidAmount),
                bidExpiresAt: new Date(new Date().getTime() + 24 * 60 * 60 * 1000).toISOString() // Bid expires in 24 hours
            };

            try {
                await BidService.placeBid(bid);
                alert('Bid placed successfully');
                // Update the highest bid for the car
                const updatedCars = cars.map(car => car.id === carId ? { ...car, highestBid: bid.amount } : car);
                setCars(updatedCars);
            } catch (error) {
                alert('Error placing bid: ' + error.message);
            }
        }
    };

    return (
        <div className="cars-page">
          {userId && <Link to={`/sellcar`}><button className="btn">Sell a car</button></Link>}
            <div className="filters">
                <input
                    type="text"
                    name="make"
                    placeholder="Make"
                    value={filters.make}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="model"
                    placeholder="Model"
                    value={filters.model}
                    onChange={handleFilterChange}
                />
                <input
                    type="text"
                    name="year"
                    placeholder="Year"
                    value={filters.year}
                    onChange={handleFilterChange}
                />
                <input
                    type="number"
                    name="minPrice"
                    placeholder="Min Price"
                    value={filters.minPrice}
                    onChange={handleFilterChange}
                />
                <input
                    type="number"
                    name="maxPrice"
                    placeholder="Max Price"
                    value={filters.maxPrice}
                    onChange={handleFilterChange}
                />
                <button onClick={applyFilters}>Apply Filters</button>
            </div>
            <div className="cars-grid">
                {filteredCars.map((car) => (
                    <div key={car.id} className="car-card">
                        <img src={car.imageUrl} alt={`${car.brand} ${car.model}`} className="car-image" />
                        <div className="car-details">
                            <h3>{car.brand} {car.model}</h3>
                            <p>{car.year}</p>
                            <p>${car.price}</p>
                            <p>{car.description}</p>
                            <p>Status: {car.status}</p>
                            <p>Seller: {car.seller.username}</p>
                            <p>Current Bid: {car.highestBid !== null ? `$${car.highestBid}` : 'No bids yet'}</p>
                            {car.status === 'AVAILABLE' && (
                                <>
                                    <Link to={`/buycar/${car.id}`}><button className="btn">Buy</button></Link>
                                    <button className="btn" onClick={() => handlePlaceBid(car.id)}>Place Bid</button>
                                    <Appointments carId={car.id} userId={userId} />
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CarCards;