import express from "express";
import cors from "cors";
import articleRouter from "./routes/article.route.js";
import config from "./config/config.config.js";

const app = express();

const allowedOrigin = config.frontend_url;

app.use(
  cors({
    origin: allowedOrigin,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json()); //

app.get("/", (req, res) => {
  res.send("Hi! You lazy ass.");
});

/**
 * Articles endpoint
 */
app.use("/api/v1/articles", articleRouter);

export default app;
