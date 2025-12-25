import { useState } from "react"

const useForm = <T extends object>(initialState: T) => {
    const [form, setForm] = useState<T>(initialState)
    const [formErrors, setFormErrors] = useState<{[key: string]: boolean}>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const name = e.target.name;
        form[name as keyof T] === '' ? setFormErrors({...formErrors, [name]: true}) : setFormErrors({...formErrors, [name]: false}) 
    }

    const resetForm = () => {
        setForm(initialState);
        setFormErrors({});
    }

    return {
        form,
        handleChange,
        handleBlur,
        resetForm,
        formErrors
    }
}

export default useForm