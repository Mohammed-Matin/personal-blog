import express from "express";
import articleRouter from "./routes/article.route.js";


const app = express();


app.use(express.json()); // 

app.get('/', (req, res) => {
  res.send("Hi! You lazy ass.")
})

/**
 * Articles endpoint
 */
app.use('/api/v1/articles', articleRouter)

export default app;