import React, {useContext} from 'react';
import {useRef, useState, useEffect} from 'react';
import AuthContext from "../Context/AuthProvider";
import axios from 'axios';

const LOGIN_URL='http://localhost:8081/security/sign-in';


const Login = () => {

    const {setAuth} = useContext(AuthContext);
    const userRef=useRef();
    const errRef = useRef();
    var formData = new FormData();

    const [user, setUser] = useState("");
    const [pwd, setPwd] = useState("");
    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);



    useEffect(() => {
        userRef.current.focus();
    },[])

    useEffect(()=>{
        setErrMsg('');
    } , [user,pwd])

    const handleSubmit = async (e) => {
        console.log('Got here');
        e.preventDefault();
        formData.append('username', user);
        formData.append('password', pwd);

        const requestOptions = {
            method: 'POST',
            header: {'Content-Type': 'application/json'},
            body: formData,
        };

        try{

            // const response = await axios.get('http://localhost:8081/cars/all');
            fetch('http://localhost:8081/security/sign-in', requestOptions).then(response => response.json()).then(data => console.log(data));
            // console.log(JSON.stringfy(response?.data) + 'got here');
            // console.log(JSON.stringfy(response));
            // const accessToken = response?.data?.accessToken;
            // const roles = response?.data?.roles;
            // setAuth({user, pwd, roles, accessToken});
            setUser('');
            setPwd('');
            setSuccess(true);
        }catch(err){
            if(!err?.response){
                setErrMsg('No Server Response');
            } else if(err.response?.status===400){
                setErrMsg('Missing Username or Password');
            } else if(err.response?.status === 401){
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }



    }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                <br/>
                    <p>
                        <a href="#">Go to Home</a>
                    </p>
                </section>
            ) : (


        <section>
            <p ref={errRef} className={errMsg ? "errmsg" :
                "offscreen"} aria-live="assertive">{errMsg}</p>
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
            <button>Sign in</button>
            </form>
            <p>
                Need an Account? <br/>
                <span className='line'>
                    <a href='#'>Sign up</a>
                </span>
            </p>
        </section>
            )}
            </>
    );
}

export default Login;