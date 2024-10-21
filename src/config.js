//Server variables
export const PORT = parseInt(process.env.PORT) || 8000;
export const JWT_SECRET = process.env.JWT_SECRET;
export const REFRESH_JWT_SECRET = process.env.REFRESH_JWT_SECRET
export const PARSER_SECRET = process.env.PARSER_SECRET;
export const ENVIRONMENT = process.env.NODE_ENV || "development";

//Frontend variables
export const FRONTEND_URL = process.env.FRONTEND_URL;

//Database variables
export const DB_SERVER = process.env.DB_SERVER;
export const DB_PORT = parseInt(process.env.DB_PORT);
export const DB_NAME = process.env.DB_NAME;
export const DB_USER = process.env.DB_USER;
export const DB_PWD = process.env.DB_PWD;

const required = {
  PARSER_SECRET,
  JWT_SECRET,
  DB_SERVER,
  DB_PORT,
  DB_NAME,
  DB_USER,
  DB_PWD,
};

for (const [key, value] of Object.entries(required)) {
  if (!value) {
    throw new Error(`${key} environment variable missing`);
  }
}