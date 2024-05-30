import React, {useContext, useRef, useState, useEffect} from 'react';
import AuthContext from "../Context/AuthProvider";
import {User} from "../Entities/User";
import './Login.css';
import {useNavigate} from 'react-router-dom';
import axiosInstance from '../Axios/axiosInstance';

const LOGIN_URL = 'http://localhost:8081/security/sign-in';

const Login: React.FC = () => {

    const navigate = useNavigate();
    const authContext = useContext(AuthContext);

    let currentAxiosInstance = axiosInstance;

    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }

    const {setAuth} = authContext;
    const userRef = useRef<HTMLInputElement>(null);
    const errRef = useRef<HTMLParagraphElement>(null);

    const [user, setUser] = useState<string>('');
    const [pwd, setPwd] = useState<string>('');
    const [errMsg, setErrMsg] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);

    useEffect(() => {
        userRef.current?.focus();
    }, []);

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd]);

    // function to handle form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await currentAxiosInstance.post<User>(LOGIN_URL, null, {
                params: {username: user, password: pwd},
            });

            console.log(response.data);
            setAuth(response.data);
            setUser('');
            setPwd('');
            setSuccess(true);

            switch (response.data.role) {
                case 'ADMIN':
                    navigate('/admin');
                    break;
                case 'USER':
                    window.location.href = '/user';
                    break;
                case 'COMPANY':
                    window.location.href = '/company';
                    break;
                default:
                    window.location.href = '/';
            }

        } catch (err: any) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current?.focus();
        }
    };

    return (
        <div className="min-h-screen h-dvh w-dvw overflow-x-hidden flex flex-col">
            <div className="w-full max-w-md bg-white rounded-lg justify-center mx-auto shadow-md mt-11 p-6">
                {success ? (
                    <section>
                        <h1 className="text-2xl font-semibold text-center">You are logged in!</h1>
                        <h2 className="text-xl text-center">Redirecting...</h2>
                    </section>
                ) : (
                    <section>
                        <p ref={errRef} className={errMsg ? "text-red-500 text-center mt-4" : "hidden"} aria-live="assertive">
                            {errMsg}
                        </p>
                        <h1 className="text-2xl font-semibold text-center">Sign In</h1>
                        <form onSubmit={handleSubmit} className="space-y-4 mt-8">
                            <div className="flex flex-col space-y-4">
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                                        Username:
                                    </label>
                                    <input
                                        type="text"
                                        id="username"
                                        autoComplete="off"
                                        onChange={(e) => setUser(e.target.value)}
                                        value={user}
                                        required
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
                                        onChange={(e) => setPwd(e.target.value)}
                                        value={pwd}
                                        required
                                        className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
                                    />
                                </div>
                            </div>
                            <button
                                type="submit"
                                className="w-full btn md:w-auto inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                Sign In
                            </button>
                        </form>
                        <p className="mt-6 text-center">
                            Need an Account? <br />
                            <button
                                onClick={() => navigate('/sign-up')}
                                className="btn btn-link text-indigo-600 hover:text-indigo-700 mt-2"
                            >
                                Sign Up
                            </button>
                        </p>
                    </section>
                )}
            </div>
        </div>
    );
};

export default Login;
