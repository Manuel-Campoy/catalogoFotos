import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { env } from './config/env';
import { prisma } from './config/database';
import apiRoutes from './routes';
import { errorHandler } from './middleware/errorHandler';

const app: Express = express();

app.use(cors({ origin: env.CORS_ORIGIN }));
app.use(morgan(env.isDevelopment ? 'dev' : 'combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

app.use('/api', apiRoutes);

app.use((req: Request, res: Response) => {
  res.status(404).json({ succes: false, error: 'Route not found' });
});

app.use(errorHandler);

const PORT = env.PORT;

async function startServer() {
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('Base de datos conectada');

    app.listen(PORT, () => {
      console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
      console.log(`Entorno: ${env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('Error al iniciar servidor:', error);
    process.exit(1);
  }
}

startServer();

export default app;