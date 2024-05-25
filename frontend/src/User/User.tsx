import React, {useContext, useEffect, useRef, useState} from "react";
import {isAxiosError} from "axios";
import axiosInstance from "../Axios/axiosInstance";
import {Car} from "../Entities/Car";
import Navbar from "./Navbar";
import {DriveEta} from "@mui/icons-material";
import CarCard from "../Components/CarCard";
import {Input} from "../Components/Input";
import AuthContext from "../Context/AuthProvider";


const User = () => {

    let currentAxiosInstance = axiosInstance;

    const [cars, setCars] = useState<Car[]>([]);
    const [currentCarIndex, setCurrentCarIndex] = useState<number>(0);

    const [filteredCars, setFilterCars] = useState<Car[]>([]);
    const [filterModel, setFilterModel] = useState<string>('');
    const [filterBrand, setFilterBrand] = useState<string>('');
    const [filterFuel, setFilterFuel] = useState<string>('');

    const authContext = useContext(AuthContext) || null;

    const fetchCars = async () => {
        const response = await axiosInstance.get('http://localhost:8081/cars/all');
        setCars(response.data);
        setFilterCars(response.data);
        console.log(response.data);
    }

    const filterCars = async () => {
        console.log(filterFuel);
        console.log(filterModel);
        console.log(filterBrand);
    }

    useEffect(() => {
        fetchCars()

    }, []);

    // useEffect(() => {
    //     if (!filterBrand) {
    //         setFilterCars(cars);
    //     } else {
    //         const filtered = cars.filter((car) => {
    //             return car.brand.toLowerCase().includes(filterBrand.toLowerCase());
    //         });
    //         setFilterCars(filtered);
    //     }
    // }, [filterBrand, cars]);


    const userRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        userRef.current?.focus();
    }, []);

    const FILTER_URL = 'http://localhost:8081/cars/filter';

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await currentAxiosInstance.get<Car[]>('/cars/filter', {
                auth: {
                    username: authContext?.auth?.username || 'user',
                    password: authContext?.auth?.password || 'user'
                },
                params: {
                    brand: filterBrand || '',
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



    return (
        <div className='size-full'>
            <Navbar/>
            <div>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="Brand">Brand:</label>
                    <input
                        type="text"
                        id="brand"
                        ref={userRef}
                        autoComplete="off"
                        onChange={(e) => setFilterBrand(e.target.value)}
                        value={filterBrand}

                    />
                    <label htmlFor="Model">Model:</label>
                    <input
                        type="text"
                        id="model"
                        onChange={(e) => setFilterModel(e.target.value)}
                        value={filterModel}

                    />
                    <label htmlFor="fuel">Fuel:</label>
                    <input
                        type="text"
                        id="brand"
                        onChange={(e) => setFilterFuel(e.target.value)}
                        value={filterFuel}

                    />
                    <button onClick={filterCars}>Filter</button>
                </form>

            </div>
            <div className='m-auto content-center max-w-4xl justify-center m-auto'>
                <div className="carousel carousel-center m-auto p-4 max-w-4xl space-x-4 bg-neutral rounded-box">
                    {filteredCars.map((car) => (
                        <div className="carousel-item" key={car.registrationNumber}>
                            <CarCard car={car}/>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default User;
