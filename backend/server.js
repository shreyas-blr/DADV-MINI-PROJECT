const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const predictRouter = require("./routes/predict");
const analyticsRouter = require("./routes/analytics");

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors({ origin: "*" }));
app.use(bodyParser.json());

// Routes
app.use("/predict", predictRouter);
app.use("/analytics", analyticsRouter);

// Health check
app.get("/", (req, res) => {
    res.json({ status: "ok", message: "Crop Recommendation API running 🌾" });
});

app.listen(PORT, () => {
    console.log(`\n🌿 Crop Recommendation Server running on http://localhost:${PORT}\n`);
});
