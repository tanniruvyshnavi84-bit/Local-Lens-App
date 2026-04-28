import express from "express";
import { getPlaceById, getPlaceGuides, getAllPlaces } from "../controllers/placeController.js";

const placeRouter = express.Router();

placeRouter.get("/all", getAllPlaces);
placeRouter.get("/:id", getPlaceById);
placeRouter.get("/:id/guides", getPlaceGuides);

export default placeRouter;
