import React from 'react';
import '../assets/styles/styles.css';
import CarCards from '../components/cars/CarCards';

const CarsPage = () => {
  return (

        <main>
          <h1>Cars for sale</h1>
            <CarCards />
        </main>
  );
};

export default CarsPage;