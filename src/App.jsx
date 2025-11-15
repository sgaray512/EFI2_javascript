import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RegisterForm from "./pages/RegisterForm";
import LoginForm from "./pages/LoginForm";
import PostList from "./pages/PostList";
import PostForm from "./pages/PostForm";
import ReviewList from "./pages/ReviewList";
import ReviewForm from "./pages/ReviewForm";
import CategoryList from "./pages/CategoryList";
import CategoryForm from "./pages/CategoryForm";
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
                    <Route path="/posts/:id" element={<ReviewList />} />

                    {/* Crear post (solo user registrado) */}
                    <Route
                        path="/posts/nuevo"
                        element={
                            <ProtectedRoute roles={["user", "admin"]}>
                                <PostForm />
                            </ProtectedRoute>
                        }
                    />

                    {/* Editar post (solo user o admin) */}
                    <Route
                        path="/posts/:id/editar"
                        element={
                            <ProtectedRoute roles={["user", "admin"]}>
                                <PostForm />
                            </ProtectedRoute>
                        }
                    />

                    {/* Comentarios */}
                    <Route
                        path="/posts/:id/comentar"
                        element={
                            <ProtectedRoute roles={["user", "admin"]}>
                                <ReviewForm />
                            </ProtectedRoute>
                        }
                    />
                    {/* Categorías */}
                    <Route
                        path="/categorias"
                        element={
                            <ProtectedRoute roles={["admin", "moderator"]}>
                                <CategoryList />
                            </ProtectedRoute>
                        }
                    />

                    <Route
                        path="/categorias/nueva"
                        element={
                            <ProtectedRoute roles={["admin"]}>
                                <CategoryForm />
                            </ProtectedRoute>
                        }
                    />

                </Routes>
            </main>

            <Footer />
        </div>
    );
}