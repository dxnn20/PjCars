// src/App.tsx
import React from 'react';
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
import Login from './Login/Login';
import Admin from './Admin/Admin';
import PrivateRoute from './Components/PrivateRoute';
import User from "./User/User";
import NotFound from "./NotFound/NotFound";
import SignUp from "./SingUp/SignUp";
import Company from "./Company/Company";
import './App.css';

const App: React.FC = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login/>}/>
            <Route path="/" element={<Login/>}/>
            <Route path="/admin" element={<PrivateRoute requiredRole={
                'ADMIN'
            } children={<Admin/>
            }/>}>
            </Route>
            <Route path="/user" element={<PrivateRoute requiredRole={
                'USER'
            } children={<User/>
            }/>}>
            </Route>
            <Route path="/company" element={<PrivateRoute requiredRole={
                'COMPANY'
            } children={<Company/>
            }/>}>
            </Route>
            <Route path="*" element={<NotFound />} />
            <Route path={"/sign-up"} element={<SignUp/>}/>
        </Routes>
    );
};

export default App;
