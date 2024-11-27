import express from "express";
import dotenv from "dotenv";
dotenv.config();
import connect from "./utils/connect";
import routes from "./routes";
import deserializeAccount from "./middleware/deserializeAccount";

const port = 3000;

const app = express();

app.use(express.json());

app.use(deserializeAccount);

app.listen(port, async () => {
  console.log(`App is running at http://localhost:${port}`);

  await connect();

  routes(app);
});
