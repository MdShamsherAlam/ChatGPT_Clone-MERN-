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
router.post("/chatbot", isAuth, chatbotController);
router.post("/js-converter", isAuth, jsconverterController);
router.post("/scifi-image", isAuth, scifiImageController);

export default router;