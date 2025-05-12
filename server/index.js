import express from 'express';
import cors from 'cors';
import'dotenv/config';
import connectDB from './src/config/connectDB.js';
import authRouter from './src/routes/authRouter.js';
import userRouter from './src/routes/userRoutes.js';
import cookieParser from 'cookie-parser';


const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  credentials: true, 
}));

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 8080;

app.listen(PORT, async () => {
  console.log("server is running on port", PORT);
  await connectDB();
  console.log("DB connected");
});


app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

