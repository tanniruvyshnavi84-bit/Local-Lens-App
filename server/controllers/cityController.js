import City from "../models/City.js";
import Place from "../models/Place.js";

export const getCities = async (req, res) => {
  try {
    const cities = await City.find({});
    res.json({ success: true, cities });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getCityPlaces = async (req, res) => {
  try {
    const { id } = req.params;
    const places = await Place.find({ cityId: id });
    res.json({ success: true, places });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
