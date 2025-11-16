import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import api from "../api/axiosConfig";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const schema = Yup.object({
    name: Yup.string().required("Nombre requerido"),
});

export default function CategoryForm() {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEditing = Boolean(id);

    const [initialValues, setInitialValues] = useState({ name: "" });

    useEffect(() => {
        if (isEditing) {
            const loadCategory = async () => {
                try {
                    const res = await api.get(`/categories/${id}`);
                    setInitialValues({ name: res.data.name });
                } catch (err) {
                    toast.error("Error cargando categoría");
                }
            };
            loadCategory();
        }
    }, [id, isEditing]);

    return (
        <div className="form-page">
            <h2>{isEditing ? "Editar Categoría" : "Nueva Categoría"}</h2>

            <Formik
                enableReinitialize
                initialValues={initialValues}
                validationSchema={schema}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        const token = localStorage.getItem("token");

                        if (isEditing) {
                            await api.put(`/categories/${id}`, values, {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    "Content-Type": "application/json",
                                    Accept: "application/json",
                                },
                            });
                            toast.success("Categoría actualizada");
                        } else {
                            await api.post("/categories", values, {
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                    "Content-Type": "application/json",
                                    Accept: "application/json",
                                },
                            });
                            toast.success("Categoría creada");
                        }

                        navigate("/categorias");

                    } catch (err) {
                        console.error(err);

                        const msg = err.response?.data?.message || "Error en el servidor";
                        toast.error(msg);
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form className="category-form">
                        <div className="field">
                            <label>Nombre</label>
                            <Field
                                as={InputText}
                                name="name"
                                className={errors.name && touched.name ? "p-invalid" : ""}
                            />
                            {errors.name && touched.name && (
                                <small className="p-error">{errors.name}</small>
                            )}
                        </div>

                        <Button
                            type="submit"
                            label={isSubmitting ? "Guardando..." : "Guardar"}
                            disabled={isSubmitting}
                        />
                    </Form>
                )}
            </Formik>
        </div>
    );
}