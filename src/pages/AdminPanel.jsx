import { useAuth } from "../context/AuthContext";
import { Link, Navigate } from "react-router-dom";

export default function AdminPanel() {
    const { user } = useAuth();

    if (!user) return <Navigate to="/" />;

    if (user.role !== "admin" && user.role !== "moderator") {
        return <Navigate to="/" />;
    }

    return (
        <div className="admin-panel">
            <h1>Panel de Administración</h1>

            {(user.role === "admin" || user.role === "moderator") && (
                <>
                    <h2>Moderación</h2>
                    <Link to="/admin/categories">Categorías</Link>
                </>
            )}

            {user.role === "admin" && (
                <>
                    <h2>Gestión del sistema</h2>
                    <Link to="/admin/users">Usuarios</Link>
                    <br />
                    <Link to="/admin/stats">Estadísticas</Link>
                </>
            )}
        </div>
    );
}