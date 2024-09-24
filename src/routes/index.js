import express from "express";
import { checkSSLCertificate } from "../controllers/checker.controller.js";

const router = express.Router();

router.post("/check-ssl/:domain", checkSSLCertificate);
export default router;
