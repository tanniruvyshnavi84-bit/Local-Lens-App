import User from "../models/User.js";
import { getAuth } from "@clerk/express";

export const protect = async (req, res, next) => {
    try {
        // Use getAuth to reliably get the auth object in v5
        const auth = getAuth(req);

        if (!auth || !auth.userId) {
            console.log("❌ PROTECT: No auth or userId found in request");
            return res.status(401).json({
                success: false,
                message: "Not authenticated"
            });
        }

        const userId = auth.userId;
        console.log("🔐 PROTECT: Authenticating Clerk user:", userId);

        let user = await User.findOne({ clerkId: userId });

        if (!user) {
            console.log("📝 PROTECT: User not found in DB, creating temporary record...");
            user = await User.create({
                clerkId: userId,
                name: "User",
                email: "test@gmail.com",
                imageUrl: "",
                role: "tourist",
                recentSearchedCities: []
            });
        }

        req.user = user;
        next();

    } catch (error) {
        console.log("❌ PROTECT ERROR:", error);
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};