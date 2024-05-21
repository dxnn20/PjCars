import React, {useRef} from "react";
import {Container, FormControl} from "@mui/material";
import {useNavigate} from "react-router-dom";
import axiosInstance from "../Axios/axiosInstance";
import {User} from "../Entities/User";

const SignUp: React.FC = () => {

    const navigate = useNavigate();
    const [username, setUsername] = React.useState<string>('');
    const [password, setPassword] = React.useState<string>('');
    const [errMsg, setErrMsg] = React.useState<string>('');
    const errRef = useRef<HTMLParagraphElement>(null);
    const [success, setSuccess] = React.useState<boolean>(false);

    const handleSubmit = async () => {

        try {
            const response = await axiosInstance.post<User>('http://localhost:8081/security/sign-up', {},{
                params: {
                username: username,
                password: password
            }
            });
            console.log(response.data);
            setUsername('');
            setPassword('');
            setSuccess(true);
            navigate('/login');
        } catch (err : any) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Username already exists');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current?.focus();
        }
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

            {!success ? (
                <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                    {errMsg}
                </p>

            ) : (
                <>
                    <p>Sign Up Successful!</p>
                </>
            )
            }

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