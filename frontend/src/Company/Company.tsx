import React, {useContext, useState} from "react";
import {Car} from "../Entities/Car";
import axiosInstance from "../Axios/axiosInstance";
import AuthContext from "../Context/AuthProvider";
import './Company.css';

const Company: React.FC = () =>{

    let currentAxiosInstance = axiosInstance;
    const authContext = useContext(AuthContext) || null;
    const [cars, setCars] = useState<Car[]>([]);

    const [addCar, setAddCar] = useState<Car>({
        registrationNumber:'',
        brand: '',
        model: '',
        color:'',
        year:0,
        engineCapacity: 0,
        fuelType: '',
        power: 0,
        torque: 0,
        trunkCapacity: 0,
        price: 0,

    });
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log(addCar);
            const response = await currentAxiosInstance.post('/cars/create',
                // Send the car details directly in the request body
                {
                    registrationNumber: addCar.registrationNumber,
                    brand: addCar.brand,
                    model: addCar.model,
                    color: addCar.color,
                    year: addCar.year,
                    engineCapacity: addCar.engineCapacity,
                    fuelType: addCar.fuelType,
                    power: addCar.power,
                    torque: addCar.torque,
                    trunkCapacity: addCar.trunkCapacity,
                    price: addCar.price,
                },
                {
                    // Include authentication in the request config
                    auth: {
                        username: authContext?.auth?.username || '',
                        password: authContext?.auth?.password || ''
                    }
                }
            );
            console.log('Car added successfully:', response.data);
        } catch (error) {
            console.error('Error occurred while adding car:', error);
        }
    };


    return (
        <div className='form-container'>
            <form className='form-container' onSubmit={handleSubmit}>
                <div className='inputs'>
                    <div className='input'>
                    <label htmlFor='registrationNumber'>Registration number: </label>
                        <input
                            type="text"
                            value={addCar.registrationNumber}
                            onChange={(e) => setAddCar({...addCar, registrationNumber: e.target.value})}
                        />
                    </div>
                    <div className='input'>
                    <label htmlFor="brand">Insert brand:</label>
                        <input
                            type="text"
                            value={addCar.brand}
                            onChange={(e) => setAddCar({...addCar, brand: e.target.value})}
                        />
                    </div>
                    <div className='input'>
                    <label htmlFor="model">Model:</label>
                        <input
                            type="text"
                            value={addCar.model}
                            onChange={(e) => setAddCar({...addCar, model: e.target.value})}
                        />
                    </div>
                    <div className='input'>
                        <label htmlFor="color">Color:</label>
                        <input
                            type="text"
                            value={addCar.color}
                            onChange={(e) => setAddCar({...addCar, color: e.target.value})}
                        />
                    </div>

                    <div className='input'>
                        <label htmlFor="year">Insert year:</label>
                        <input
                            type="number"
                            value={addCar.year}
                            onChange={(e) => setAddCar({...addCar, year: parseInt(e.target.value)})}
                        />
                    </div>

                    <div className='input'>
                        <label htmlFor="engineCapacity">Insert engine capacity:</label>
                        <input
                            type="number"
                            value={addCar.engineCapacity}
                            onChange={(e) => setAddCar({...addCar, engineCapacity: parseInt(e.target.value)})}
                        />
                    </div>


                    <div className='input'>
                        <label htmlFor="fuelType">Insert fuel type:</label>
                        <input
                            type="text"
                            value={addCar.fuelType}
                            onChange={(e) => setAddCar({...addCar, fuelType: e.target.value})}
                        />
                    </div>

                    <div className='input'>
                        <label htmlFor="power">Insert power:</label>
                        <input
                            type="number"
                            value={addCar.power}
                            onChange={(e) => setAddCar({...addCar, power: parseInt(e.target.value)})}
                        />
                    </div>

                    <div className='input'>
                        <label htmlFor="torque">Insert torque:</label>
                        <input
                            type="number"
                            value={addCar.torque}
                            onChange={(e) => setAddCar({...addCar, torque: parseInt(e.target.value)})}
                        />
                    </div>

                    <div className='input'>
                        <label htmlFor="trunkCapacity">Insert trunk capacity:</label>
                        <input
                            type="number"
                            value={addCar.trunkCapacity}
                            onChange={(e) => setAddCar({...addCar, trunkCapacity: parseInt(e.target.value)})}
                        />
                    </div>

                    <div className='input'>
                        <label htmlFor="price">Insert price:</label>
                        <input
                            type="number"
                            value={addCar.price}
                            onChange={(e) => setAddCar({...addCar, price: parseInt(e.target.value)})}
                        />
                    </div>
                    <button type="submit">Add Car</button>
                </div>
            </form>

        </div>
    );
}

export default Company;