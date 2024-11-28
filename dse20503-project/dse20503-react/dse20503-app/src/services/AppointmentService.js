import axios from 'axios';

const API_URL = 'http://localhost:8080/appointments';
axios.defaults.headers.post['Content-Type'] = 'application/json';

const AppointmentService = {
    // Get all appointments
    getAllAppointments: async () => {
        try {
            const response = await axios.get(`${API_URL}/all`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Error fetching appointments');
        }
    },

    // Get appointment by ID
    getAppointmentById: async (id) => {
        try {
            const response = await axios.get(`${API_URL}/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Error fetching appointment');
        }
    },

    // Create a new appointment
    createAppointment: async (appointment) => {
        try {
            const response = await axios.post(`${API_URL}/create`, appointment);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Error creating appointment');
        }
    },

    // Update an appointment
    updateAppointment: async (id, appointmentDetails) => {
        try {
            const response = await axios.put(`${API_URL}/update/${id}`, appointmentDetails);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Error updating appointment');
        }
    },

    // Delete an appointment
    deleteAppointment: async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/delete/${id}`);
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Error deleting appointment');
        }
    }
};

export default AppointmentService;