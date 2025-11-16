import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

export default function UserManagementPage() {
    const { token, user } = useAuth();
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchUsers = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/users", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (!res.ok) throw new Error("Error al obtener usuarios");
            const data = await res.json();
            setUsers(data);
        } catch {
            toast.error("No se pudieron cargar los usuarios");
        } finally {
            setLoading(false);
        }
    };

    const changeRole = async (id, role) => {
        try {
            const res = await fetch(`http://localhost:5000/api/users/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ role }),
            });

            if (!res.ok) throw new Error("Error al cambiar rol");

            toast.success("Rol actualizado");
            fetchUsers();
        } catch {
            toast.error("No se pudo actualizar el rol");
        }
    };

    const toggleUserActive = async (id, currentlyActive) => {
        if (!confirm(`¿Seguro que deseas ${currentlyActive ? "desactivar" : "activar"} este usuario?`)) return;

        try {
            const res = await fetch(`http://localhost:5000/api/users/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ active: !currentlyActive }),
            });

            if (!res.ok) throw new Error("Error al actualizar estado");

            toast.success(`Usuario ${currentlyActive ? "desactivado" : "activado"}`);
            fetchUsers();
        } catch {
            toast.error("No se pudo actualizar el estado del usuario");
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    if (loading) return <p>Cargando usuarios...</p>;

    return (
        <div>
            <h1>Gestión de Usuarios</h1>

            {users.map((u) => {
                const isSelf = u.id === user?.id;
                const isActive = u.is_active;

                return (
                    <div key={u.id} className="user-row" style={{ marginBottom: "1rem" }}>
                        <span>
                            {u.name} ({u.email}) — Rol: {u.role} — Estado: {isActive ? "Activo" : "Desactivado"}
                        </span>

                        <div style={{ marginLeft: "1rem", display: "flex", gap: "0.5rem" }}>
                            <Button
                                label="User"
                                className="p-button-secondary p-button-sm"
                                disabled={isSelf}
                                onClick={() => changeRole(u.id, "user")}
                            />
                            <Button
                                label="Mod"
                                className="p-button-warning p-button-sm"
                                disabled={isSelf}
                                onClick={() => changeRole(u.id, "moderator")}
                            />
                            <Button
                                label="Admin"
                                className="p-button-info p-button-sm"
                                disabled={isSelf}
                                onClick={() => changeRole(u.id, "admin")}
                            />
                            <Button
                                label={u.is_active ? "Desactivar" : "Activar"}
                                icon="pi pi-ban"
                                className="p-button-danger p-button-sm"
                                disabled={isSelf}
                                onClick={() => toggleUserActive(u.id, u.is_active)}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}