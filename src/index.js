import app from "./app.js";
import { PORT } from "./config.js";
import {
  DB_SERVER,
  DB_PORT,
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD,
} from "./config.js";
import { getConnection } from "./database/connection.js";

const requiredEnvVars = {
  DB_SERVER,
  DB_PORT,
  DB_DATABASE,
  DB_USER,
  DB_PASSWORD,
};

for (const [key, value] of Object.entries(requiredEnvVars)) {
  if (!value) {
    throw new Error(`${key} is missing`);
  }
}

app.listen(PORT, () => {
  getConnection();
});
console.log("Server on port", PORT);
