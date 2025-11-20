import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css"
function Navbar() {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleNavigate = (path) => {
        navigate(path);
        setMenuOpen(false);
    };

    const isLogged = !!user;
    const isAdmin = user?.role === "admin";
    const isModerator = user?.role === "moderator";
    const canManage = isAdmin || isModerator;

    return (
        <nav className="navbar">
            <div className="logo" onClick={() => handleNavigate("/")}>
                Miniblog
            </div>

            {/* Desktop Menu */}
            <ul className="nav-links desktop-only">
                <li onClick={() => handleNavigate("/")}>Inicio</li>
                <li onClick={() => handleNavigate("/posts")}>Posts</li>

                {/* Crear Post: user / admin / moderator */}
                {isLogged && (
                    <li onClick={() => handleNavigate("/posts/nuevo")}>
                        Crear Post
                    </li>
                )}

                {/* Panel admin: admin / moderator */}
                {canManage && (
                    <li onClick={() => handleNavigate("/admin")}>
                        Panel Admin
                    </li>
                )}
            </ul>

            {/* User Section Desktop */}
            <div className="user-section desktop-only">
                {!isLogged ? (
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

                        {isLogged && (
                            <li onClick={() => handleNavigate("/posts/nuevo")}>
                                Crear Post
                            </li>
                        )}

                        {canManage && (
                            <li onClick={() => handleNavigate("/admin")}>
                                Panel Admin
                            </li>
                        )}

                        {canManage && (
                            <li onClick={() => handleNavigate("/categorias")}>
                                Categorías
                            </li>
                        )}
                    </ul>

                    <div className="user-section-mobile">
                        {!isLogged ? (
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