import React, { useContext } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import api from "../api/axiosConfig";
import { AuthContext } from "../context/AuthContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

const schema = Yup.object({
    email: Yup.string().email("Email inválido").required("Email requerido"),
    password: Yup.string().required("Contraseña requerida"),
});

export default function LoginForm() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div className="login-page">
            <Formik
                initialValues={{ email: "", password: "" }}
                validationSchema={schema}
                onSubmit={async (values, { setSubmitting }) => {
                    try {
                        const res = await api.post("/auth/login", values);

                        const access = res.data.access_token;
                        const refresh = res.data.refresh_token;

                        if (!access || !refresh) {
                            throw new Error("El servidor no envió tokens válidos");
                        }

                        login(access, refresh);
                        toast.success("Inicio de sesión exitoso");
                        navigate("/");

                    } catch (err) {
                        const msg =
                            err.response?.data?.message ||
                            err.response?.data?.error ||
                            err.message ||
                            "Error al iniciar sesión";

                        toast.error(msg);
                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({ errors, touched, isSubmitting }) => (
                    <Form className="login-form">

                        <div className="field">
                            <label>Email</label>
                            <Field
                                as={InputText}
                                name="email"
                                className={errors.email && touched.email ? "p-invalid" : ""}
                            />
                            {errors.email && touched.email && (
                                <small className="p-error">{errors.email}</small>
                            )}
                        </div>

                        <div className="field">
                            <label>Contraseña</label>
                            <Field
                                as={InputText}
                                name="password"
                                type="password"
                                className={errors.password && touched.password ? "p-invalid" : ""}
                            />
                            {errors.password && touched.password && (
                                <small className="p-error">{errors.password}</small>
                            )}
                        </div>

                        <Button
                            type="submit"
                            label={isSubmitting ? "Ingresando..." : "Ingresar"}
                            className="p-button-rounded p-button-primary login-btn"
                            disabled={isSubmitting}
                        />
                    </Form>
                )}
            </Formik>
        </ div>
    );
}