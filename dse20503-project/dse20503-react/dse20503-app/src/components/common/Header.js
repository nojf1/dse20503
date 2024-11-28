import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import '../../assets/styles/styles.css'; 
import Logout from '../../components/auth/Logout';
import { AuthContext } from '../../services/AuthContext';

const Header = () => {
  const { userRole, userId } = useContext(AuthContext);

  return (
    <header className="header">
      <div className="logo">
        <Link to="/">Hi-Fi Cars</Link>
      </div>
      <nav className="nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          {userRole === 'ROLE_ADMIN' && <li><Link to="/adminusers">Users</Link></li>}
          {userRole === 'ROLE_ADMIN' && <li><Link to="/admincars">Manage Cars</Link></li>}
          <li><Link to="/cars">Cars</Link></li>
          {userId && <li><Link to={`/userprofile/${userId}`}>Profile</Link></li>}
          {!userId && <li><Link to="/register">Register</Link></li>}
          {!userId && <li><Link to="/login">Login</Link></li>}
          {userId && <li><Logout /></li>}
        </ul>
      </nav>
    </header>
  );
};

export default Header;