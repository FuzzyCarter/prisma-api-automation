import express from 'express';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { prisma } from './lib/prisma';
import { UserController } from './controllers/user.controller';
import { ProductController } from './controllers/product.controller';
import { generateSwaggerDoc } from './lib/swagger-generator';

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize controllers
const userController = new UserController();
const productController = new ProductController();

// Routes
app.use('/api/users', userController.getRouter());
app.use('/api/products', productController.getRouter());

// Generate Swagger documentation
const swaggerDoc = generateSwaggerDoc([userController, productController]);

// Serve Swagger documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`API endpoints available at http://localhost:${port}/api`);
  console.log(`Swagger documentation available at http://localhost:${port}/api-docs`);
});

// Handle graceful shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
}); 