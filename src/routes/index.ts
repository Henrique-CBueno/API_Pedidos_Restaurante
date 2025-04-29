import { Router } from "express";

import { productsRoutes } from "./products/products-routes";
import { tablesRoutes } from "./tables/tables-routes";
import { tablesSessionRoutes } from "./tables-sessions-routes/tables-sessions-routes";

const routes = Router()
routes.use("/products", productsRoutes)
routes.use("/tables", tablesRoutes)
routes.use("/tables-sessions", tablesSessionRoutes)


export {routes}