import { useEffect, useState } from "react";
import { fetchAnalytics } from "../services/api";
import KpiCard from "../components/KpiCard";
import CropBarChart from "../components/charts/CropBarChart";
import TempRainfallLine from "../components/charts/TempRainfallLine";
import LoadingSpinner from "../components/LoadingSpinner";
import { MdOutlineGrain, MdThermostat, MdWaterDrop, MdBarChart } from "react-icons/md";

export default function DashboardPage() {
    const [data, setData] = useState(null);
    const [loading, setLoad] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchAnalytics()
            .then(setData)
            .catch(() => setError("Could not load analytics. Make sure the backend is running on port 5001."))
            .finally(() => setLoad(false));
    }, []);

    if (loading) return <div className="page"><LoadingSpinner /></div>;
    if (error) return <div className="page"><div className="error-banner">⚠️ {error}</div></div>;

    const { kpis, cropFrequency, tempRainfallTrend } = data;

    return (
        <div className="page">
            <div className="page-header">
                <h1>🌾 Dashboard Overview</h1>
                <p>Real-time insights from the Crop Recommendation ML model.</p>
            </div>

            {/* KPI Cards */}
            <div className="kpi-grid">
                <KpiCard
                    icon={<MdBarChart />}
                    label="Total Records"
                    value={kpis.totalPredictions.toLocaleString()}
                    sub="Training dataset size"
                    color="#27ae60" bg="#e8f8f0"
                />
                <KpiCard
                    icon={<MdOutlineGrain />}
                    label="Most Recommended"
                    value={kpis.mostRecommended}
                    sub="Highest predicted crop"
                    color="#2980b9" bg="#e8f4fd"
                />
                <KpiCard
                    icon={<MdThermostat />}
                    label="Avg Temperature"
                    value={`${kpis.avgTemp}°C`}
                    sub="Across all samples"
                    color="#e67e22" bg="#fef3e2"
                />
                <KpiCard
                    icon={<MdWaterDrop />}
                    label="Avg Rainfall"
                    value={`${kpis.avgRainfall} mm`}
                    sub="Across all samples"
                    color="#8e44ad" bg="#f5eef8"
                />
            </div>

            {/* Charts */}
            <div className="chart-row cols-2">
                <div className="chart-card">
                    <div className="chart-card-header">
                        <h3>📊 Crop Recommendation Frequency</h3>
                        <span className="chart-tag">Top 10</span>
                    </div>
                    <CropBarChart data={cropFrequency} />
                </div>
                <div className="chart-card">
                    <div className="chart-card-header">
                        <h3>📈 Temperature vs Rainfall Trend</h3>
                        <span className="chart-tag">12 Months</span>
                    </div>
                    <TempRainfallLine data={tempRainfallTrend} />
                </div>
            </div>

            {/* Summary strip */}
            <div className="chart-card" style={{ background: "linear-gradient(135deg,#0f3d23,#1a5e35)", color: "#fff", border: "none" }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                    <div>
                        <p style={{ fontSize: 13, color: "#81c784", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" }}>About This Dashboard</p>
                        <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>Crop Recommendation System — ML Powered</h3>
                        <p style={{ fontSize: 13, color: "#a5d6a7", marginTop: 6, maxWidth: 600 }}>
                            Predicts the optimal crop based on soil nutrients (N, P, K), temperature, humidity, soil pH, and rainfall
                            using an ensemble of ML models (Random Forest ≈ 99.55% accuracy).
                        </p>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <p style={{ fontSize: 36, fontWeight: 800 }}>99.55%</p>
                        <p style={{ fontSize: 12, color: "#a5d6a7" }}>Random Forest Accuracy</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
