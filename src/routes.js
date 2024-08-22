import { Router } from "express";
import UserController from "./app/controlllers/UserController";
import SessionController from "./app/controlllers/SessionController";
import ProductController from "./app/controlllers/ProductController";

const routes = new Router()

routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)
routes.post('/products', ProductController.store)

export default routes