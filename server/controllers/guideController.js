import Guide from "../models/Guide.js";
import User from "../models/User.js";

import { getAuth } from "@clerk/express";

// Register a new guide
export const registerGuide = async (req, res) => {
  try {
    const { name, email, phoneNumber, whatsappNumber, experienceYears, specialties, places, maxGroupSize, instagramHandle, userId: bodyUserId } = req.body;
    
    const auth = getAuth(req);
    const clerkId = auth?.userId || bodyUserId;

    if (!clerkId) {
      return res.status(400).json({ success: false, message: "Missing User ID (userId). Please ensure you are logged in." });
    }

    // Check if user is already a guide
    const existingGuide = await Guide.findOne({ 
        $or: [{ userId: clerkId }, { email: email }]
    });
    
    if (existingGuide) {
      return res.status(400).json({ success: false, message: "You are already registered as a guide" });
    }

    const newGuide = new Guide({
      userId: clerkId, // Store Clerk ID as userId
      name,
      email,
      phoneNumber,
      whatsappNumber,
      experienceYears,
      specialties,
      places, // Array of place IDs
      maxGroupSize,
      instagramHandle,
      isAvailable: true
    });

    await newGuide.save();

    // Update user role in User collection
    await User.findOneAndUpdate({ clerkId: clerkId }, { role: 'guide' });

    res.status(201).json({ success: true, message: "Guide registered successfully", guide: newGuide });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get guide profile by Clerk ID (authenticated)
export const getMyGuideProfile = async (req, res) => {
  try {
    const auth = getAuth(req);
    const userId = auth?.userId; // Clerk ID from middleware
    
    // Find the user first to get their internal _id if needed
    const user = await User.findOne({ clerkId: userId });
    
    const guide = await Guide.findOne({ 
        $or: [
            { userId: userId }, 
            { userId: user?._id }
        ] 
    });

    if (!guide) {
      return res.status(404).json({ success: false, message: "Guide profile not found" });
    }

    res.json({ success: true, guide });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update guide profile (authenticated)
export const updateGuideProfile = async (req, res) => {
    try {
        let { name, phoneNumber, whatsappNumber, experienceYears, specialties, places, isAvailable, bio, hourlyRate, languages, licenseNumber, userId: bodyUserId } = req.body;
        let profileImage = req.body.profileImage || "";
        let video = req.body.video || "";
        let gallery = req.body.gallery || [];

        const userId = req.auth?.userId || bodyUserId;

        if (!userId) {
            return res.status(400).json({ success: false, message: "Missing User ID" });
        }

        // Parse FormData strings back into arrays if needed
        const parseArray = (val) => {
            if (Array.isArray(val)) return val;
            if (typeof val === 'string') {
                try { return JSON.parse(val); } catch(e) { return val.split(',').filter(Boolean); }
            }
            return [];
        };

        specialties = parseArray(specialties);
        languages = parseArray(languages);
        places = parseArray(places);
        gallery = parseArray(gallery);

        // Handle uploaded files
        if (req.files) {
            if (req.files.profileImage) {
                profileImage = req.files.profileImage[0].path;
            }
            if (req.files.video) {
                video = req.files.video[0].path;
            }
            if (req.files.gallery) {
                const newGalleryUrls = req.files.gallery.map(file => file.path);
                gallery = [...gallery, ...newGalleryUrls];
            }
        }

        const user = await User.findOne({ clerkId: userId });

        const guide = await Guide.findOneAndUpdate(
            { 
                $or: [
                    { userId: userId }, 
                    { userId: user?._id }
                ] 
            },
            { name, phoneNumber, whatsappNumber, experienceYears, specialties, places, isAvailable, bio, hourlyRate, languages, profileImage, gallery, licenseNumber, video },
            { new: true }
        );

        if (!guide) {
            return res.status(404).json({ success: false, message: "Guide profile not found" });
        }

        res.json({ success: true, message: "Profile updated successfully", guide });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// Toggle Availability (authenticated)
export const updateAvailability = async (req, res) => {
  try {
    const { isAvailable, userId: bodyUserId } = req.body;
    const userId = req.auth?.userId || bodyUserId;

    if (!userId) {
        return res.status(400).json({ success: false, message: "Missing User ID" });
    }

    const user = await User.findOne({ clerkId: userId });

    const guide = await Guide.findOneAndUpdate(
        { 
            $or: [
                { userId: userId }, 
                { userId: user?._id }
            ] 
        }, 
        { isAvailable }, 
        { new: true }
    );

    if (!guide) {
        return res.status(404).json({ success: false, message: "Guide not found" });
    }

    res.json({ success: true, isAvailable: guide.isAvailable });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get guides by place
export const getGuidesByPlace = async (req, res) => {
  try {
    const guides = await Guide.find({ places: { $in: [req.params.placeId] }, isAvailable: true });
    res.json({ success: true, guides });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

import Booking from "../models/Booking.js";

// Get guide by ID
export const getGuideById = async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) {
      return res.status(404).json({ success: false, message: "Guide not found" });
    }

    // Check if guide has any ongoing bookings
    const ongoingBooking = await Booking.findOne({ guideId: req.params.id, status: 'ongoing' });
    const isBusy = !!ongoingBooking;

    res.json({ success: true, guide, isBusy });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get guide by User ID (Clerk ID)
export const getGuideByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const auth = getAuth(req);
    const authUserId = auth?.userId;

    console.log("Auth:", auth);
    console.log("Checking guide:", userId);

    if (!authUserId) {
        return res.status(401).json({ success: false, message: "Unauthorized - No Clerk ID" });
    }

    // Find the user first to get their internal _id if needed
    const user = await User.findOne({ clerkId: userId });

    let guide = await Guide.findOne({ 
        $or: [
            { userId: userId }, 
            { userId: user?._id }
        ] 
    });
    
    if (!guide && user && user.email) {
        guide = await Guide.findOne({ email: user.email });
        if (guide) {
            // Update userId to latest Clerk user.id
            guide.userId = userId;
            await guide.save();
        }
    }

    if (!guide) {
      return res.status(404).json({ success: false, message: "Guide not found" });
    }
    
    res.json({ success: true, guide });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
