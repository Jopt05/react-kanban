import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home.page"
import { Login } from "../pages/Login.page"
import PrivateRoute from "../shared/routes/PrivateRoute"

export const AppRouter = () => {
    return (
        <Routes>
            <Route element={<PrivateRoute />}>
                <Route path="/" element={<Home />} />
            </Route>
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}