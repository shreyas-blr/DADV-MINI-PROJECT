const express = require("express");
const router = express.Router();
const { expandedData, cropProfiles } = require("../data/sampleData");

// Rule-based prediction using crop profiles/thresholds
function predictCrop(N, P, K, temperature, humidity, ph, rainfall) {
    let bestCrop = null;
    let bestScore = Infinity;

    Object.entries(cropProfiles).forEach(([crop, r]) => {
        const midN = (r.N[0] + r.N[1]) / 2;
        const midP = (r.P[0] + r.P[1]) / 2;
        const midK = (r.K[0] + r.K[1]) / 2;
        const midTemp = (r.temp[0] + r.temp[1]) / 2;
        const midHum = (r.hum[0] + r.hum[1]) / 2;
        const midPh = (r.ph[0] + r.ph[1]) / 2;
        const midRain = (r.rain[0] + r.rain[1]) / 2;

        // Normalize & compute Euclidean distance to crop centroid
        const score =
            Math.pow((N - midN) / 100, 2) +
            Math.pow((P - midP) / 100, 2) +
            Math.pow((K - midK) / 100, 2) +
            Math.pow((temperature - midTemp) / 20, 2) +
            Math.pow((humidity - midHum) / 50, 2) +
            Math.pow((ph - midPh) / 5, 2) +
            Math.pow((rainfall - midRain) / 200, 2);

        if (score < bestScore) {
            bestScore = score;
            bestCrop = crop;
        }
    });

    // Convert distance to a confidence percentage (lower distance → higher confidence)
    const confidence = Math.max(60, Math.min(99, Math.round(100 - bestScore * 200)));
    return { crop: bestCrop, confidence };
}

// POST /predict
router.post("/", (req, res) => {
    try {
        const { N, P, K, temperature, humidity, ph, rainfall } = req.body;

        if ([N, P, K, temperature, humidity, ph, rainfall].some(v => v === undefined || v === null || isNaN(v))) {
            return res.status(400).json({ error: "All fields (N, P, K, temperature, humidity, ph, rainfall) are required." });
        }

        const result = predictCrop(
            parseFloat(N), parseFloat(P), parseFloat(K),
            parseFloat(temperature), parseFloat(humidity),
            parseFloat(ph), parseFloat(rainfall)
        );

        res.json(result);
    } catch (err) {
        res.status(500).json({ error: "Prediction failed.", details: err.message });
    }
});

module.exports = router;
