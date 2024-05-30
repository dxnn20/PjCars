import React, {useContext, useEffect, useState} from "react";
import {Car} from "../Entities/Car";
import axiosInstance from "../Axios/axiosInstance";
import AuthContext from "../Context/AuthProvider";
import User from "../User/User";
import CarCard from "../Components/CarCard";

const Company: React.FC = () => {

    const [filteredCars, setFilterCars] = useState<Car[]>([]);
    const [filterModel, setFilterModel] = useState<string>('');
    const [filterBrand, setFilterBrand] = useState<string>('');
    const [filterFuel, setFilterFuel] = useState<string>('');
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    let currentAxiosInstance = axiosInstance;
    const authContext = useContext(AuthContext) || null;
    const [cars, setCars] = useState<Car[]>([]);

    useEffect(() => {
        const fetchCars = async () => {
            const response = await currentAxiosInstance.get<Car[]>('/cars/all', {
                auth: {
                    username: authContext?.auth?.username || 'user',
                    password: authContext?.auth?.password || 'user'
                }
            });
            setCars(response.data);
            setFilterCars(response.data);
            console.log(response.data);
        }
        fetchCars();
    }, []);

    const [addCar, setAddCar] = useState<Car>({
        registrationNumber: '',
        brand: 'undefined',
        model: '',
        color: 'not specified',
        year: 0,
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
            const response = await currentAxiosInstance.post('/cars/create', addCar, {
                auth: {
                    username: authContext?.auth?.username || '',
                    password: authContext?.auth?.password || ''
                }
            });
            setSuccessMessage('Car added successfully!');
            setErrorMessage(null);
            setCars(prevCars => [...prevCars, response.data]);
            setAddCar({
                registrationNumber: '',
                brand: 'undefined',
                model: '',
                color: 'not specified',
                year: 0,
                engineCapacity: 0,
                fuelType: '',
                power: 0,
                torque: 0,
                trunkCapacity: 0,
                price: 0,
            });
        } catch (error) {
            setErrorMessage('Error occurred while adding car: ' + error);
            setSuccessMessage(null);
        }
    };

    const getFIlteredCars = async () => {
        try {
            const response = await currentAxiosInstance.get<Car[]>('/cars/filter', {
                auth: {
                    username: authContext?.auth?.username || 'user',
                    password: authContext?.auth?.password || 'user'
                },
                params: {
                    brand: filterBrand || null,
                    model: filterModel || null,
                    fuelType: filterFuel || null,
                }
            });
            setFilterCars(response.data); // Update filtered cars state
            console.log(response.data);
        } catch (error) {
            console.error('Error occurred while fetching filtered cars:', error);
        }
    }

    const UpdateCar = async () => {
        try {
            const response = await currentAxiosInstance.put('/cars/modify', {}, {
                auth: {
                    username: authContext?.auth?.username || '',
                    password: authContext?.auth?.password || ''
                },
                params: {
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
                }
            });
            setSuccessMessage('Car updated successfully!');
            setErrorMessage(null);
        } catch (error) {
            setErrorMessage('Error occurred while updating car: ' + error);
            setSuccessMessage(null);
        }
    };

    const deleteCar = async (registrationNumber: string) => {
        try {
            const response = await currentAxiosInstance.delete('/cars/delete/' + registrationNumber, {
                auth: {
                    username: authContext?.auth?.username || '',
                    password: authContext?.auth?.password || ''
                },
            });
            setSuccessMessage('Car deleted successfully!');
            setErrorMessage(null);
        } catch (error) {
            setErrorMessage('Error occurred while deleting car: ' + error);
            setSuccessMessage(null);
        }
        getFIlteredCars();
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <button className="btn m-2" onClick={() =>
                axiosInstance.get('http://localhost:8081/logout', {}).then(
                    (response) => {
                        authContext?.setAuth(null);
                        window.location.href = '/login';
                        console.log(response.data)
                    }
                )
            }>Logout
            </button>

            <form
                className="grid grid-cols-1 h-dvh md:grid-cols-2 gap-5 w-full max-w-4xl p-6 bg-white rounded-lg shadow-xl m-8"
            >
                <div className="col-span-2 md:col-span-1">
                    <label htmlFor="registrationNumber" className="block text-sm font-medium text-gray-700">
                        Registration number:
                    </label>
                    <input
                        type="text"
                        id="registrationNumber"
                        value={addCar.registrationNumber}
                        onChange={(e) => setAddCar({...addCar, registrationNumber: e.target.value})}
                        required
                        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                        Insert brand:
                    </label>
                    <input
                        type="text"
                        id="brand"
                        value={addCar.brand}
                        onChange={(e) => setAddCar({...addCar, brand: e.target.value})}
                        required
                        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label htmlFor="model" className="block text-sm font-medium text-gray-700">
                        Model:
                    </label>
                    <input
                        type="text"
                        id="model"
                        value={addCar.model}
                        onChange={(e) => setAddCar({...addCar, model: e.target.value})}
                        required
                        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label htmlFor="color" className="block text-sm font-medium text-gray-700">
                        Color:
                    </label>
                    <input
                        type="text"
                        id="color"
                        value={addCar.color}
                        onChange={(e) => setAddCar({...addCar, color: e.target.value})}
                        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label htmlFor="year" className="block text-sm font-medium text-gray-700">
                        Insert year:
                    </label>
                    <input
                        type="number"
                        id="year"
                        value={addCar.year}
                        onChange={(e) => setAddCar({...addCar, year: parseInt(e.target.value)})}
                        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label htmlFor="engineCapacity" className="block text-sm font-medium text-gray-700">
                        Insert engine capacity:
                    </label>
                    <input
                        type="number"
                        id="engineCapacity"
                        value={addCar.engineCapacity}
                        onChange={(e) => setAddCar({...addCar, engineCapacity: parseInt(e.target.value)})}
                        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label htmlFor="fuelType" className="block text-sm font-medium text-gray-700">
                        Insert fuel type:
                    </label>
                    <input
                        type="text"
                        id="fuelType"
                        value={addCar.fuelType}
                        onChange={(e) => setAddCar({...addCar, fuelType: e.target.value})}
                        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label htmlFor="power" className="block text-sm font-medium text-gray-700">
                        Insert power:
                    </label>
                    <input
                        type="number"
                        id="power"
                        value={addCar.power}
                        onChange={(e) => setAddCar({...addCar, power: parseInt(e.target.value)})}
                        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label htmlFor="torque" className="block text-sm font-medium text-gray-700">
                        Insert torque:
                    </label>
                    <input
                        type="number"
                        id="torque"
                        value={addCar.torque}
                        onChange={(e) => setAddCar({...addCar, torque: parseInt(e.target.value)})}
                        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div className="col-span-2 md:col-span-1">
                    <label htmlFor="trunkCapacity" className="block text-sm font-medium text-gray-700">
                        Insert trunk capacity:
                    </label>
                    <input
                        type="number"
                        id="trunkCapacity"
                        value={addCar.trunkCapacity}
                        onChange={(e) => setAddCar({...addCar, trunkCapacity: parseInt(e.target.value)})}
                        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div className="col-span-2 md:col-span-2">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Insert price:
                    </label>
                    <input
                        type="number"
                        id="price"
                        value={addCar.price}
                        onChange={(e) => setAddCar({...addCar, price: parseInt(e.target.value)})}
                        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div className="w-full">
                    <button
                        type="submit"
                        className="btn m-2"
                    >
                        Add Car
                    </button>
                    <button type="reset" className="btn m-2"
                            onClick={() => {
                                deleteCar(addCar.registrationNumber);
                            }
                            }
                    > Delete
                    </button>
                    <button
                        type="reset"
                        className="btn m-2"
                        onClick={() => {
                            UpdateCar()
                        }}
                    > Update
                    </button>
                </div>

            </form>
            {successMessage && (
                <div role="alert" className="alert alert-success max-w-4xl">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"
                         viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                    </svg>
                    <span>{successMessage}</span>
                </div>
            )}
            {errorMessage && (
                <div role="alert" className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none"
                         viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21H3M12 4v16m8-8H4"/>
                    </svg>
                    <span>{errorMessage}</span>
                </div>
            )}
            <div className="flex w-full mx-auto justify-center items-center ">
                <form onSubmit={(e) => {
                    e.preventDefault();
                    getFIlteredCars();
                }} className="space-y-4 mt-8">
                    <div className="flex flex-col md:flex-row md:space-x-4">
                        <div className="flex-1">
                            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Brand:</label>
                            <input
                                type="text"
                                id="brand"
                                autoComplete="off"
                                onChange={(e) => setFilterBrand(e.target.value)}
                                value={filterBrand}
                                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="model" className="block text-sm font-medium text-gray-700">Model:</label>
                            <input
                                type="text"
                                id="model"
                                onChange={(e) => setFilterModel(e.target.value)}
                                value={filterModel}
                                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div className="flex-1">
                            <label htmlFor="fuel" className="block text-sm font-medium text-gray-700">Fuel:</label>
                            <input
                                type="text"
                                id="fuel"
                                onChange={(e) => setFilterFuel(e.target.value)}
                                value={filterFuel}
                                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full btn md:w-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md"
                    >
                        Filter
                    </button>
                </form>
            </div>
            <div>
                <div className="flex max-w-7xl flex-row justify-center flex-wrap space-y-3 space-x-4">
                    {filteredCars.map((car, index) => (
                        <div onClick={
                            () => {
                                setAddCar(car);
                            }
                        }>
                            <CarCard key={index} car={car}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

}

export default Company;