import User from "../models/User.js";
import { Webhook } from "svix";

const clerkwebhooks = async (req, res) => {
    try {
        console.log("🔥 WEBHOOK HIT SUCCESSFULLY");

        const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

        const headers = {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        };

        // ✅ verify
        const payload = whook.verify(req.body, {
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        });

        console.log("✅ Webhook verified");

        const { data, type } = payload;

        console.log("👉 Event type:", type);

        // ✅ SAFE DATA EXTRACTION
        const userData = {
            name: `${data.first_name || ""} ${data.last_name || ""}`,
            email: data.email_addresses?.[0]?.email_address || "no-email",
            imageUrl: data.image_url || "",
        };

        switch (type) {
    case "user.created": {
        console.log("🟢 Creating or updating user");

        await User.findOneAndUpdate(
            { clerkId: data.id },
            { ...userData, clerkId: data.id },
            { upsert: true, new: true }
        );

        break;
    }

    case "user.updated": {
        console.log("🟡 Updating user");

        await User.findOneAndUpdate(
            { clerkId: data.id },
            userData
        );

        break;
    }

    case "user.deleted": {
        console.log("🔴 Deleting user");

        await User.findOneAndDelete({ clerkId: data.id });

        break;
    }

    default: {
        console.log("⚠ Unknown event");
    }
}
        res.json({ success: true });

    } catch (error) {
        console.error("❌ ERROR:", error.message);
        res.json({ success: false });
    }
};

export default clerkwebhooks;