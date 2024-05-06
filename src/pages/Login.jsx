
import CryptoJS from 'crypto-js';
import useNavigate from '@hooks/useNavigate'
import useToken  from '@hooks/useToken'
import '@styles/Login.css'
import useForm from '@hooks/useForm' 
import { validateLogin } from '@utils/validation.js'  

function Login() {
const { navigate } = useNavigate();
const { setToken } = useToken(); 
const initialValues = { username: '', password: '' };

const {
    values,
    handleChange,
    handleSubmit: handleFormSubmit,
    errors
} = useForm(initialValues, validateLogin);

const login = async () => {
    const response = await fetch("http://localhost:22249/login", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: values.username,
            password: CryptoJS.MD5(values.password).toString()
        })
    });

    if (response.ok) {
        const data = await response.json();
        setToken(data.access_token);
        navigate('/admin');
        window.location.replace('#/admin');
    } else {
        alert("Invalid user, please try again!");
    }
};

const handleSubmit = async (event) => {
    handleFormSubmit(event); 
    if (Object.keys(errors).length === 0) {
        login(); 
    }
};

return (
    <div className='main-login-container'>
        <div className="login-container">
            <div className="login-form">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <p>
                        <input type="text" name="username" placeholder="Username" value={values.username} onChange={handleChange} />
                        {errors.username && <span className="error-message">{errors.username}</span>}
                    </p>
                    <p>
                        <input type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange} />
                        {errors.password && <span className="error-message">{errors.password}</span>}
                    </p>
                    <p>
                        <button type="submit">Login</button>
                    </p>
                </form>
                <p>
                    Not a member? <a href="#/register" onClick={(e) => navigate('/register')} className="navigation-link">Register</a>
                </p>
            </div>
        </div>
    </div>
);
}

export default Login;
