import { Router } from "express";
import {
  ask,
  search,
  searchOne,
  createDocument,
} from "../controllers/ragController";

const router = Router();

router.post("/ask", ask);
router.post("/search", search);
router.post("/search-one", searchOne);
router.post("/documents", createDocument);
export default router;
