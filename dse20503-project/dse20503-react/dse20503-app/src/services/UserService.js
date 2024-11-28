import axios from "axios";

const API_URL = "http://localhost:8080/users";
axios.defaults.headers.post["Content-Type"] = "application/json";

const UserService = {
  // Register a new user
  registerUser: async (user) => {
    try {
      const response = await axios.post(`${API_URL}/register`, user);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Error registering user");
    }
  },

  // Login a user
  loginUser: async (username, password) => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });
      return response.data; // Ensure the response contains the token
    } catch (error) {
      if (error.response) {
        throw error;
      } else {
        throw new Error("Network error");
      }
    }
  },

  // Get all users
  getAllUsers: async () => {
    try {
      const response = await axios.get(`${API_URL}/all`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Error fetching users");
    }
  },

  // Get user by ID
  getUserById: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Error fetching user");
    }
  },

  // Delete a user
  deleteUser: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/delete/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response.data.message || "Error deleting user");
    }
  },

  // Update user profile
  updateUserProfile: async (userDetails) => {
    try {
      const response = await axios.put(`${API_URL}/profile`, userDetails, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response.data.message || "Error updating user profile"
      );
    }
  },

  // Update user role
  updateUserRole: async (userDetails) => {
    try {
      const response = await axios.put(`${API_URL}/role`, userDetails, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response.data.message || "Error updating user role"
      );
    }
  },

    // Change user password
    changePassword: async (passwordDetails) => {
        try {
            const response = await axios.put(`${API_URL}/change-password`, passwordDetails, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            return response.data;
        } catch (error) {
            throw new Error(error.response.data.message || 'Error changing password');
        }
    },

  // Get user profile
  getUserProfile: async () => {
    try {
      const response = await axios.get(`${API_URL}/profile`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      return response.data;
    } catch (error) {
      throw new Error(
        error.response.data.message || "Error fetching user profile"
      );
    }
  },
};

export default UserService;
