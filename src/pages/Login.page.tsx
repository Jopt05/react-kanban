import React, { useContext, useState } from 'react'
import useForm from '../hooks/useForm.hook'
import { AuthContext } from '../context/auth.context';

export const Login = () => {

    const { signIn, register } = useContext( AuthContext );

    const { form, handleChange, handleBlur, formErrors } = useForm({
        email: '',
        password: '',
        name: '',
    });

    const [isRegistering, setIsRegistering] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errMsg, setErrMsg] = useState("");

    const handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(isRegistering) {
            await handleRegister();
        } else {
            await handleLogin();
        }
    }

    const handleLogin = async() => {
        const formData = {
            email: form.email,
            password: form.password
        }
        const response = await signIn(formData.email, formData.password);
        if(response) {
            setErrMsg(getErrorMessage(response));
        }
    }

    const handleRegister = async() => {
        const formData = {
            email: form.email,
            password: form.password,
            name: form.name
        };
        const response = await register(formData.email, formData.password, formData.name);
        if(response) {
            setErrMsg(getErrorMessage(response));
        }
        setIsRegistering(false);
    }

    const getErrorMessage = (error: any) => {
        if( error?.response?.data?.message ) {
            const msg = error.response.data.message;
            return (Array.isArray(msg) ? msg[0] : msg);
        }
        return error.message;
    }

  return (
    <div
        className='flex flex-col justify-center items-center py-10 px-5 w-full h-screen'
    >
        <h1
            className='text-4xl font-bold mb-6 text-white text-center'
        >
            Kanban
        </h1>
        <form
            className='flex flex-col items-center justify-center bg-[#2b2c37] p-10 rounded-lg lg:w-[40%] w-[90%]'
            onSubmit={handleSubmit}
        >
            <p 
                className='text-2xl font-bold mb-6 text-white text-center'
            >
                {isRegistering ? 'Register' : 'Login'}
            </p>
            {
                isRegistering && (
                    <div className='mb-6 w-full'>
                        <label className='block text-white text-sm font-bold mb-2'>Name</label>
                        <input 
                            type="text" 
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline ${formErrors?.name && 'border-red-500'}`} 
                            placeholder='Name' 
                            name='name'
                            value={form.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                        />
                    </div>
                )
            }
            <div className='mb-6 w-full'>
                <label className='block text-white text-sm font-bold mb-2'>Email</label>
                <input 
                    type="email" 
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline ${formErrors?.email && 'border-red-500'}`} 
                    placeholder='Email' 
                    name='email'
                    value={form.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </div>
            <div className='mb-6 w-full'>
                <label className='block text-white text-sm font-bold mb-2'>Password</label>
                <div
                    className= {`flex items-center shadow appearance-none border rounded w-full py-1 px-3 text-white leading-tight focus:outline-none focus:shadow-outline ${formErrors?.password && 'border-red-500'}`} 
                >
                    <input 
                        type={showPassword ? 'text' : 'password'} 
                        placeholder='Password' 
                        name='password'
                        className='w-full outline-none'
                        value={form.password}
                        onChange={handleChange}
                        onBlur={handleBlur}
                    />
                    <i 
                        className={
                            `bx ${showPassword ? 'bx-low-vision' : 'bx-eye'} p-1.5 cursor-pointer bg-gray-600 opacity-50 rounded-full`
                        } 
                        onClick={() => setShowPassword(!showPassword)}
                    ></i> 
                </div>
            </div>
            <button     
                type='submit' 
                className='bg-[#6260c5] hover:bg-[#4a499c] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer'
            >
                {
                    isRegistering ? 'Register' : 'Login'
                }
            </button>
            {
                errMsg && (
                    <p className='text-red-500 mt-5 text-center'>{errMsg}</p>
                )
            }
        </form>
        {
            isRegistering && (
                <p
                    className='text-white text-center mt-6'
                >
                    Already have an account? <button className='text-[#6260c5] hover:underline' onClick={() => setIsRegistering(false)}>Login</button>
                </p>
            )
        }
        {
            !isRegistering && (
                <p
                    className='text-white text-center mt-6'
                >
                    Don't have an account? <button className='text-[#6260c5] hover:underline' onClick={() => setIsRegistering(true)}>Register</button>
                </p>
            )
        }
    </div>
  )
}