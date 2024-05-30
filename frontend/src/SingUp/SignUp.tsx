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
        <div className="min-h-screen h-dvh w-dvw overflow-x-hidden flex flex-col">
            <div className="w-full max-w-md bg-white rounded-lg justify-center mx-auto shadow-md mt-11 p-6">
                <h1 className="text-2xl font-semibold text-center">Sign Up</h1>
                {!success ? (
                    <p ref={errRef} className={errMsg ? "text-red-500 text-center mt-4" : "hidden"} aria-live="assertive">
                        {errMsg}
                    </p>
                ) : (
                    <p className="text-green-500 text-center mt-4">Sign Up Successful!</p>
                )}
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}
                    className="space-y-4 mt-8"
                >
                    <div className="flex flex-col space-y-4">
                        <div>
                            <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                Username:
                            </label>
                            <input
                                type="text"
                                id="username"
                                autoComplete="off"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                Password:
                            </label>
                            <input
                                type="password"
                                id="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full btn md:w-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                    >
                        Sign Up
                    </button>
                </form>
                <div className="mt-6 text-center">
                    <p>Have an account?</p>
                    <button
                        onClick={() => navigate('/login')}
                        className="btn btn-link text-indigo-600 hover:text-indigo-700"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </div>
    );
}

export default SignUp;