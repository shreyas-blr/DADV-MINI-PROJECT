import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from "recharts";

export default function TempRainfallLine({ data = [] }) {
    return (
        <ResponsiveContainer width="100%" height={270}>
            <LineChart data={data} margin={{ top: 5, right: 16, left: -10 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis yAxisId="left" tick={{ fontSize: 12 }} unit="°" />
                <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} unit="mm" />
                <Tooltip
                    contentStyle={{ borderRadius: 8, border: "none", boxShadow: "0 4px 20px rgba(0,0,0,.12)", fontSize: 13 }}
                />
                <Legend wrapperStyle={{ fontSize: 13 }} />
                <Line
                    yAxisId="left" type="monotone" dataKey="avgTemp"
                    stroke="#e67e22" strokeWidth={2.5} dot={{ r: 3 }} name="Avg Temp (°C)"
                />
                <Line
                    yAxisId="right" type="monotone" dataKey="avgRainfall"
                    stroke="#2980b9" strokeWidth={2.5} dot={{ r: 3 }} name="Avg Rainfall (mm)"
                />
            </LineChart>
        </ResponsiveContainer>
    );
}
