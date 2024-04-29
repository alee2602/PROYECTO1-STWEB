import { useState, useEffect, createContext, useContext } from 'react';

const TokenContext = createContext();

const TokenProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('access_token') || '');

    useEffect(() => {
        if (token) {
            localStorage.setItem('access_token', token);
        } else {
            localStorage.removeItem('access_token');
        }
    }, [token]);

    const isLoggedIn = !!token;

    const decodedToken = () => {
        if (!token) return null;

        try {
            const base64Url = token.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
                return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            }).join(''));

            return JSON.parse(jsonPayload);
        } catch (error) {
            console.error("Error parsing JWT", error);
            return null;
        }
    };

    return (
        <TokenContext.Provider value={{ token, setToken, isLoggedIn, decodedToken }}>
            {children}
        </TokenContext.Provider>
    );
};

const useToken = () => {
    return useContext(TokenContext)
}

export default useToken
export { TokenContext, TokenProvider }