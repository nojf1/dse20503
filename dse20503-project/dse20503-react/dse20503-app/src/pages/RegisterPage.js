import React from 'react';
import '../assets/styles/styles.css';
import RegisterForm from '../components/auth/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="HomePage">
      <main>
        <div className="container">
          <RegisterForm />
        </div>
      </main>
    </div>
  );
};

export default RegisterPage;