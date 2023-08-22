import { Navigate, Outlet} from "react-router-dom"
import useAuth from "../hooks/useAuth"

const PrivateRouter = () => {
    const auth = useAuth()
    return (
        auth ? <Outlet /> : <Navigate to='login' />
    )
}

export default PrivateRouter