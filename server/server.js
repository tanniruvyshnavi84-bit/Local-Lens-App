import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import clerkwebhooks from "./controllers/clerkWebhooks.js";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import cityRouter from "./routes/cityRoutes.js";
import placeRouter from "./routes/placeRoutes.js";
import guideRouter from "./routes/guideRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
connectDB();

const app = express();

// 📡 GLOBAL LOGGER
app.use((req, res, next) => {
    console.log(`📡 [${new Date().toISOString()}] ${req.method} ${req.url}`);
    if (req.headers.authorization) {
        console.log(`   🔑 Auth Header: Present (Ends with ...${req.headers.authorization.slice(-5)})`);
    } else {
        console.log(`   ❌ Auth Header: MISSING`);
    }
    next();
});

// Permissive CORS
app.use(cors({
    origin: true,
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Webhook
app.post("/api/clerk", express.raw({ type: "application/json" }), clerkwebhooks);

app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Clerk Middleware
app.use(clerkMiddleware({
    publishableKey: process.env.CLERK_PUBLISHABLE_KEY,
    secretKey: process.env.CLERK_SECRET_KEY
}));

// ✅ TEST ROUTE
app.get('/api/test', (req, res) => res.json({ success: true, message: "Test route works" }));

// Routes
app.use('/api/user', userRouter);
app.use('/api/cities', cityRouter);
app.use('/api/places', placeRouter);
app.use('/api/guides', guideRouter);
app.use('/api/bookings', bookingRouter);

// Root Route with Diagnostic
app.get("/", (req, res) => {
    console.log(`🏠 Home route hit! URL: ${req.url}`);
    res.json({ 
        success: true, 
        message: "API IS WORKING - v2", 
        diagnostics: {
            requestedUrl: req.url,
            originalUrl: req.originalUrl,
            params: req.params
        }
    });
});

// 🛡️ Catch-all
app.use((req, res) => {
    console.log(`⚠️ 404 Not Found: ${req.method} ${req.url}`);
    res.status(404).json({ success: false, message: `Route ${req.url} not found` });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));