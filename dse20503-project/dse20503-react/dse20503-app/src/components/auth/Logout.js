import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../assets/styles/styles.css';
import { AuthContext } from '../../services/AuthContext';

const Logout = () => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout(); // Update the context to clear the authentication state
    navigate('/login');
  };

  return (
    <button onClick={handleLogout} className="logoutbtn">
      Logout
    </button>
  );
};

export default Logout;