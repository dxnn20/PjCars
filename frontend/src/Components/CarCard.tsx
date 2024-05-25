import React from 'react';
import { Car } from '../Entities/Car';
import './CarCard.css';

interface CarCardProps {
    car: Car;
}

const CarCard: React.FC<CarCardProps>=({car}) =>{
    return (
        <div className="card w-96 bg-primary text-primary-content">
            <div className="card-body">
                <h2 className="card-title">{car.brand} </h2>
                <p className='model-subtitle'>{car.model}</p>
                <p><strong>Registration Number:</strong> {car.registrationNumber}</p>
                <p><strong>Color:</strong> {car.color}</p>
                <p><strong>Year:</strong> {car.year}</p>
                <p><strong>Engine Capacity:</strong> {car.engineCapacity}</p>
                <p><strong>Fuel Type:</strong> {car.fuelType}</p>
                <p><strong>Power:</strong> {car.power}</p>
                <p><strong>Torque:</strong> {car.torque}</p>
                <p><strong>Trunk Capacity:</strong> {car.trunkCapacity}</p>
                <p><strong>Price:</strong> {car.price}</p>


            </div>
        </div>
    )
}

export default CarCard;