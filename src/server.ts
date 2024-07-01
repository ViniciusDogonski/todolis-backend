import express from 'express';
import cors from 'cors';
import { routes } from './routes';

const app = express();

// Middleware para permitir JSON e CORS
app.use(express.json());
app.use(cors());

// Registrar as rotas
routes(app);

const PORT = process.env.PORT || 3333;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
