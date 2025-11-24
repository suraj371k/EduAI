import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from 'cookie-parser'

//routes imports
import userRoutes from "./routes/user.routes";
import roadmapRoutes from "./routes/roadmap.routes";
import { connectDB } from "./config/db";

dotenv.config();
const app = express();
app.use(express.json());
app.use(cookieParser())
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);


app.get("/", (req, res) => {
  res.send("Express + TypeScript + ES Modules ");
});

app.use("/api/users", userRoutes);
app.use("/api/roadmaps", roadmapRoutes);


//database connection
connectDB()

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
