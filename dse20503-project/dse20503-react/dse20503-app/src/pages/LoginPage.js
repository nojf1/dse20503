import React from 'react';
import '../assets/styles/styles.css';
import LoginForm from '../components/auth/LoginForm';

const LoginPage = () => {
  return (
      <div className="HomePage">
        <main>
          <div className="container">
            <LoginForm />
          </div>
        </main>
      </div>
  );
};

export default LoginPage;