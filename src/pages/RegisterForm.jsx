import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosConfig";
import "../styles/RegisterForm.css"

const validationSchema = Yup.object({
    name: Yup.string().required("El nombre es obligatorio"),
    email: Yup.string()
        .email("Email inválido")
        .required("El email es obligatorio"),
    password: Yup.string().required("La contraseña es obligatoria"),
    role: Yup.string().required("Debes seleccionar un rol"),
});

export default function RegisterForm() {
    const navigate = useNavigate();

    const roles = [
        { label: "Usuario", value: "user" },
        { label: "Administrador", value: "admin" },
    ];

    const handleSubmit = async (values, { resetForm }) => {
        try {
            const res = await api.post("/register", values);

            if (res.status === 201 || res.status === 200) {
                toast.success("Usuario registrado con éxito");
                resetForm();
                setTimeout(() => navigate("/login"), 1500);
            } else {
                toast.error(res.data?.message || "No se pudo registrar el usuario");
            }
        } catch (error) {
            toast.error(
                error.response?.data?.message ||
                error.response?.data?.error ||
                "Error al conectar con el servidor"
            );
        }
    };

    return (
        <div className="register-container">
            <h2>Crear cuenta</h2>

            <Formik
                initialValues={{
                    name: "",
                    email: "",
                    password: "",
                    role: "user",
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, setFieldValue, isSubmitting }) => (
                    <Form className="register-form">

                        <div className="form-field">
                            <label>Nombre</label>
                            <Field as={InputText} name="name" />
                            <ErrorMessage name="name" component="small" className="error" />
                        </div>

                        <div className="form-field">
                            <label>Email</label>
                            <Field as={InputText} name="email" />
                            <ErrorMessage name="email" component="small" className="error" />
                        </div>

                        <div className="form-field">
                            <label>Contraseña</label>
                            <Field as={InputText} type="password" name="password" />
                            <ErrorMessage
                                name="password"
                                component="small"
                                className="error"
                            />
                        </div>

                        <div className="form-field">
                            <label>Rol</label>
                            <Dropdown
                                value={values.role}
                                options={roles}
                                onChange={(e) => setFieldValue("role", e.value)}
                                placeholder="Selecciona un rol"
                                className="dropdown"
                            />
                            <ErrorMessage
                                name="role"
                                component="small"
                                className="error"
                            />
                        </div>

                        <Button
                            type="submit"
                            label={isSubmitting ? "Registrando..." : "Registrarse"}
                            className="p-button-rounded p-button-success register-btn"
                            disabled={isSubmitting}
                        />
                    </Form>
                )}
            </Formik>
        </div>
    );
}