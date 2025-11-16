import { useEffect, useState, useContext } from "react";
import api from "../api/axiosConfig";
import { AuthContext } from "../context/AuthContext";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function PostList() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const fetchPosts = async () => {
        try {
            const response = await api.get("/posts");
            setPosts(response.data);
        } catch (err) {
            console.error(err);
            toast.error("Error cargando posts");
        }
    };

    useEffect(() => {
        fetchPosts();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("¿Eliminar este post?")) return;
        try {
            await api.delete(`/posts/${id}`);
            toast.success("Post eliminado");
            fetchPosts();
        } catch (err) {
            console.error(err);
            toast.error("No se pudo eliminar el post");
        }
    };

    const canEdit = (post) => {
        if (!user) return false;
        if (user.role === "admin") return true;
        return post.user_id === user.id;
    };

    const canDelete = canEdit;

    return (
        <div className="post-list">
            <h2>Publicaciones</h2>

            {user && (
                <Button
                    label="Crear Post"
                    onClick={() => navigate("/posts/nuevo")}
                    className="mb-3"
                />
            )}

            <ul>
                {posts.length === 0 && <p>No hay publicaciones disponibles.</p>}

                {posts.map((post) => (
                    <li key={post.id} className="post-item">
                        <h3>{post.title}</h3>
                        <p>{post.content ? post.content.substring(0, 120) : ""}</p>
                        <p><strong>Autor:</strong> {post.author?.name || "Desconocido"}</p>
                        <p><strong>Categoría:</strong> {post.category?.name || "Sin categoría"}</p>

                        <div className="actions">
                            <Button
                                label="Ver"
                                onClick={() => navigate(`/posts/${post.id}`)}
                            />

                            {user && (
                                <Button
                                    label="Comentar"
                                    className="p-button-success"
                                    onClick={() => navigate(`/posts/${post.id}`)}
                                />
                            )}

                            {canEdit(post) && (
                                <Button
                                    label="Editar"
                                    className="p-button-warning"
                                    onClick={() => navigate(`/posts/${post.id}/editar`)}
                                />
                            )}

                            {canDelete(post) && (
                                <Button
                                    label="Eliminar"
                                    className="p-button-danger"
                                    onClick={() => handleDelete(post.id)}
                                />
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}