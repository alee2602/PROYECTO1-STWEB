import {useState} from 'react';

function useForm (initialValues, validate) {
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})

    const handleChange = (event) => {
        const{name, value} = event.target

        setValues(values => {
            const newValues = { ...values, [name]: value };
            
            if (validate) {
                const validationErrors = validate(newValues);
                setErrors(validationErrors);
            }

            return newValues;
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        if (validate){
            const validationErrors = validate(values)
            setErrors(validationErrors)
            if(Object.keys(validationErrors.length>0)) 
            return
        }
    }
    return {values, handleChange, handleSubmit, errors}
}

export default useForm