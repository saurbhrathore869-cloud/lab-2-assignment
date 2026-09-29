const express = require("express");

const studentRoutes = require("./routes/studentRoutes");
const logger = require("./middleware/logger");

const app = express();


// ==========================================
// GLOBAL MIDDLEWARE
// ==========================================

app.use(express.json());

// Custom logger middleware
app.use(logger);


// ==========================================
// STUDENT ROUTES
// ==========================================

app.use("/students", studentRoutes);


// ==========================================
// HOME ROUTE
// ==========================================

app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Student API is running"
    });
});


// ==========================================
// 404 HANDLER
// ==========================================

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});


// ==========================================
// GLOBAL ERROR HANDLER
// ==========================================

app.use((err, req, res, next) => {
    console.error(err);

    res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err.message
    });
});


// ==========================================
// START SERVER
// ==========================================

const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
