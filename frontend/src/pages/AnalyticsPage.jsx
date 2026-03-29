import { useEffect, useState } from "react";
import { fetchAnalytics } from "../services/api";
import CropPieChart from "../components/charts/CropPieChart";
import NutrientChart from "../components/charts/NutrientChart";
import LoadingSpinner from "../components/LoadingSpinner";

export default function AnalyticsPage() {
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

    const { cropDistribution, nutrientStats } = data;

    return (
        <div className="page">
            <div className="page-header">
                <h1>📊 Analytics</h1>
                <p>Deep-dive data visualizations across crops, nutrients, and soil conditions.</p>
            </div>

            <div className="analytics-grid">
                {/* Pie Chart */}
                <div className="chart-card">
                    <div className="chart-card-header">
                        <h3>🥧 Crop Distribution</h3>
                        <span className="chart-tag">All 22 Crops</span>
                    </div>
                    <CropPieChart data={cropDistribution} />
                </div>

                {/* Nutrient Chart */}
                <div className="chart-card">
                    <div className="chart-card-header">
                        <h3>🧪 Soil Nutrient Comparison</h3>
                        <span className="chart-tag">N · P · K</span>
                    </div>
                    <NutrientChart data={nutrientStats} />
                </div>

                {/* Stats Table */}
                <div className="stats-table-card">
                    <h3>📋 Crop Statistics Summary</h3>
                    <div className="table-wrap">
                        <table>
                            <thead>
                                <tr>
                                    <th>Crop</th>
                                    <th>Records</th>
                                    <th>Distribution %</th>
                                    <th>Avg N (kg/ha)</th>
                                    <th>Avg P (kg/ha)</th>
                                    <th>Avg K (kg/ha)</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cropDistribution.map((row) => {
                                    const nutrients = nutrientStats.find(n => n.crop === row.crop);
                                    return (
                                        <tr key={row.crop}>
                                            <td><span className="crop-badge">{row.crop}</span></td>
                                            <td>{row.count}</td>
                                            <td>
                                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                                    <div style={{ flex: 1, background: "#e2e8f0", borderRadius: 20, height: 6 }}>
                                                        <div style={{ width: `${Math.min(row.percentage * 4, 100)}%`, background: "#27ae60", height: 6, borderRadius: 20 }} />
                                                    </div>
                                                    <span style={{ fontSize: 12, color: "#718096", minWidth: 36 }}>{row.percentage}%</span>
                                                </div>
                                            </td>
                                            <td>{nutrients?.N ?? "—"}</td>
                                            <td>{nutrients?.P ?? "—"}</td>
                                            <td>{nutrients?.K ?? "—"}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
