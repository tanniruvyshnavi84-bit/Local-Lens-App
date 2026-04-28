import express from "express";
import { 
    getGuideById, 
    registerGuide, 
    updateAvailability, 
    getGuidesByPlace, 
    getMyGuideProfile,
    updateGuideProfile,
    getGuideByUserId
} from "../controllers/guideController.js";
import { protect } from "../middleware/authMiddleware.js";
import { upload } from "../configs/upload.js";

const guideRouter = express.Router();

guideRouter.post("/", protect, registerGuide);
guideRouter.get("/my-profile", protect, getMyGuideProfile);
guideRouter.patch(
    "/update", 
    protect, 
    upload.fields([{ name: 'profileImage', maxCount: 1 }, { name: 'video', maxCount: 1 }, { name: 'gallery', maxCount: 10 }]), 
    updateGuideProfile
);
guideRouter.get("/:id", getGuideById);
guideRouter.get("/user/:userId", protect, getGuideByUserId);
guideRouter.get("/place/:placeId", getGuidesByPlace);
guideRouter.patch("/availability", protect, updateAvailability);

export default guideRouter;
