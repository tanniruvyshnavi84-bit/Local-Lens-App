import Place from "../models/Place.js";
import Guide from "../models/Guide.js";

export const getAllPlaces = async (req, res) => {
  try {
    const places = await Place.find({}).populate('cityId');
    res.json({ success: true, places });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPlaceById = async (req, res) => {
  try {
    const place = await Place.findById(req.params.id).populate('cityId');
    if (!place) return res.status(404).json({ success: false, message: "Place not found" });
    res.json({ success: true, place });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getPlaceGuides = async (req, res) => {
  try {
    const guides = await Guide.find({ places: req.params.id });
    res.json({ success: true, guides });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
