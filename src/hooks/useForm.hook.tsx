import { useState } from "react"


const useForm = <T extends object>(initialState: T) => {
    const [form, setForm] = useState<T>(initialState)
    const [formErrors, setFormErrors] = useState<Record<keyof T, boolean>>(
        Object.keys(initialState).reduce((acc, key) => {
            acc[key as keyof T] = false;
            return acc;
        }, {} as Record<keyof T, boolean>)
    );

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const name = e.target.name;
        form[name as keyof T] === '' ? setFormErrors((prev) => ({...prev, [name]: true})) : setFormErrors((prev) => ({...prev, [name]: false})) 
    }

    const resetForm = () => {
        setForm(initialState);
        setFormErrors(
            Object.keys(initialState).reduce((acc, key) => {
                acc[key as keyof T] = false;
                return acc;
            }, {} as Record<keyof T, boolean>)
        );
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