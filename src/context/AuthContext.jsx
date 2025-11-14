import React, { createContext, useEffect, useState, useCallback } from "react";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    const loadUserFromStorage = useCallback(() => {
        try {
            const access = localStorage.getItem("access_token");
            const refresh = localStorage.getItem("refresh_token");

            if (!access || !refresh) {
                setUser(null);
                return;
            }

            const decoded = jwt_decode(access);
            const now = Math.floor(Date.now() / 1000);

            if (decoded.exp < now) {
                refreshAccessToken(refresh);
            } else {
                setUser({ access, refresh, ...decoded });
            }
        } catch {
            setUser(null);
        }
    }, []);

    const refreshAccessToken = async (refreshToken) => {
        try {
            const res = await api.post("/auth/refresh", {
                refresh_token: refreshToken,
            });

            const newAccess = res.data.access_token;
            const decoded = jwt_decode(newAccess);

            localStorage.setItem("access_token", newAccess);

            setUser({
                access: newAccess,
                refresh: refreshToken,
                ...decoded,
            });

            return newAccess;

        } catch (err) {
            console.error("Error refrescando token:", err);
            logout();
            return null;
        }
    };

    const login = (accessToken, refreshToken) => {
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);

        const decoded = jwt_decode(accessToken);

        setUser({
            access: accessToken,
            refresh: refreshToken,
            ...decoded
        });

        navigate("/");
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        setUser(null);
        navigate("/login");
    };

    useEffect(() => {
        if (!user) return;

        const now = Math.floor(Date.now() / 1000);
        const exp = user.exp;

        const expiresIn = exp - now;

        if (expiresIn <= 0) {
            refreshAccessToken(user.refresh);
            return;
        }

        const timer = setTimeout(() => {
            refreshAccessToken(user.refresh);
        }, expiresIn * 1000);

        return () => clearTimeout(timer);
    }, [user]);

    useEffect(() => {
        loadUserFromStorage();
        setLoading(false);
    }, [loadUserFromStorage]);

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                login,
                logout,
                refreshAccessToken,
                isAuthenticated: !!user,
            }}
        >
            {!loading && children}
        </AuthContext.Provider>
    );
}