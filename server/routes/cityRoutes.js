import express from "express";
import { getCities, getCityPlaces } from "../controllers/cityController.js";

const cityRouter = express.Router();

cityRouter.get("/", getCities);
cityRouter.get("/:id/places", getCityPlaces);

export default cityRouter;
