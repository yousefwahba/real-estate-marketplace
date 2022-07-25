import { Navigate,Outlet } from "react-router-dom"
import useAuthStatus from "../hooks/useAuthStatus";


const PrivateRoute = () => {
    const {loggedIn,chekingStatus} = useAuthStatus()
    if(chekingStatus){
        return <div>Loading...</div>
    }
    return loggedIn?<Outlet />:<Navigate to="/sign-in" />
}

export default PrivateRoute