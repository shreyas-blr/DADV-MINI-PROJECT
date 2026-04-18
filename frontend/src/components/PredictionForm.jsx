import { useState } from "react";
import { predictCrop } from "../services/api";
import LoadingSpinner from "./LoadingSpinner";

const FIELDS = [
    { key: "N", label: "Nitrogen (N)", unit: "kg/ha", min: 0, max: 200, step: 1, hint: "0 – 200" },
    { key: "P", label: "Phosphorus (P)", unit: "kg/ha", min: 0, max: 150, step: 1, hint: "0 – 150" },
    { key: "K", label: "Potassium (K)", unit: "kg/ha", min: 0, max: 210, step: 1, hint: "0 – 210" },
    { key: "temperature", label: "Temperature", unit: "°C", min: 0, max: 50, step: 0.1, hint: "0 – 50" },
    { key: "humidity", label: "Humidity", unit: "%", min: 0, max: 100, step: 0.1, hint: "0 – 100" },
    { key: "ph", label: "Soil pH", unit: "", min: 0, max: 14, step: 0.01, hint: "0 – 14" },
    { key: "rainfall", label: "Rainfall", unit: "mm", min: 0, max: 400, step: 1, hint: "0 – 400" },
];

const DEFAULT_VALUES = { N: 90, P: 42, K: 43, temperature: 21, humidity: 82, ph: 6.5, rainfall: 202 };

const CROP_EMOJI = {
    rice: "🌾", maize: "🌽", chickpea: "🫘", kidneybeans: "🫘", pigeonpeas: "🌿",
    mothbeans: "🌱", mungbean: "🌱", blackgram: "🟤", lentil: "🫘", watermelon: "🍉",
    muskmelon: "🍈", apple: "🍎", grapes: "🍇", orange: "🍊", cherry: "🍒",
    coconut: "🥥", cotton: "☁️", jute: "🌿", coffee: "☕", banana: "🍌",
    mango: "🥭", pomegranate: "🍎",
};

export default function PredictionForm({ onResult }) {
    const [form, setForm] = useState(DEFAULT_VALUES);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);

    const handleChange = (key, val) =>
        setForm(prev => ({ ...prev, [key]: val }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);
        try {
            const res = await predictCrop(form);
            setResult(res);
            if (onResult) onResult({ ...form, ...res, timestamp: new Date() });
        } catch (err) {
            setError(err?.response?.data?.error || "Failed to connect to the backend. Is it running?");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="pred-layout">
            {/* ── Form ── */}
            <div className="form-card">
                <h2>🔬 Crop Prediction</h2>
                <p className="sub">Enter soil and climate parameters to get an AI-powered crop recommendation.</p>

                {error && <div className="error-banner">⚠️ {error}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-grid">
                        {FIELDS.map(({ key, label, unit, min, max, step, hint }) => (
                            <div key={key} className="form-group">
                                <label>{label}{unit ? ` (${unit})` : ""}</label>
                                <input
                                    type="number"
                                    value={form[key]}
                                    min={min} max={max} step={step}
                                    required
                                    onChange={e => handleChange(key, parseFloat(e.target.value))}
                                />
                                <span className="hint">Range: {hint}</span>
                            </div>
                        ))}
                    </div>
                    <button type="submit" className="submit-btn" disabled={loading}>
                        {loading ? "Predicting..." : "🌱 Predict Best Crop"}
                    </button>
                </form>
            </div>

            {/* ── Result ── */}
            <div className="result-panel">
                <h2>📊 Prediction Result</h2>

                {loading && <LoadingSpinner />}

                {!loading && result && (
                    <div className="result-box">
                        <div className="result-emoji">{CROP_EMOJI[result.crop] ?? "🌿"}</div>
                        <p className="result-label">Recommended Crop</p>
                        <p className="result-crop">{result.crop}</p>
                        <div className="result-confidence">
                            <div className="conf-bar-bg">
                                <div className="conf-bar" style={{ width: `${result.confidence}%` }} />
                            </div>
                            <p className="conf-label">Confidence: {result.confidence}%</p>
                        </div>
                    </div>
                )}

                {!loading && !result && (
                    <div className="result-placeholder">
                        <div className="ph-icon">🌾</div>
                        <p>Fill in the parameters and click<br /><strong>Predict Best Crop</strong> to see results.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
