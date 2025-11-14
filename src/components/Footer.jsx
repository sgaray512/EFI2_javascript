import React from "react";
import { useNavigate } from "react-router-dom";

function Footer() {
    const navigate = useNavigate();

    return (
        <footer className="footer">
            <p className="footer-copy">
                &copy; {new Date().getFullYear()} Miniblog — Todos los derechos reservados.
            </p>

            <ul className="footer-links">
                <li onClick={() => navigate("/")}>Inicio</li>
                <li onClick={() => navigate("/posts")}>Posts</li>
                <li onClick={() => navigate("/reviews")}>Reviews</li>
            </ul>
        </footer>
    );
}

export default Footer;