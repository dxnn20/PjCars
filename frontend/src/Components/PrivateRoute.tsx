// src/components/PrivateRoute.tsx
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../Context/AuthProvider';

interface PrivateRouteProps {
    children: JSX.Element;
    requiredRole?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, requiredRole }) => {
    const authContext = useContext(AuthContext);

    if (!authContext) {
        throw new Error("AuthContext must be used within an AuthProvider");
    }

    const { auth } = authContext;

    if (!auth) {
        return <Navigate to="/login" replace />;
    }

    if (requiredRole && auth.role !== requiredRole) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default PrivateRoute;
