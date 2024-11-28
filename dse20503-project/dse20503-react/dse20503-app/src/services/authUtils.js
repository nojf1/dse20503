import { jwtDecode } from 'jwt-decode';

export const getUserRole = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const decodedToken = jwtDecode(token);
        return decodedToken.role;
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};

export const getUserIdFromToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        const decodedToken = jwtDecode(token);
        return decodedToken.userId; 
    } catch (error) {
        console.error('Error decoding token:', error);
        return null;
    }
};