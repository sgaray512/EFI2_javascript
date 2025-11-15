import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosConfig";
import { AuthContext } from "../context/AuthContext";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { toast } from "react-toastify";

export default function PostForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    const [post, setPost] = useState({
        title: "",
        content: "",
        category_id: null
    });

    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const res = await api.get("/categories");
            setCategories(res.data);
        } catch (error) {
            console.error(error);
            toast.error("Error cargando categorías");
        }
    };

    const fetchPost = async () => {
        if (!id) return;

        try {
            const res = await api.get(`/posts/${id}`);
            setPost({
                title: res.data.title,
                content: res.data.content,
                category_id: res.data.category ? res.data.category.id : null
            });
        } catch (error) {
            console.error(error);
            toast.error("Error cargando el post");
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem("token");

        if (!token) {
            toast.error("No estás autenticado");
            return;
        }

        const payload = {
            title: post.title,
            content: post.content,
            category_id: post.category_id || null
        };

        try {
            if (id) {
                await api.put(`/posts/${id}`, payload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                toast.success("Post actualizado");
            } else {
                await api.post("/posts", payload, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                toast.success("Post creado");
            }

            navigate("/posts");

        } catch (err) {
            console.error(err);
            if (err.response && err.response.data && err.response.data.errors) {
                toast.error("Error: " + JSON.stringify(err.response.data.errors));
            } else {
                toast.error("Error al guardar el post");
            }
        }
    };

    return (
        <div className="post-form">
            <h2>{id ? "Editar Post" : "Crear Post"}</h2>

            <form onSubmit={handleSubmit}>
                <label>Título</label>
                <InputText
                    value={post.title}
                    onChange={(e) => setPost({ ...post, title: e.target.value })}
                    required
                />

                <label>Contenido</label>
                <InputTextarea
                    rows={8}
                    value={post.content}
                    onChange={(e) => setPost({ ...post, content: e.target.value })}
                    required
                />

                <label>Categoría</label>
                <Dropdown
                    value={post.category_id}
                    options={categories.map(c => ({
                        label: c.name,
                        value: c.id
                    }))}
                    onChange={(e) => setPost({ ...post, category_id: e.value })}
                    placeholder="Seleccionar categoría"
                />

                <Button type="submit" label="Guardar" className="mt-3" />
            </form>
        </div>
    );
}