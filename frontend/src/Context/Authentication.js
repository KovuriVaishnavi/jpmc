import axios from 'axios';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);
    const [userDetails, setUserDetails] = useState({});
    const navigate = useNavigate(); 


    //login
    const loginAction = async (data) => {
        try {
            const response = await axios.post("http://localhost:3000/api/users/login", { ...data });
            console.log('Response data:', response.data);
            const { token, user } = response.data;
            setToken(token);
            setUser(user);
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            return user;
        } catch (err) {
            console.error('Login error:', err);
        }
    };

    useEffect(() => {
        const savedToken = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");  
        if (savedToken) {
            setToken(savedToken);
        }
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error('Error parsing saved user:', error);
                setUser(null); 
            }
        }
        
    }, []);
    
    


    //logout
    const logOut = async () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
         
        setToken(null);
        setUser(null);
        navigate('/'); 
        console.log('Token and user details removed from localStorage');
    }

    return (
        <AuthContext.Provider value={{ token, user, loginAction, logOut }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
export const useAuth = () => {
    return useContext(AuthContext);
};