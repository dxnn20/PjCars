import React from "react";
import {Container, FormControl} from "@mui/material";
import {useNavigate} from "react-router-dom";

const SignUp: React.FC = () => {

    const navigate = useNavigate();

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
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        required
                    />
                    <button>Sign Up</button>
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