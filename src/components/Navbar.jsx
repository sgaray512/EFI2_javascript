import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { useAuth } from "../context/AuthContext";

function Navbar() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleNavigate = (path) => {
        navigate(path);
        setMenuOpen(false);
    };

    return (
        <nav className="navbar">
            {/* Logo */}
            <div className="logo" onClick={() => handleNavigate("/")}>
                Miniblog
            </div>

            {/* Desktop Menu */}
            <ul className="nav-links desktop-only">

                <li onClick={() => handleNavigate("/")}>Inicio</li>
                <li onClick={() => handleNavigate("/posts")}>Posts</li>

                {/* Crear post solo si está logueado */}
                {user && (user.role === "user" || user.role === "admin") && (
                    <li onClick={() => handleNavigate("/posts/nuevo")}>
                        Crear Post
                    </li>
                )}

                {/* Opciones para admin */}
                {user?.role === "admin" && (
                    <li onClick={() => handleNavigate("/admin")}>
                        Panel Admin
                    </li>
                )}

                {/* Opciones para moderador */}
                {(user?.role === "admin" || user?.role === "moderator") && (
                    <li onClick={() => handleNavigate("/categorias")}>
                        Categorías
                    </li>
                )}

            </ul>

            {/* User Section */}
            <div className="user-section desktop-only">
                {!user ? (
                    <>
                        <Button
                            label="Login"
                            icon="pi pi-sign-in"
                            onClick={() => handleNavigate("/login")}
                        />
                        <Button
                            label="Registro"
                            icon="pi pi-user-plus"
                            className="p-button-secondary"
                            onClick={() => handleNavigate("/registrarse")}
                        />
                    </>
                ) : (
                    <>
                        <span className="user-info">
                            {user.name} ({user.role})
                        </span>
                        <Button
                            label="Logout"
                            icon="pi pi-sign-out"
                            className="p-button-danger"
                            onClick={logout}
                        />
                    </>
                )}
            </div>

            {/* Mobile Hamburger */}
            <div
                className="mobile-only hamburger"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="mobile-menu">
                    <ul>
                        <li onClick={() => handleNavigate("/")}>Inicio</li>
                        <li onClick={() => handleNavigate("/posts")}>Posts</li>

                        {/* Crear post solo user/admin */}
                        {user && (user.role === "user" || user.role === "admin") && (
                            <li onClick={() => handleNavigate("/posts/nuevo")}>
                                Crear Post
                            </li>
                        )}

                        {/* Admin */}
                        {user?.role === "admin" && (
                            <li onClick={() => handleNavigate("/admin")}>
                                Panel Admin
                            </li>
                        )}

                        {/* Moderador */}
                        {(user?.role === "admin" || user?.role === "moderator") && (
                            <li onClick={() => handleNavigate("/categorias")}>
                                Categorías
                            </li>
                        )}
                    </ul>

                    {/* Mobile User Section */}
                    <div className="user-section-mobile">
                        {!user ? (
                            <>
                                <Button
                                    label="Login"
                                    onClick={() => handleNavigate("/login")}
                                />
                                <Button
                                    label="Registro"
                                    className="p-button-secondary"
                                    onClick={() => handleNavigate("/registrarse")}
                                />
                            </>
                        ) : (
                            <>
                                <p>{user.name} ({user.role})</p>
                                <Button
                                    label="Logout"
                                    className="p-button-danger"
                                    onClick={() => {
                                        logout();
                                        setMenuOpen(false);
                                    }}
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
}

export default Navbar;