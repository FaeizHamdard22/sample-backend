import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./app/models/models.js";
import tutorialRoutes from "./app/routes/tutorial.routes.js";

// Load environment variables
dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
    origin: ["http://localhost:5173", "http://192.168.56.10:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to the Tutorial Application." });
});

// Routes
tutorialRoutes(app);

// Sync database
db.sequelize.sync().then(() => {
    console.log("Synced db.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}.`);
});
