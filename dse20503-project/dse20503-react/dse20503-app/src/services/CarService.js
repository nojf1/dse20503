import axios from 'axios';

const API_URL = 'http://localhost:8080/cars';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const CarService = {
    // Get all cars
    getAllCars: async () => {
        try {
            const response = await axios.get(`${API_URL}/all`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Error fetching cars');
        }
    },

    // Get car by ID
    getCarById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Error fetching car');
        }
    },

    // Create a new car
    createCar: async (car) => {
        try {
            const response = await axios.post(`${API_URL}/create`, car);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Error creating car');
        }
    },

    updateCar: async (id, carDetails) => {
        try {
            const response = await axios.put(`${API_URL}/update/${id}`, carDetails);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Error updating car');
        }
    },

    // Delete a car
    deleteCar: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/delete/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Error deleting car');
        }
    },

    // Approve the sale of a car
    approveSale: async (id) => {
        try {
            const response = await axios.post(`${API_URL}/approve-sale/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Error approving sale');
        }
    },
};

export default CarService;