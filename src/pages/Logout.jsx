import { useEffect } from 'react';
import useNavigate from '../hooks/useNavigate';
import useToken from '../hooks/useToken';

function Logout() {
    const { navigate } = useNavigate();
    const { setToken } = useToken(); 

    useEffect(() => {
        setToken(null); 
        localStorage.removeItem('access_token'); 
        navigate('/'); 
    }, [navigate, setToken]);

}

export default Logout;
