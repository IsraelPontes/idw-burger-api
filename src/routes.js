import { Router } from "express";
import UserController from "./app/controlllers/UserController";
import SessionController from "./app/controlllers/SessionController";
import ProductController from "./app/controlllers/ProductController";
import multer from "multer";
import multerConfig from './config/multer';

const routes = new Router()
const upload = multer(multerConfig)

routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)
routes.post('/products', upload.single('file'),ProductController.store)
routes.get('/products', ProductController.index)

export default routes