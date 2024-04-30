
import CryptoJS from 'crypto-js';
import useNavigate from '../hooks/useNavigate';
import useForm from '@hooks/useForm' 
import '@styles/Register.css'; 
import { validateRegister } from '@utils/validation.js' 

function Register() {
    const { navigate } = useNavigate();
    const initialValues = { username: '', password: '', name: '', email: '' };

    const {
        values,
        handleChange,
        handleSubmit: handleFormSubmit,
        errors
    } = useForm(initialValues, validateRegister);


    const register = async () => {
    const response = await fetch("http://localhost:22249/register", {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        name: values.name,
        email: values.email,
        username: values.username,
        password: CryptoJS.MD5(values.password).toString(),
    })
});

    if (response.ok) {
        navigate('/login'); 
        window.location.replace('#/login')
    } else {
    const data = await response.json();
    setErrorMessage(data.message || "Failed to register. Please try again!"); 
    }
};

const handleSubmit = async (event) => {
    handleFormSubmit(event); 
    if (Object.keys(errors).length === 0) {
        register(); 
    }
};

return (
    <div className='main-container'>
        <div className="register-container">
            <div className="register-form">
                <h1>Register</h1>
                <form onSubmit={handleSubmit}>
                <p>
                    <input type="text" name="name" placeholder="Name" value={values.name} onChange={handleChange} />
                    {errors.name && <span className="error-output">{errors.name}</span>}
                </p>
                <p>
                    <input type="email" name="email" placeholder="Email" value={values.email} onChange={handleChange} />
                    {errors.email && <span className="error-output">{errors.email}</span>}
                </p>
                <p>
                    <input type="text" name="username" placeholder="Username" value={values.username} onChange={handleChange} />
                    {errors.username && <span className="error-output">{errors.username}</span>}
                </p>
                <p>
                    <input type="password" name="password" placeholder="Password" value={values.password} onChange={handleChange} />
                    {errors.password && <span className="error-output">{errors.password}</span>}
                </p>
                    <button type="submit">Register</button>
                </form>
                <p>
                    Already a member? <a href="#/login" onClick={(e) => navigate('/login')} className="navigation-link">Login</a>
                </p>
            </div>
        </div>
    </div>
);
}

export default Register;