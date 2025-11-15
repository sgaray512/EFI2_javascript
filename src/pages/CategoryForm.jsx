import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import api from "../api/axiosConfig";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const schema = Yup.object({
    name: Yup.string().required("Nombre requerido"),
});

export default function CategoryForm() {
    const navigate = useNavigate();

    return (
        <div className="form-page">
            <h2>Nueva Categoría</h2>

            <Formik
                initialValues={{ name: "" }}
                validationSchema={schema}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        await api.post("/categories", values, {
                            headers: {
                                Authorization: `Bearer ${localStorage.getItem("token")}`,
                                "Content-Type": "application/json",
                                Accept: "application/json",
                            },
                        });

                        toast.success("Categoría creada");
                        navigate("/categorias");

                    } catch (err) {
                        console.error(err);

                        if (err.response?.status === 403) {
                            toast.error("No tienes permisos suficientes");
                        } else if (err.response?.status === 422 || err.response?.status === 400) {
                            toast.error("Error en los datos enviados");
                        } else {
                            toast.error("Error al crear categoría");
                        }
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