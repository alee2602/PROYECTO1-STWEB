
export const validateLogin = (values) => {
    let errors = {}
    if (!values.username) {
        errors.username = 'Username is required'
    }
    if (!values.password) {
        errors.password = "Password is required"
    }
    return errors;
}

export const validateRegister = (values) => {
    let errors = {};
    if (!values.name) {
        errors.name = 'Name is required';
    }
    if (!values.email) {
        errors.email = 'Email address is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) { 
        errors.email = 'Email address is invalid';
    }

    if (!values.username) {
        errors.username = 'Username is required';
    }

    if (!values.password) {
        errors.password = 'Password is required';
    }
    return errors;
};