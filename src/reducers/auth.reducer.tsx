import type { AuthState } from "../context/auth.context";

type AuthAction = 
    {type: 'signIn', payload: { email: string, id: string }} | 
    { type: 'signOut' }


export const authReducer = (state: AuthState, action: AuthAction): AuthState => {
    switch (action.type) {
        case 'signIn':
            return {
                isLoggedIn: true,
                email: action.payload.email,
                id: action.payload.id
            }
        case 'signOut':
            return {
                isLoggedIn: false,
                email: undefined,
                id: undefined
            }
        default:
            return state
    }
}