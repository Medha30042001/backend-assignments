import express from 'express';
import orderRoutes from './routes/orders.routes.js'
import productRoutes from './routes/products.routes.js'
import analyticsRouter from './routes/analytics.routes.js'

const PORT = 4000;
const app = express();

app.use(express.json());
app.use('/products', productRoutes)
app.use('/orders', orderRoutes);
app.use('/analytics', analyticsRouter);


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})