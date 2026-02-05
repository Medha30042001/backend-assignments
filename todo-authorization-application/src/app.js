import express from 'express';
import userRoutes from './routes/auth.routes.js';
import todoRoutes from './routes/todo.routes.js';

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/todos', todoRoutes);

app.use((err, req, res, next) => {
    res.status(500).json({message : 'Internal Server Error'});
}) 

export default app;