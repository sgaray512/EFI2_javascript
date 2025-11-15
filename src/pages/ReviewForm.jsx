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
        try {
            await api.post(`/posts/${id}/comments`);
            toast.success("Comentario creado");
            setContent("");
            if (onCommentCreated) onCommentCreated();
        } catch {
            toast.error("Error creando comentario");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="review-form-container">
            <h4>Agregar comentario</h4>
            <InputTextarea
                className="review-form-textarea"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
            />
            <Button type="submit" label="Enviar" className="mt-2" />
        </form>
    );
}