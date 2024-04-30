import { useEffect } from 'react';
import useNavigate from '../hooks/useNavigate';
import useToken from '../hooks/useToken';

function Logout() {
    const { navigate } = useNavigate();
    const { setToken } = useToken(); 

    useEffect(() => {
        const logout = async () => {
            localStorage.removeItem('access_token'); 
            setToken(null); 

            await new Promise(resolve => setTimeout(resolve, 2000)); 
            
            navigate('/login');
        };

        logout(); 
    }, [navigate, setToken]);


    return <h1 style={{ color: 'red', textAlign: 'center' }}>Logging Out...</h1>;

}

export default Logout;
