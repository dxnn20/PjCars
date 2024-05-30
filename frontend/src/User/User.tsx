import React, {useContext, useEffect, useRef, useState} from "react";
import {isAxiosError} from "axios";
import axiosInstance from "../Axios/axiosInstance";
import {Car} from "../Entities/Car";
import Navbar from "./Navbar";
import {DriveEta} from "@mui/icons-material";
import CarCard from "../Components/CarCard";
import {Input} from "../Components/Input";
import AuthContext from "../Context/AuthProvider";
import {Button} from "@mui/material";


const User = () => {

    let currentAxiosInstance = axiosInstance;

    const [cars, setCars] = useState<Car[]>([]);
    const [currentCarIndex, setCurrentCarIndex] = useState<number>(0);

    const [filteredCars, setFilterCars] = useState<Car[]>([]);
    const [filterModel, setFilterModel] = useState<string>('');
    const [filterBrand, setFilterBrand] = useState<string>('');
    const [filterFuel, setFilterFuel] = useState<string>('');
    const [roleStatus, setRoleStatus] = useState<string>('');
    const [response, setResponse] = useState<string>('');

    const authContext = useContext(AuthContext) || null;

    const fetchCars = async () => {
        const response = await axiosInstance.get('http://localhost:8081/cars/all');
        setCars(response.data);
        setFilterCars(response.data);
        console.log(response.data);
    }

    useEffect(() => {
        fetchCars()
        setRoleStatus(authContext?.auth?.status || 'USER')
    }, []);

    const userRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        userRef.current?.focus();
    }, []);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
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
            setFilterCars(response.data);
            console.log(response.data);
        } catch (error) {
            console.error('Error occurred while fetching filtered cars:', error);
        }
    };

    const requestRole = async () => {

        if (authContext?.auth?.status === 'PENDING') {
            setResponse('Request already sent');
            return
        }
        await axiosInstance.put('/users/request-company', {}, {
            auth: {
                username: authContext?.auth?.username || 'user',
                password: authContext?.auth?.password || 'user'
            },
            params: {
                id: authContext?.auth?.id
            }
        }).then(
            (response) => {
                setRoleStatus(response.data);
            }
        )
    }

    return (
        <div className="min-h-screen h-dvh w-dvw overflow-x-hidden flex flex-col">
            <div className="w-full max-w-4xl bg-white rounded-lg justify-center mx-auto shadow-md mt-11 p-6">
                <button className="btn m-1"
                        onClick={() =>
                            requestRole()
                        }
                >
                    Request company role
                </button>

                {(response !== '') && <div className="flex items-center space-x-4 badge p-3 m-3"> {response}</div>}
                <button
                    className="btn m-1"
                    // !DO NOT TOUCH - Logout button, allowed to be modified for styling ONLY
                    onClick={() =>
                        axiosInstance.get('http://localhost:8081/logout', {}).then(
                            (response) => {
                                authContext?.setAuth(null);
                                window.location.href = '/login';
                                console.log(response.data)
                            }
                        )
                    }>Logout
                </button>
                <div className="flex items-center space-x-4 badge p-3 m-3"> Status: {roleStatus}</div>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
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
            <div className="flex justify-center mt-28">
                <div
                    className="flex max-w-7xl flex-row justify-center flex-wrap space-y-3 space-x-4 bg-gray-800 p-10 rounded-2xl">
                    {filteredCars.map((car, index) => (
                        <CarCard key={index} car={car}/>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default User;
