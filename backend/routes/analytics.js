const express = require("express");
const router = express.Router();
const { expandedData } = require("../data/sampleData");

// GET /analytics
router.get("/", (req, res) => {
    try {
        const total = expandedData.length;

        // --- KPIs ---
        const cropCounts = {};
        let totalTemp = 0, totalRainfall = 0;

        expandedData.forEach(row => {
            cropCounts[row.label] = (cropCounts[row.label] || 0) + 1;
            totalTemp += row.temperature;
            totalRainfall += row.rainfall;
        });

        const mostRecommended = Object.entries(cropCounts).sort((a, b) => b[1] - a[1])[0][0];
        const avgTemp = parseFloat((totalTemp / total).toFixed(2));
        const avgRainfall = parseFloat((totalRainfall / total).toFixed(2));

        // --- Crop Frequency (top 10) ---
        const cropFrequency = Object.entries(cropCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10)
            .map(([crop, count]) => ({ crop, count }));

        // --- Crop Distribution (all crops) ---
        const cropDistribution = Object.entries(cropCounts)
            .map(([crop, count]) => ({
                crop,
                count,
                percentage: parseFloat(((count / total) * 100).toFixed(2)),
            }))
            .sort((a, b) => b.count - a.count);

        // --- Temperature vs Rainfall Trend (12 months simulated) ---
        const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const tempRainfallTrend = months.map((month, i) => {
            // Simulate seasonal variation using sin/cos + dataset mean
            const seasonTemp = avgTemp + 4 * Math.sin((i / 11) * Math.PI);
            const seasonRainfall = avgRainfall + 40 * Math.sin(((i - 2) / 11) * Math.PI);
            return {
                month,
                avgTemp: parseFloat(seasonTemp.toFixed(1)),
                avgRainfall: parseFloat(Math.max(0, seasonRainfall).toFixed(1)),
            };
        });

        // --- Nutrient Stats (top 8 crops avg N, P, K) ---
        const nutrientMap = {};
        expandedData.forEach(row => {
            if (!nutrientMap[row.label]) nutrientMap[row.label] = { N: [], P: [], K: [] };
            nutrientMap[row.label].N.push(row.N);
            nutrientMap[row.label].P.push(row.P);
            nutrientMap[row.label].K.push(row.K);
        });

        const avg = arr => parseFloat((arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1));

        const nutrientStats = Object.entries(nutrientMap)
            .slice(0, 8)
            .map(([crop, vals]) => ({
                crop,
                N: avg(vals.N),
                P: avg(vals.P),
                K: avg(vals.K),
            }));

        // --- Response ---
        res.json({
            kpis: {
                totalPredictions: total,
                mostRecommended,
                avgTemp,
                avgRainfall,
            },
            cropFrequency,
            tempRainfallTrend,
            cropDistribution,
            nutrientStats,
        });
    } catch (err) {
        res.status(500).json({ error: "Analytics failed.", details: err.message });
    }
});

module.exports = router;
