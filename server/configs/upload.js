import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    // Determine the resource type based on the file mimetype
    let resource_type = "auto"; // Auto detects image, video, raw
    if (file.mimetype.includes("video")) {
      resource_type = "video";
    } else if (file.mimetype.includes("image")) {
      resource_type = "image";
    }

    return {
      folder: "locallens_guides",
      resource_type: resource_type,
      // You can add format: 'mp4' here for videos if needed, but auto handles it.
    };
  },
});

export const upload = multer({ storage: storage });
