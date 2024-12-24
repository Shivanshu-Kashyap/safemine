import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

// CORS configuration to allow cross-origin requests
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3000', // fallback to local dev URL if not set
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Import routes
import userRouter from "./routes/user.routes.js";
import workerRouter from "./routes/worker.routes.js"; // Import worker router

// Declare routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/workers", workerRouter); // Add worker routes

// Export app for server initialization
export { app };
