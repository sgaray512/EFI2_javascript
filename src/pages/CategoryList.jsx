import React, { useEffect, useState } from "react";
import api from "../api/axiosConfig";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

export default function CategoryList() {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const getCategories = async () => {
            try {
                const res = await api.get("/categories");
                setCategories(res.data);
            } catch (err) {
                console.error("Error cargando categorías", err);
            }
        };
        getCategories();
    }, []);

    return (
        <div className="container">
            <h2>Categorías</h2>

            <Button
                label="Nueva Categoría"
                icon="pi pi-plus"
                className="p-button-success"
                onClick={() => navigate("/categorias/nueva")}
            />

            <ul className="category-list">
                {categories.map(cat => (
                    <li key={cat.id}>{cat.name}</li>
                ))}
            </ul>
        </div>
    );
}