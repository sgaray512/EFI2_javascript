import LoginForm from "../components/LoginForm";

export default function Login() {
    return (
        <div className="login-page">
            <div className="login-card">
                <h2 className="login-title">Iniciar Sesión</h2>
                <LoginForm />
            </div>
        </div>
    );
}