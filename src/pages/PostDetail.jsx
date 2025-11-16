import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosConfig";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import { toast } from "react-toastify";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export default function PostDetail() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [refreshComments, setRefreshComments] = useState(false);
    const navigate = useNavigate();

    const fetchPost = async () => {
        try {
            const res = await api.get(`/posts/${id}`);
            setPost(res.data);
        } catch {
            toast.error("Error cargando el post");
        }
    };

    useEffect(() => {
        fetchPost();
    }, [id, refreshComments]);

    if (!post) return <p>Cargando post...</p>;

    return (
        <div className="post-detail">
            <Button
                label="Volver a posts"
                className="mb-3"
                onClick={() => navigate("/posts")}
            />

            <h2>{post.title}</h2>
            <p>{post.content}</p>
            <p><strong>Autor:</strong> {post.author?.name || "Desconocido"}</p>
            <p><strong>Categoría:</strong> {post.category?.name || "Sin categoría"}</p>

            <hr />

            <h3>Comentarios</h3>
            <ReviewForm onCommentCreated={() => setRefreshComments(!refreshComments)} />

            <ReviewList key={refreshComments} />
        </div>
    );
}