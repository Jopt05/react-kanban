import { createContext, useEffect, useReducer } from "react";
import { authReducer } from "../reducers/auth.reducer";
import { useNavigate } from "react-router-dom";
import kanbanApi from "../api/kanban.api";

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
    signIn: (email: string, id: string) => void;
    signOut: () => void;
}

export const AuthContext = createContext({} as AuthContextProps);

export const AuthProvider = ({children}: any) => {

    const [authState, dispatch] = useReducer(authReducer, authInitialState);

    const navigate = useNavigate()

    useEffect(() => {
        validateAuth()
    }, [])

    const validateAuth = async() => {
        try {
            const token = localStorage.getItem('token');
            if (!token) return
            
            const response = await kanbanApi.get('/users/me', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if(response.data) {
                dispatch({ type: 'signIn', payload: { email: response.data.email, id: response.data.id } })
                navigate('/')
                return
            }
            dispatch({type: "signOut"})
        } catch (error) {
            console.log(error)
            dispatch({type: "signOut"})
            navigate('/login')
        }
    }

    const signIn = (email: string, id: string) => {
        dispatch({ type: 'signIn', payload: { email, id } })
    }

    const signOut = () => {
        dispatch({ type: 'signOut' })
    }

    return (
        <AuthContext.Provider
            value={{
                authState,
                signIn,
                signOut
            }}
        >
            {children}
        </AuthContext.Provider>
    )

}