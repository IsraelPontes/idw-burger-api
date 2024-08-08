import { Router } from "express";

const routes = new Router()

routes.get('/', (reuest, response) => {
    return response.status(200).json({ messege: "Hello World!" })
})

export default routes