import { useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosConfig";
import { InputTextarea } from "primereact/inputtextarea";
import { Button } from "primereact/button";
import { toast } from "react-toastify";

export default function ReviewForm({ onCommentCreated }) {
    const { id } = useParams();
    const [content, setContent] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!content.trim()) {
            toast.error("El comentario no puede estar vacío");
            return;
        }

        try {
            await api.post(`/posts/${id}/comments`, {
                content,
                post_id: parseInt(id)
            });
            toast.success("Comentario creado");
            setContent("");
            if (onCommentCreated) onCommentCreated();
        } catch (err) {
            console.error(err);
            toast.error("Error creando comentario");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="review-form-container">
            <InputTextarea
                className="review-form-textarea"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Escribe tu comentario..."
                required
            />
            <Button type="submit" label="Enviar" className="mt-2" />
        </form>
    );
}