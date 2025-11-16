import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function CategoryList() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    const loadCategories = async () => {
        try {
            const res = await api.get("/categories");
            setCategories(res.data);
        } catch (err) {
            console.error("Error cargando categorías", err);
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    const deleteCategory = async (id) => {
        if (!window.confirm("¿Eliminar esta categoría?")) return;

        try {
            await api.delete(`/categories/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            toast.success("Categoría eliminada");

            setCategories(categories.filter(cat => cat.id !== id));
        } catch (err) {
            if (err.response?.status === 403) {
                toast.error("No tienes permisos para eliminar categorías");
            } else {
                toast.error("Error al eliminar categoría");
            }
        }
    };

    return (
        <div className="container">
            <h2>Categorías</h2>

            <Button
                label="Nueva Categoría"
                icon="pi pi-plus"
                className="p-button-success mb-3"
                onClick={() => navigate("/admin/categories/new")}
            />

            <ul className="category-list">
                {categories.map(cat => (
                    <li key={cat.id} className="category-item">
                        <span>{cat.name}</span>

                        <div className="actions">
                            <Button
                                label="Editar"
                                icon="pi pi-pencil"
                                className="p-button-warning p-button-sm"
                                onClick={() => navigate(`/admin/categories/${cat.id}/edit`)}
                            />
                            <Button
                                label="Eliminar"
                                icon="pi pi-trash"
                                className="p-button-danger p-button-sm"
                                onClick={() => deleteCategory(cat.id)}
                            />
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}