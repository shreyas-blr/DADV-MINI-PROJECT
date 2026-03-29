import { useState } from "react";
import PredictionForm from "../components/PredictionForm";

const CROP_EMOJI = {
    rice: "🌾", maize: "🌽", chickpea: "🫘", kidneybeans: "🫘", pigeonpeas: "🌿",
    mothbeans: "🌱", mungbean: "🌱", blackgram: "🟤", lentil: "🫘", watermelon: "🍉",
    muskmelon: "🍈", apple: "🍎", grapes: "🍇", orange: "🍊", papaya: "🍑",
    coconut: "🥥", cotton: "☁️", jute: "🌿", coffee: "☕", banana: "🍌",
    mango: "🥭", pomegranate: "🍎",
};

export default function PredictionsPage() {
    const [history, setHistory] = useState([]);

    const handleResult = (entry) => {
        setHistory(prev => [entry, ...prev].slice(0, 15));
    };

    return (
        <div className="page">
            <div className="page-header">
                <h1>🔬 Crop Predictions</h1>
                <p>Input soil and climate data to get an AI-powered crop recommendation.</p>
            </div>

            <PredictionForm onResult={handleResult} />

            {history.length > 0 && (
                <div className="history-card">
                    <h3>🕘 Prediction History (Last {history.length})</h3>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Crop</th>
                                    <th>Confidence</th>
                                    <th>N</th><th>P</th><th>K</th>
                                    <th>Temp (°C)</th>
                                    <th>Humidity (%)</th>
                                    <th>pH</th>
                                    <th>Rainfall (mm)</th>
                                    <th>Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {history.map((row, i) => (
                                    <tr key={i}>
                                        <td>{history.length - i}</td>
                                        <td>
                                            <span className="crop-badge">
                                                {CROP_EMOJI[row.crop] ?? "🌿"} {row.crop}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`conf-pill ${row.confidence >= 80 ? "conf-high" : "conf-mid"}`}>
                                                {row.confidence}%
                                            </span>
                                        </td>
                                        <td>{row.N}</td><td>{row.P}</td><td>{row.K}</td>
                                        <td>{row.temperature}</td>
                                        <td>{row.humidity}</td>
                                        <td>{row.ph}</td>
                                        <td>{row.rainfall}</td>
                                        <td style={{ color: "#718096", fontSize: 12 }}>
                                            {row.timestamp?.toLocaleTimeString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
