import Hotel from "../models/Hotel.js";
import { v2 as cloudinary } from "cloudinary";
import Room from "../models/Room.js";

// Create Room
export const createRoom = async (req, res) => {
    try {
        const { roomType, pricePerNight, amenities } = req.body;

        const hotel = await Hotel.findOne({ owner: req.auth.userId });

        if (!hotel) {
            return res.json({ success: false, message: "No Hotel found" });
        }

        const uploadImages = req.files.map(async (file) => {
            const result = await cloudinary.uploader.upload(file.path);
            return result.secure_url;
        });

        const images = await Promise.all(uploadImages);

        await Room.create({
            hotel: hotel._id,
            roomType,
            pricePerNight: +pricePerNight,
            amenities: JSON.parse(amenities),
            images,
        });

        res.json({ success: true, message: "Room created successfully" });

    } catch (error) {
        console.log("❌ CREATE ROOM ERROR:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// Get all rooms
export const getRooms = async (req, res) => {
    try {
        const rooms = await Room.find({ isAvailable: true })
            .populate({
                path: 'hotel',
                populate: {
                    path: 'owner',
                    select: 'image'
                }
            })
            .sort({ createdAt: -1 });

        res.json({ success: true, rooms });

    } catch (error) {
        console.log("❌ GET ROOMS ERROR:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// Owner rooms
export const getOwnerRooms = async (req, res) => {
    try {
        const hotel = await Hotel.findOne({ owner: req.auth.userId });

        if (!hotel) {
            return res.json({ success: false, message: "No Hotel found" });
        }

        const rooms = await Room.find({ hotel: hotel._id }).populate("hotel");

        res.json({ success: true, rooms });

    } catch (error) {
        console.log("❌ OWNER ROOMS ERROR:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// Toggle availability
export const toggleRoomAvailability = async (req, res) => {
    try {
        const { roomId } = req.body;

        const room = await Room.findById(roomId);

        room.isAvailable = !room.isAvailable;

        await room.save();

        res.json({ success: true });

    } catch (error) {
        console.log("❌ TOGGLE ROOM ERROR:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};