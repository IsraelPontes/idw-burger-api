import { Router } from "express";
import UserController from "./app/controlllers/UserController";
import SessionController from "./app/controlllers/SessionController";

const routes = new Router()

routes.post('/users', UserController.store)
routes.post('/session', SessionController.store)

export default routes