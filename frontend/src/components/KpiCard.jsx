export default function KpiCard({ icon, label, value, sub, color, bg }) {
    return (
        <div className="kpi-card" style={{ "--kpi-color": color, "--kpi-bg": bg }}>
            <div className="kpi-icon-wrap">{icon}</div>
            <div className="kpi-body">
                <p className="kpi-label">{label}</p>
                <p className="kpi-value">{value}</p>
                {sub && <p className="kpi-sub">{sub}</p>}
            </div>
        </div>
    );
}
