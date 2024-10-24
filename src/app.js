import express from "express";
import helmet from "helmet";
import { JWT_SECRET, PARSER_SECRET, ENVIRONMENT, FRONTEND_URL } from "./config.js";
import { loginRouter } from "./routes/login.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from 'morgan'

 const app = express();

if (ENVIRONMENT === "production") {

}

app.use(express.json());
app.use(cookieParser(PARSER_SECRET))
app.use(morgan('dev'))

//Helper to send http headers appropiately
app.use(helmet())

app.use(cors({
    origin: FRONTEND_URL,
  }))

//Reduces fingerprinting
app.disable("x-powered by");

// Add routes
app.use("/api", loginRouter);


export default app;