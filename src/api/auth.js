export const login = async (email, password) => {
    const response = await api.post("/login", { email, password });

    const { access_token, user } = response.data;

    if (access_token) {
    localStorage.setItem("token", access_token);
    return { user, token: access_token };
    }

    throw new Error("El servidor no envió token válido");
};