import axios from 'axios';

const API_URL = 'http://localhost:8080/bids';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const BidService = {
    // Place a bid
    placeBid: async (bid) => {
        try {
            const response = await axios.post(`${API_URL}/place`, bid);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Error placing bid');
        }
    },

    // Get all bids
    getAllBids: async () => {
        try {
            const response = await axios.get(`${API_URL}/all`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Error fetching bids');
        }
    },

    // Get bid by ID
    getBidById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Error fetching bid');
        }
    },

    // Get highest bid for a car
    getHighestBidForCar: async (carId) => {
        try {
            const response = await axios.get(`${API_URL}/highest/${carId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Error fetching highest bid');
        }
    },

    // Update a bid
    updateBid: async (id, bidDetails) => {
        try {
            const response = await axios.post(`${API_URL}/update`, { id, ...bidDetails });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Error updating bid');
        }
    },

    // Delete a bid
    deleteBid: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/delete/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Error deleting bid');
        }
    },

    // Get bids by car ID
    getBidsByCarId: async (carId) => {
        try {
            const response = await axios.get(`${API_URL}/car/${carId}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Error fetching bids for car');
        }
    },



};

export default BidService;