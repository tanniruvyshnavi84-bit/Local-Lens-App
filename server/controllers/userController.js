import User from "../models/User.js";
import Guide from "../models/Guide.js";

// Sync User (Create if not exists)
export const syncUser = async (req, res) => {
  try {
    const { clerkId, name, email, imageUrl } = req.body;
    
    let user = await User.findOne({ clerkId });

    if (!user) {
      user = new User({
        clerkId,
        name,
        email,
        imageUrl
      });
      await user.save();
    } else {
      // Update existing user data
      user.name = name;
      user.email = email;
      user.imageUrl = imageUrl;
      await user.save();
    }

    res.json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

import { getAuth } from "@clerk/express";

// Get /api/user/
export const getUserData = async (req, res) => {
    try {
        const auth = getAuth(req);
        const clerkId = auth?.userId;

        if (!clerkId) {
            return res.status(401).json({
                success: false,
                message: "Unauthorized - No Clerk ID",
                debugAuth: auth
            });
        }

        // Find user in our DB
        let user = await User.findOne({ clerkId });

        if (!user) {
            // Auto-create if sync hasn't happened yet
            user = await User.create({
                clerkId,
                name: "User",
                email: "test@gmail.com",
                imageUrl: "",
                role: "tourist"
            });
        }

        // Check if user is a guide using BOTH clerkId and internal _id
        const guide = await Guide.findOne({ 
            $or: [
                { userId: clerkId },
                { userId: user._id }
            ] 
        });
        
        const isGuide = !!guide;

        res.json({
            success: true,
            role: isGuide ? "guide" : (user.role || "user"),
            searchedCities: user.recentSearchedCities || []
        });

    } catch (error) {
        console.log("❌ GET USER ERROR:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};


// Store User Recent Searched Cities
export const storeRecentSearchedCities = async (req, res) => {
    try {
        const { recentSearchedCity } = req.body;
        const clerkId = req.auth.userId;

        const user = await User.findOne({ clerkId });

        if (!user) return res.status(404).json({ success: false, message: "User not found" });

        if (!user.recentSearchedCities) {
            user.recentSearchedCities = [];
        }

        if (user.recentSearchedCities.length >= 3) {
            user.recentSearchedCities.shift();
        }

        user.recentSearchedCities.push(recentSearchedCity);

        await user.save();

        res.json({
            success: true,
            message: "City added",
            searchedCities: user.recentSearchedCities
        });

    } catch (error) {
        console.log("❌ STORE CITY ERROR:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};