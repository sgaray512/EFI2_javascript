import { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { Button } from "primereact/button";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

export default function CommentModerationPage() {
    const { token } = useAuth();
    const [comments, setComments] = useState([]);

    const fetchComments = async () => {
        try {
            const res = await api.get("/comments", {
                headers: { Authorization: `Bearer ${token}` }
            });
            setComments(res.data);
        } catch (err) {
            console.error(err);
            toast.error("Error cargando comentarios");
        }
    };

    const deleteComment = async (id) => {
        if (!confirm("¿Seguro que quieres eliminar este comentario?")) return;

        try {
            await api.delete(`/comments/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            setComments(prev => prev.filter(c => c.id !== id));
            toast.success("Comentario eliminado");
        } catch (err) {
            console.error(err);
            toast.error("No se pudo eliminar");
        }
    };

    useEffect(() => {
        fetchComments();
    }, []);

    return (
        <div>
            <h1>Moderación de Comentarios</h1>

            {comments.length === 0 && <p>No hay comentarios aún.</p>}

            {comments.map(c => (
                <div key={c.id} className="comment-item" style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    marginBottom: "10px"
                }}>
                    <p><strong>{c.author}</strong>: {c.content}</p>
                    <small>{new Date(c.created_at).toLocaleString()}</small>
                    <br/>
                    <Button
                        label="Eliminar"
                        icon="pi pi-trash"
                        className="p-button-danger p-button-sm"
                        onClick={() => deleteComment(c.id)}
                    />
                </div>
            ))}
        </div>
    );
}