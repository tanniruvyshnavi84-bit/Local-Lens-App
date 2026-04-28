import Hotel from "../models/Hotel.js";
import User from "../models/User.js";

export const registerHotel = async (req, res) => {
  try {
    const {
      name,
      address,
      contact,
      city,
      languages,
      experience,
      bio
    } = req.body;

    const owner = req.user._id;

    const profilePic = req.files?.profilePic?.[0]?.filename || "";
    const introVideo = req.files?.introVideo?.[0]?.filename || "";

    const existingHotel = await Hotel.findOne({ owner });

    if (existingHotel) {
      return res.json({ success: false, message: "Hotel already registered" });
    }

    await Hotel.create({
      name,
      address,
      contact,
      city,
      languages,
      experience,
      bio,
      profilePic,
      introVideo,
      owner
    });

    await User.findByIdAndUpdate(owner, { role: "hotelOwner" });

    res.json({ success: true, message: "Hotel registered successfully" });

  } catch (error) {
    console.log("❌ HOTEL ERROR:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getMyHotel = async (req, res) => {
  try {
    const owner = req.user._id;

    const hotel = await Hotel.findOne({ owner });

    if (!hotel) {
      return res.json({ success: false, message: "No data found" });
    }

    res.json({ success: true, hotel });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};