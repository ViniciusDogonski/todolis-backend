import { Express } from 'express';
import { userController } from './controllers/userController';
import { categoryController } from './controllers/categoryController';
import { activityController } from './controllers/activityController';
import { authController } from './controllers/authController';
import { authMiddleware } from './middleware/authMiddleware';
import { sessionController } from './controllers/sessionController';

export const routes = (app: Express) => {
    // Rotas de autenticação
    app.post('/register', authController.register);
    app.post('/login', authController.login);
    app.post('/logout', authMiddleware, authController.logout);
    
    // Rotas de usuários
    app.get('/users', authMiddleware, userController.getAllUsers);
    app.post('/users', authMiddleware, userController.createUser);

    // Rotas de categorias
    app.get('/categories', authMiddleware, categoryController.getAllCategories);
    app.post('/categories', authMiddleware, categoryController.createCategory);

    // Rotas de atividades
    app.get('/activities', authMiddleware, activityController.getAllActivities);
    app.post('/activities', authMiddleware, activityController.createActivity);
    app.get('/user/activities', authMiddleware, activityController.getUserActivities);
    // Rotas de sessões
    app.get('/activities', authMiddleware, activityController.getAllActivities);
    app.get('/user/activities', authMiddleware, activityController.getUserActivities);
    app.post('/activities', authMiddleware, activityController.createActivity);
    app.put('/activities/:id', authMiddleware, activityController.updateActivity);
    app.delete('/activities/:id', authMiddleware, activityController.deleteActivity);
};
