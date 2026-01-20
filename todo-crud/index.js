const express = require('express');
const todosRoutes = require('./routes/todos.routes.js');
const loggerMiddleware = require('./middleware/logger.middleware.js');

const app = express();
const PORT = 3000;

app.use(express.json());

app.use(loggerMiddleware);

app.use('/todos', todosRoutes);


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})