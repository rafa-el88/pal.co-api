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


app.use((req, res, next) => {  
  res.setHeader('Access-Control-Allow-Origin', '*'); // Permitir todos os domínios  
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Métodos permitidos  
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Cabeçalhos permitidos  
  next();  
});  

// Rotas
app.use('/api/waitingListAccount', routes);
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
  console.log(`Swagger: http://localhost:${PORT}/swagger`);
});

export default app;