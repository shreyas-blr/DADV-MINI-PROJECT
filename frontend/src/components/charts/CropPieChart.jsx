import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = [
    "#27ae60", "#16a085", "#2980b9", "#8e44ad", "#e67e22",
    "#c0392b", "#1abc9c", "#f39c12", "#2c3e50", "#d35400",
    "#27ae60b0", "#16a085b0", "#2980b9b0", "#8e44adb0", "#e67e22b0",
    "#c0392bb0", "#1abc9cb0", "#f39c12b0", "#2c3e50b0", "#d35400b0",
    "#95a5a6", "#7f8c8d",
];

const RADIAN = Math.PI / 180;
const renderLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    if (percent < 0.04) return null;
    const r = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + r * Math.cos(-midAngle * RADIAN);
    const y = cy + r * Math.sin(-midAngle * RADIAN);
    return (
        <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={600}>
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

export default function CropPieChart({ data = [] }) {
    return (
        <ResponsiveContainer width="100%" height={300}>
            <PieChart>
                <Pie
                    data={data} dataKey="count" nameKey="crop"
                    cx="50%" cy="50%" innerRadius={70} outerRadius={110}
                    labelLine={false} label={renderLabel}
                >
                    {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip
                    contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,.12)", fontSize: 13 }}
                    formatter={(v) => [v, "Records"]}
                />
                <Legend wrapperStyle={{ fontSize: 12 }} />
            </PieChart>
        </ResponsiveContainer>
    );
}
