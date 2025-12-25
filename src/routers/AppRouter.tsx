import { Route, Routes } from "react-router-dom"
import { Home } from "../pages/Home.page"
import { Login } from "../pages/Login.page"

export const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
        </Routes>
    )
}