import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connect from "./utils/connect";
import routes from "./routes";
import deserializeAccount from "./middleware/deserializeAccount";
import cors from "cors";

const port = process.env.PORT || 3000;
const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.use(deserializeAccount);

app.listen(port, async () => {
  console.log(`App is running at http://localhost:${port}`);

  await connect();

  routes(app);
});
