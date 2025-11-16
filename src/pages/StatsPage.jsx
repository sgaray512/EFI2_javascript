import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";
import { Card } from "primereact/card";
import { Button } from "primereact/button";

export default function StatsPage() {
    const { token, user } = useAuth();
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchStats = async () => {
        setLoading(true);
        try {
            const res = await fetch("http://localhost:5000/api/admin/stats", {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (!res.ok) throw new Error("Error en la carga de estadísticas");

            const data = await res.json();
            setStats(data);
        } catch (err) {
            toast.error("No se pudieron obtener las estadísticas");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    if (loading) return <p>Cargando estadísticas...</p>;

    return (
        <div>
            <h1>Estadísticas del Sistema</h1>

            <div className="stats-grid" style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1rem",
                marginTop: "1rem"
            }}>
                <Card title="Posts">
                    <h2>{stats?.posts ?? 0}</h2>
                </Card>

                <Card title="Usuarios">
                    <h2>{stats?.users ?? 0}</h2>
                </Card>

                <Card title="Comentarios">
                    <h2>{stats?.comments ?? 0}</h2>
                </Card>

                {user?.role === "admin" && (
                    <Card title="Posts eliminados">
                        <h2>{stats?.deleted_posts ?? 0}</h2>
                    </Card>
                )}
            </div>

            <Button 
                label="Actualizar" 
                icon="pi pi-refresh"
                className="p-button-text p-button-sm" 
                onClick={fetchStats}
                style={{ marginTop: "1rem" }}
            />
        </div>
    );
}