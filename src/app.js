import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import login from './routes/login.routes.js';
import home from './routes/home.routes.js';
import session from 'express-session';
import { SESSION_SECRET } from './config.js';
const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Routes
app.use('/api', login);
app.use('/api', home);

export default app;
