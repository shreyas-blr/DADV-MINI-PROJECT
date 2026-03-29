import axios from "axios";

const BASE_URL = "http://localhost:5001";

const api = axios.create({
    baseURL: BASE_URL,
    headers: { "Content-Type": "application/json" },
});

export async function fetchAnalytics() {
    const { data } = await api.get("/analytics");
    return data;
}

export async function predictCrop(formData) {
    const { data } = await api.post("/predict", formData);
    return data;
}

export default api;
