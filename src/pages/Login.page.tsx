import React, { useEffect, useState } from 'react'
import useForm from '../hooks/useForm.hook'
import useFetch from '../hooks/useFetch.hook';
import loadingGif from '../assets/loader.gif';
import { useNavigate } from 'react-router-dom';

export const Login = () => {

    const { form, handleChange, handleBlur, formErrors } = useForm({
        email: '',
        password: '',
        name: '',
    });
    const { handlePost, fetchState } = useFetch();

    const [isRegistering, setIsRegistering] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if( fetchState?.data ) {
            localStorage.setItem('token', fetchState?.data.token);
            navigate('/');
        }
    }, [fetchState?.data]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(isRegistering) {
            handleRegister();
        } else {
            handleLogin();
        }
    }

    const handleLogin = async() => {
        const formData = {
            email: form.email,
            password: form.password
        }
        await handlePost({endpoint: '/auth/login', body: formData});
    }

    const handleRegister = async() => {
        const formData = {
            email: form.email,
            password: form.password,
            name: form.name
        };
        await handlePost({endpoint: '/users', body: formData});
        setIsRegistering(false);
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
                <input 
                    type="password" 
                    className= {`shadow appearance-none border rounded w-full py-2 px-3 text-white leading-tight focus:outline-none focus:shadow-outline ${formErrors?.password && 'border-red-500'}`} 
                    placeholder='Password' 
                    name='password'
                    value={form.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                />
            </div>
            {
                fetchState.error && (
                    <p
                        className='text-red-400 text-sm mb-4 capitalize text-center'
                    >
                        {fetchState?.error}
                    </p>
                )
            }
            <button     
                type='submit' 
                className='bg-[#6260c5] hover:bg-[#4a499c] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline cursor-pointer'
            >
                {
                    fetchState.loading 
                    ?
                        <img src={loadingGif} alt='loading' className='w-8'></img>
                    :
                        isRegistering ? 'Register' : 'Login'
                }
            </button>
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