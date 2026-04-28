import express from "express";
import { getUserData, storeRecentSearchedCities, syncUser } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const userRouter = express.Router();

// Match both /api/user and /api/user/
userRouter.get("/", protect, getUserData);
userRouter.get("", protect, getUserData);

userRouter.post('/sync', syncUser);
userRouter.post('/store-recent-search', protect, storeRecentSearchedCities);

export default userRouter;
