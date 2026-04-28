import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import { toast } from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

const AppContext = createContext();

export const AppProvider = ({ children }) => {

    const currency = import.meta.env.VITE_CURRENCY || "$";
    const navigate = useNavigate();
    const { user, isLoaded } = useUser();
    const { getToken } = useAuth();

    const [isOwner, setIsOwner] = useState(false);
    const [isGuide, setIsGuide] = useState(false);
    const [showHotelReg, setShowHotelReg] = useState(false);
    const [searchedCities, setSearchedCities] = useState([]);
    const [cities, setCities] = useState([]); 

    const fetchCities = async () => {
        try {
            const { data } = await axios.get('/api/cities');
            if (data.success) {
                setCities(data.cities || []);
            }
        } catch (error) {
            console.error("Cities fetch error", error);
        }
    };

    const syncUserWithBackend = async () => {
        if (!user) return;
        try {
            console.log("🔄 Syncing user...", user.id);
            await axios.post('/api/user/sync', {
                clerkId: user.id,
                name: user.fullName,
                email: user.primaryEmailAddress?.emailAddress,
                imageUrl: user.imageUrl
            });
            console.log("✅ Sync complete");
        } catch (error) {
            console.error("❌ Sync error:", error);
        } finally {
            fetchUser(); 
        }
    };

   const fetchUser = async () => {
    try {
        const token = await getToken();

        if (!token) {
            console.log("⏳ Token not ready yet...");
            return;
        }

        const apiUrl = `${axios.defaults.baseURL}/api/user`;
        console.log("🚀 FETCH USER CALLING URL:", apiUrl);
        console.log("User:", user);
        console.log("Token:", token);

        const { data } = await axios.get('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        console.log("📥 Server Response Details:", {
            data: data,
            type: typeof data
        });

        if (data && data.success) {
            setIsOwner(data.role === "hotelOwner");
            setSearchedCities(data.searchedCities || []);
            
            // Explicitly check for Guide using the new API
            try {
                if (!user || !user.id) {
                    setIsGuide(false);
                } else {
                    const guideRes = await axios.get(`/api/guides/user/${user.id}`, {
                        headers: { Authorization: `Bearer ${token}` }
                    });
                    if (guideRes.data.success && guideRes.data.guide) {
                        setIsGuide(true);
                        if (window.location.pathname === "/guide-registration") {
                            navigate("/guide-dashboard");
                        }
                    } else {
                        // Fallback to role if the specific API fails to find it but user API did
                        setIsGuide(data.role === "guide");
                    }
                }
            } catch (guideError) {
                console.error("❌ Guide Check Error:", guideError.response?.data || guideError.message);
                // Fallback to role if the specific API fails to find it but user API did
                setIsGuide(data.role === "guide");
            }
        } else {
            console.warn("⚠️ Server returned non-success response or unexpected format:", data);
        }

    } catch (error) {
        if (error.response?.status === 401) {
            console.warn("🔒 401 Unauthorized - Clerk rejected the token.");
        }
        console.error("❌ FETCH USER ERROR:", error.response?.data || error.message);
    }
};

    useEffect(() => {
        if (isLoaded && user) {
            syncUserWithBackend();
        } else if (isLoaded && !user) {
            setIsGuide(false);
            setIsOwner(false);
        }
    }, [user, isLoaded]);
     
    useEffect(() => {
        fetchCities();
    }, []);

    const value = {
        currency, navigate, user, getToken, isOwner, setIsOwner, axios, showHotelReg, setShowHotelReg, searchedCities, setSearchedCities, cities, setCities, isGuide, setIsGuide, fetchUser
    };

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
};

export const useAppContext = () => useContext(AppContext);