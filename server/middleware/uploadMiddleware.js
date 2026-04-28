import multer from "multer";

// storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");   // 👈 IMPORTANT
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // 👈 unique name
  }
});

const upload = multer({ storage });

export default upload;