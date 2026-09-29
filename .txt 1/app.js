const express = require("express");
const studentRoutes = require("./routes/studentRoutes");

const app = express();

// Middleware
app.use(express.json());

// Mount student router
app.use("/students", studentRoutes);

// Home route
app.get("/", (req, res) => {
    res.send("Student API is running");
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        message: "Route not found"
    });
});

// Start server
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
