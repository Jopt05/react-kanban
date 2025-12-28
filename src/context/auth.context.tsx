import { createContext, useEffect, useContext, useReducer } from "react";
import { authReducer } from "../reducers/auth.reducer";
import { useNavigate } from "react-router-dom";
import kanbanApi from "../api/kanban.api";
import { LoaderContext } from "./loader.context";

export interface AuthState {
    isLoggedIn: boolean;
    email?:     string;
    id?:        string;
}

export const authInitialState: AuthState = {
    isLoggedIn: false
};

export interface AuthContextProps {
    authState: AuthState;
    signIn: (email: string, password: string) => Promise<void | any>;
    register: (email: string, password: string, name: string) => Promise<void | any>;
    signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {

    const { showLoader, hideLoader } = useContext( LoaderContext );
    const [authState, dispatch] = useReducer(authReducer, authInitialState);

    const navigate = useNavigate()

    useEffect(() => {
        validateAuth()
    }, [])

    const validateAuth = async() => {
        try {
            showLoader()
            const token = localStorage.getItem('token');
            if (!token) return
            
            const response = await kanbanApi.get('/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if(response.data) {
                dispatch({ type: 'signIn', payload: { email: response.data.email, id: response.data.id } })
                navigate('/', { replace: true })
                return
            }
            dispatch({type: "signOut"})
        } catch (error) {
            console.log(error)
            dispatch({type: "signOut"})
            navigate('/login')
        } finally {
            hideLoader()
        }
    }

    const signIn = async(email: string, password: string) => {
        showLoader();
        try {
            const response = await kanbanApi.post('/auth/login', { email, password });

            if(response.data) {
                localStorage.setItem('token', response.data.token);
                dispatch({ type: 'signIn', payload: { email: response.data.email, id: response.data.id } })
                navigate('/', { replace: true })
                return
            }
        } catch (error) {
            console.log(error)
            return error
        } finally {
            hideLoader()
        }
    }   

    const register = async(email: string, password: string, name: string) => {
        showLoader();
        try {
            const response = await kanbanApi.post('/users', { email, password, name });

            if(response.data) {
                localStorage.setItem('token', response.data.token);
                dispatch({ type: 'signIn', payload: { email: response.data.user.email, id: response.data.user.id } })
                navigate('/', { replace: true })
                return
            }
        } catch (error) {
            console.log(error)
            return error
        } finally {
            hideLoader()
        }
    }

    const signOut = () => {
        localStorage.removeItem('token')
        dispatch({ type: 'signOut' })
        navigate('/login')
    }

    return (
        <AuthContext.Provider
            value={{
                authState,
                signIn,
                register,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}