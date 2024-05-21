import {useEffect, useState} from "react";
import {isAxiosError} from "axios";
import axiosInstance from "../Axios/axiosInstance";

const User = () => {

    const [cars, setCars] = useState([]);

    const fetchCars = async () => {
        const response = await axiosInstance.get('http://localhost:8081/cars/all');
        setCars(response.data);
    }

    useEffect(() => {
        fetchCars();
        console.log(cars);
    }, []);

    return (
        <>
        <p>
            User Page
        </p>
        </>
    )
}

export default User;
