// const express = require('express');
// const app = express();
// const port = process.env.PORT || 3000;
// const waitingListAccountRoutes = require('./src/routes/waitingListAccountModule');
// const swaggerUi = require('swagger-ui-express');
// const swaggerSpec = require('./swagger/swaggerConfig');

// app.use(express.json());

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// app.use('/', waitingListAccountRoutes);

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({
  path: path.resolve(__dirname, `.env.${process.env.NODE_ENV}`),
});

import express from 'express';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpecs } from './swagger/swaggerConfig.js';

// Routes
import routes from './src/routes/waitingListAccountRoutes.js';

const app = express();

app.use(express.json());

// Rotas
app.use('/waitingListAccount', routes);
// Configuração do Swagger
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Servir o relatório de cobertura na rota /coverage
app.use('/coverage', express.static(path.resolve('coverage')));

// Middleware para erro 404
app.use((req, res) => {
  res.status(404).json({ message: 'Rota não encontrada' });
});

// Iniciar o servidor
const PORT = process.env.PORT || 6005;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;