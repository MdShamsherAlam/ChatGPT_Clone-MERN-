import express from 'express'
import isAuth from '../middleware/isAuthMiddleware.js'
import {
    summaryController,
    paragraphController,
    chatbotController,
    jsconverterController,
    scifiImageController,
} from "../controllers/openAiController.js";


const router = express.Router();

//route
router.post("/summary", isAuth, summaryController);
router.post("/paragraph", isAuth, paragraphController);
router.post("/chatbot", chatbotController);
router.post("/js-converter", jsconverterController);
router.post("/scifi-image", scifiImageController);

export default router;