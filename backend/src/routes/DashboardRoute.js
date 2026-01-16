import express from "express";
import { getKPIs } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/kpis", getKPIs);

export default router;
