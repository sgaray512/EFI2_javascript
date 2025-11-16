import { Routes, Route, Navigate } from "react-router-dom";

// Páginas públicas
import Home from "./pages/Home";
import RegisterForm from "./pages/RegisterForm";
import LoginForm from "./pages/LoginForm";
import PostDetail from "./pages/PostDetail";
import PostList from "./pages/PostList";

// Formularios de posts
import PostForm from "./pages/PostForm";

// Páginas de Categorías
import CategoryList from "./pages/CategoryList";
import CategoryForm from "./pages/CategoryForm";

// Panel Admin
import AdminPanel from "./pages/AdminPanel";
import CommentModerationPage from "./pages/CommentModerationPage";
import UserManagementPage from "./pages/UserManagementPage";
import StatsPage from "./pages/StatsPage";

// Componentes globales
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

export default function App() {
    return (
        <div className="app-container">
            <Navbar />

            <main style={{ minHeight: "80vh", padding: "20px" }}>
                <Routes>

                    {/* Público */}
                    <Route path="/" element={<Home />} />
                    <Route path="/registrarse" element={<RegisterForm />} />
                    <Route path="/login" element={<LoginForm />} />

                    {/* Posts */}
                    <Route path="/posts" element={<PostList />} />
                    <Route path="/posts/:id" element={<PostDetail />} />
                    <Route
                        path="/posts/nuevo"
                        element={
                            <ProtectedRoute roles={["user", "admin", "moderator"]}>
                                <PostForm />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path="/posts/:id/editar"
                        element={
                            <ProtectedRoute roles={["user", "admin", "moderator"]}>
                                <PostForm />
                            </ProtectedRoute>
                        }
                    />

                    {/* Panel de Administración */}
                    <Route
                        path="/admin"
                        element={
                            <ProtectedRoute roles={["admin", "moderator"]}>
                                <AdminPanel />
                            </ProtectedRoute>
                        }
                    />

                    {/* Secciones del Panel Admin */}

                    {/* Gestión de categorías */}
                    <Route
                        path="/admin/categories"
                        element={
                            <ProtectedRoute roles={["admin", "moderator"]}>
                                <CategoryList />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin/categories/new"
                        element={
                            <ProtectedRoute roles={["admin", "moderator"]}>
                                <CategoryForm />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/admin/categories/:id/edit"
                        element={
                            <ProtectedRoute roles={["admin", "moderator"]}>
                                <CategoryForm />
                            </ProtectedRoute>
                        }
                    />

                    {/* Gestión de usuarios */}
                    <Route
                        path="/admin/users"
                        element={
                            <ProtectedRoute roles={["admin"]}>
                                <UserManagementPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* Estadísticas */}
                    <Route
                        path="/admin/stats"
                        element={
                            <ProtectedRoute roles={["admin"]}>
                                <StatsPage />
                            </ProtectedRoute>
                        }
                    />

                    {/* Ruta inválida → Home */}
                    <Route path="*" element={<Navigate to="/" />} />

                </Routes>
            </main>

            <Footer />
        </div>
    );
}