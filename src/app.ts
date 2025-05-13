import express from 'express';
import cors from 'cors';
import produtoRoutes from './routes/produtos';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/produtos', produtoRoutes);

export default app;