import { useEffect, useState, useContext } from "react";
import api from "../api/axiosConfig";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Button } from "primereact/button";
import { toast } from "react-toastify";

export default function ReviewList() {
    const { id } = useParams();
    const [reviews, setReviews] = useState([]);
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

    const canDelete = (comment) => {
        if (!user) return false;
        if (user.role === "admin" || user.role === "moderator") return true;
        return comment.user_id === user.id;
    };

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

    return (
        <div className="review-list">
            <h3 className="review-list-title">Comentarios</h3>
            <ul>
                {reviews.map((rev) => (
                    <li key={rev.id} className="review-item">
                        <p>{rev.content}</p>
                        <p className="review-item-author"></p>
                            <p><strong>Autor:</strong> {rev.author?.name}</p>

                        {canDelete(rev) && (
                            <Button 
                                className="p-button-danger review-delete-btn"
                                label="Eliminar"
                                onClick={() => handleDelete(rev.id)}
                            />
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}