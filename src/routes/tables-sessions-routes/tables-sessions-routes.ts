import { Router } from "express";

import { TablesSessionsController } from "@/controllers/tables-sessions-controller";

const tablesSessionRoutes = Router();
const tablesSessionController = new TablesSessionsController();

tablesSessionRoutes.post("/", tablesSessionController.create)

export { tablesSessionRoutes}