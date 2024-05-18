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
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br/>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? "errmsg" : "offscreen"} aria-live="assertive">
                        {errMsg}
                    </p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        <button>Sign In</button>
                    </form>
                    <p>
                        Need an Account? <br/>
                        <span className="line">
                            <button
                                style={{
                                    backgroundColor: 'transparent',
                                    border: '1px solid green',
                                    maxWidth: '100px',
                                    cursor: 'pointer',
                                    padding: '0',
                                    textDecoration: 'none',

                                }}
                                onClick={
                                    () => {
                                        navigate('/sign-up');
                                    }
                                }
                            >
                                <p
                                    style={{
                                        color: 'green',
                                        padding: '8px',
                                        margin: '0',

                                    }}
                                >Sign Up</p>
                            </button>
                        </span>
                    </p>
                </section>
            )}
        </>
    );
};

export default Login;
