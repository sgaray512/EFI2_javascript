import { useEffect, useState, useContext } from "react";
import api from "../api/axiosConfig";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button } from "primereact/button";
import { InputTextarea } from "primereact/inputtextarea";
import { toast } from "react-toastify";

export default function ReviewList() {
    const { id } = useParams();
    const [reviews, setReviews] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editingContent, setEditingContent] = useState("");
    const { user } = useContext(AuthContext);

    const fetchReviews = async () => {
        try {
            const res = await api.get(`/posts/${id}/comments`);
            setReviews(res.data);
        } catch {
            toast.error("Error cargando comentarios");
        }
    };

    useEffect(() => {
        fetchReviews();
    }, []);

    const canEdit = (comment) => {
        if (!user) return false;
        if (user.role === "admin" || user.role === "moderator") return true;
        return comment.user_id === user.id;
    };

    const canDelete = canEdit;

    const handleDelete = async (commentId) => {
        if (!window.confirm("¿Eliminar comentario?")) return;
        try {
            await api.delete(`/comments/${commentId}`);
            toast.success("Comentario eliminado");
            fetchReviews();
        } catch {
            toast.error("Error eliminando comentario");
        }
    };

    const startEditing = (comment) => {
        setEditingId(comment.id);
        setEditingContent(comment.content);
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditingContent("");
    };

    const saveEdit = async (commentId) => {
        if (!editingContent.trim()) {
            toast.error("El comentario no puede estar vacío");
            return;
        }

        try {
            await api.put(`/comments/${commentId}`, { content: editingContent });
            toast.success("Comentario actualizado");
            cancelEditing();
            fetchReviews();
        } catch {
            toast.error("Error actualizando comentario");
        }
    };

    return (
        <div className="review-list">
            <h3 className="review-list-title">Comentarios</h3>
            <ul>
                {reviews.map((rev) => (
                    <li key={rev.id} className="review-item">
                        {editingId === rev.id ? (
                            <>
                                <InputTextarea
                                    rows={4}
                                    value={editingContent}
                                    onChange={(e) => setEditingContent(e.target.value)}
                                />
                                <div className="mt-2">
                                    <Button
                                        label="Guardar"
                                        className="p-button-success mr-2"
                                        onClick={() => saveEdit(rev.id)}
                                    />
                                    <Button
                                        label="Cancelar"
                                        className="p-button-secondary"
                                        onClick={cancelEditing}
                                    />
                                </div>
                            </>
                        ) : (
                            <>
                                <p>{rev.content}</p>
                                <p><strong>Autor:</strong> {rev.author}</p>
                                {canEdit(rev) && (
                                    <div className="mt-2">
                                        <Button
                                            label="Editar"
                                            className="p-button-warning mr-2"
                                            onClick={() => startEditing(rev)}
                                        />
                                        <Button
                                            label="Eliminar"
                                            className="p-button-danger"
                                            onClick={() => handleDelete(rev.id)}
                                        />
                                    </div>
                                )}
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}