import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoutes = ({children}) => {
    const location = useLocation();
    const {user, loading} = useContext(AuthContext);
    if(loading) {
        return <div>
            <span className="loading loading-bars loading-lg"></span>
        </div>
    }
    if(user) {
        return children
    }
    return <Navigate to={'/login'} state={{from: location}} replace></Navigate>;
};

export default PrivateRoutes;