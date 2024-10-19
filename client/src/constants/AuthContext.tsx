import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import CONSTANTS from "./constants";

interface AuthContextInterface {
    isLoggedin: boolean;
    login: () => void;
    logout: () => void

}
interface AuthProviderContexInterface {
    children: ReactNode
}

const AuthContext = createContext<AuthContextInterface | undefined>(undefined)


export const AuthProvider: React.FC<AuthProviderContexInterface> = ({ children }) => {
    const [isLoggedin, setIsLoggedIn] = useState<boolean>(false)

    useEffect(() => {
        console.log("auth context");
        
        const getToken = sessionStorage.getItem(CONSTANTS.SESSION_STORAGE.TOKEN)
        if (getToken) {
            setIsLoggedIn(true)
        } else {
            setIsLoggedIn(false)
        }
    }, [])

    const login = () => setIsLoggedIn(true)
    const logout = () => setIsLoggedIn(false)

    return (
        <AuthContext.Provider value={{ isLoggedin, login, logout }} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = (): AuthContextInterface => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('context error')
    }
    return context
}