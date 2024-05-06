import {useState} from 'react';

function useForm (initialValues, validate) {
    //Estado inicial de los valores y errores
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})

    //Función que maneja los cambios del formulario
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

    //Función que maneja todos los valores que se mandan en un formulario
    const handleSubmit = (event) => {
        event.preventDefault()
        if (validate){
            const validationErrors = validate(values) //Realiza la validación antes de mandar el formulario 
            setErrors(validationErrors)
            if(Object.keys(validationErrors.length>0)) //Si existen errores, no envia el formulario
            return
        }
    }
    return {values, handleChange, handleSubmit, errors} 
}

export default useForm