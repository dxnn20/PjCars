import React from "react";
import {Container, FormControl} from "@mui/material";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../Axios/axiosInstance";
import axios from "axios";
import {User} from "../Entities/User";

const SignUp: React.FC = () => {

    const navigate = useNavigate();
    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');

    const handleSubmit = async () =>  {

        console.log(username);
        console.log(password)

        await axiosInstance.post<User>('http://localhost:8081/security/sign-up', null ,{
            params: {
                username: username,
                password: password
            }
        })
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Container
            style={{
                backgroundColor: "white",
                minHeight: "500px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                height: "60vh",
                border: "1px solid white",
                borderRadius: "10px",
                boxShadow: "0 0 30px 20px rgba(100, 100, 100, 0.1)",
            }}
        >
            <h1>Sign Up</h1>
            <Container
            >
                <FormControl>
                    <label htmlFor="username">Username:</label>
                    <input
                        type="text"
                        id="username"
                        autoComplete="off"
                        required
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button

                        onClick={
                            () => {
                                handleSubmit()
                            }
                        }

                    >Sign Up</button>
                </FormControl>

                <Container
                style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "1rem"
                }}
                onClick={
                    () => {
                        navigate('/login');
                    }

                }
                >
                <p>Have an account?</p>
                <button>Sign In</button>
                </Container>
            </Container>
        </Container>
    );
}

export default SignUp;