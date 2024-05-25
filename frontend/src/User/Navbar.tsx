import React, {useContext} from 'react';
import './Navbar.css';
import {Button} from "@mui/material";
import axiosInstance from "../Axios/axiosInstance";
import AuthContext from "../Context/AuthProvider";


const Navbar = () => {

    const authContext = useContext(AuthContext) || null;

    return(
    <div className='navbar'>
        <h1>Navbar</h1>
        <Button aria-label="contained primary button"
                variant="contained"

            // !DO NOT TOUCH - Logout button, allowed to be modified for styling ONLY
                onClick={() =>
                    axiosInstance.get('http://localhost:8081/logout', {}).then(
                        (response) => {
                            authContext?.setAuth(null);
                            window.location.href = '/login';
                            console.log(response.data)
                        }
                    )
                }
                style={{
                    maxWidth: '100px',
                    display: 'flex',
                    padding: '10px',
                    color: 'white',
                }
                }>Logout</Button>
    </div>
    );
}

export default Navbar;