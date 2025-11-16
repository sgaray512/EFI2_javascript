import React, { useContext, useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({ children, roles = [] }) {
    const { user, logout } = useContext(AuthContext);
    const location = useLocation();

    if (!user || !localStorage.getItem("token")) {
        logout();
        return <Navigate to="/login" replace state={{ from: location }} />;
    }

    if (roles.length > 0 && (!user.role || !roles.includes(user.role))) {
        return <Navigate to="/" replace />;
    }

    return children;
}