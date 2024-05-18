import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../Entities/User';

interface AuthContextType {
    auth: User | null;
    setAuth: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [auth, setAuth] = useState<User | null>(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    useEffect(() => {
        if (auth) {
            localStorage.setItem('user', JSON.stringify(auth));
        } else {
            localStorage.removeItem('user');
        }
    }, [auth]);

    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
