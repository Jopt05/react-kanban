import { useContext } from "react"
import { AuthContext } from "../../context/auth.context"
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = () => {

    const { authState } = useContext( AuthContext );

    if( authState.isLoggedIn ) {
        return <Outlet />
    }
    
    return <Navigate to="/login" replace/>

}

export default PrivateRoute