import { Router } from "express";
import multer from "multer";
import multerConfig from './config/multer';
import authMiddleware from "./app/middleware/auth";
import UserController from "./app/controlllers/UserController";
import SessionController from "./app/controlllers/SessionController";
import ProductController from "./app/controlllers/ProductController";
import CategoryController from "./app/controlllers/CategoryController";
import OrderController from "./app/controlllers/OrderController";

const routes = new Router()
const upload = multer(multerConfig)

routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)

routes.use(authMiddleware)
routes.post('/products', upload.single('file'), ProductController.store)
routes.get('/products', ProductController.index)

routes.post('/categories', CategoryController.store)
routes.get('/categories', CategoryController.index)

routes.post('/orders', OrderController.store)
routes.get('/orders', OrderController.index)
routes.put('/orders/:id', OrderController.update)

export default routes