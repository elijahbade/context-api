import React, {createContext, useState, useContext, ReactNode} from "react";


interface User {
    username: string;
}
interface AuthContextType {
    isAuthenticated: boolean;
    user: User | null; 
    login: (UserData: User) => void;
    logout: () => void;

}

const AuthContext = createContext <AuthContextType| undefined>(undefined); 


export const AuthProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState<User | null> (null); 

    const login = (userData: User) => {
        setUser(userData); 
        setIsAuthenticated(true); 
        };
    
        const logout = () => {
            setUser(null);
            setIsAuthenticated(false);
        };
    
    return (
        <AuthContext.Provider value= {{isAuthenticated, user, login, logout}}>
        {children}
        </AuthContext.Provider>
    );

}; 

export const useAuth = (): AuthContextType => { 
    const context = useContext(AuthContext); 
    if (!context) {
        throw new Error ('useAuth must be used within an AuthProvider');
    }
    return context;
}; 

