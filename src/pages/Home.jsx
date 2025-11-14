import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import "../styles/Home.css";

export default function Home() {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    return (
        <div className="home">
            <h1 className="home-title">Bienvenido al Miniblog</h1>

            <div className="home-buttons">
                {!user ? (
                    <>
                        <Button
                            label="Registrarse"
                            className="p-button-success home-btn"
                            onClick={() => navigate("/registrarse")}
                        />
                        <Button
                            label="Iniciar sesión"
                            className="p-button-secondary home-btn"
                            onClick={() => navigate("/login")}
                        />
                    </>
                ) : (
                    <>
                        <Button
                            label="Ver Posts"
                            className="home-btn"
                            onClick={() => navigate("/posts")}
                        />
                        <Button
                            label="Mis Reviews"
                            className="p-button-secondary home-btn"
                            onClick={() => navigate("/reviews")}
                        />
                    </>
                )}
            </div>
        </div>
    );
}