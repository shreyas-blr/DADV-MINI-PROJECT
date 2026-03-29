import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
} from "recharts";

const COLORS = [
    "#27ae60", "#16a085", "#2980b9", "#8e44ad", "#e67e22",
    "#c0392b", "#1abc9c", "#f39c12", "#2c3e50", "#d35400",
];

export default function CropBarChart({ data = [] }) {
    return (
        <ResponsiveContainer width="100%" height={270}>
            <BarChart data={data} layout="vertical" margin={{ left: 10, right: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 12 }} />
                <YAxis dataKey="crop" type="category" width={90} tick={{ fontSize: 12 }} />
                <Tooltip
                    contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,.12)", fontSize: 13 }}
                    formatter={(v) => [v, "Predictions"]}
                />
                <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                    {data.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
}
