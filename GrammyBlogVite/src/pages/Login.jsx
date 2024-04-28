import { useState } from 'react';
import CryptoJS from 'crypto-js';
import useNavigate from '../hooks/useNavigate'
import useToken  from '../hooks/useToken'
import '@styles/Login.css'

function Login() {
const { navigate } = useNavigate();
const [username, setUsername] = useState('');
const [password, setPassword] = useState('');
const { setToken } = useToken(); 

const login = async () => {
    const response = await fetch("http://localhost:22249/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: CryptoJS.MD5(password).toString()
        })
    });

    if (response.ok) {
        const data = await response.json();

        setToken(data.access_token); 
        
        navigate('/admin');
        window.location.replace('#/admin')
    } else {
        alert("Invalid user, please try again!");
    }
};

return (
    <div className='main-container'>
        <div className="login-container">
            <div className= "login-form">
                <h1>Login</h1>
                <p>
                    <input type="text" placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
                </p>
                <p>
                    <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
                </p>
                <p>
                    <button onClick={login}>Login</button>
                </p>
                <p>
                    Not a member? <a href="#signup">SignUp</a>
                </p>
            </div>
        </div>
    </div>
);
}

export default Login;
