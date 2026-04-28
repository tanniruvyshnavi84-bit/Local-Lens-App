import React, { useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const GuideRegistration = () => {
  const { axios, user, navigate, setIsGuide, getToken } = useAppContext();
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    whatsappNumber: "",
    experienceYears: "",
    specialties: "",
    maxGroupSize: "",
    instagramHandle: "",
  });

  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const { data } = await axios.get("/api/places/all");
        if (data.success) {
          setPlaces(data.places);
        }
      } catch (error) {
        toast.error("Failed to fetch places");
      }
    };
    fetchPlaces();
  }, [axios]);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.fullName || "",
        email: user.primaryEmailAddress?.emailAddress || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const togglePlace = (placeId) => {
    setSelectedPlaces(prev => 
      prev.includes(placeId) 
        ? prev.filter(id => id !== placeId) 
        : [...prev, placeId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (selectedPlaces.length === 0) {
        return toast.error("Please select at least one place");
    }

    setLoading(true);

    try {
      const payload = {
        ...formData,
        specialties: formData.specialties.split(",").map((s) => s.trim()),
        places: selectedPlaces,
        userId: user.id,
      };

      const token = await getToken();
      const { data } = await axios.post("/api/guides", payload, {
          headers: { Authorization: `Bearer ${token}` }
      });

      if (data.success) {
        toast.success("Registration successful! You are now a Guide.");
        setIsGuide(true);
        navigate("/guide-dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-28 pb-16 px-6 md:px-16 lg:px-24 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
        <div className="bg-indigo-600 px-8 py-10 text-white text-center">
          <h1 className="text-3xl font-playfair font-bold mb-2">Become a Local Lens Guide</h1>
          <p className="text-indigo-100 font-light">Share your passion and local expertise with the world</p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="Enter your email"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
              <input
                type="text"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="+91 XXXXXXXXXX"
              />
            </div>

            {/* WhatsApp */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">WhatsApp Number (Optional)</label>
              <input
                type="text"
                name="whatsappNumber"
                value={formData.whatsappNumber}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="+91 XXXXXXXXXX"
              />
            </div>

            {/* Experience */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Experience (Years) *</label>
              <input
                type="number"
                name="experienceYears"
                value={formData.experienceYears}
                onChange={handleChange}
                required
                min="0"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="e.g. 5"
              />
            </div>

            {/* Max Group Size */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Max Group Size *</label>
              <input
                type="number"
                name="maxGroupSize"
                value={formData.maxGroupSize}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="e.g. 10"
              />
            </div>

            {/* Specialties */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Specialties * (Comma separated)</label>
              <input
                type="text"
                name="specialties"
                value={formData.specialties}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                placeholder="e.g. History, Photography, Food & Culinary"
              />
            </div>

            {/* Place Selection (Multi-select) */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-3">Locations of Expertise * (Select multiple)</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-60 overflow-y-auto p-4 border border-gray-100 rounded-2xl bg-gray-50">
                {places.map((place) => (
                  <div 
                    key={place._id} 
                    onClick={() => togglePlace(place._id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                        selectedPlaces.includes(place._id) 
                        ? 'bg-indigo-50 border-indigo-200 text-indigo-700' 
                        : 'bg-white border-gray-200 text-gray-600 hover:border-indigo-200'
                    }`}
                  >
                    <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all ${
                        selectedPlaces.includes(place._id) 
                        ? 'bg-indigo-600 border-indigo-600' 
                        : 'bg-white border-gray-300'
                    }`}>
                        {selectedPlaces.includes(place._id) && (
                            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </div>
                    <span className="text-sm font-medium">{place.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Instagram */}
            <div className="md:col-span-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Instagram Handle (Optional)</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">@</span>
                <input
                  type="text"
                  name="instagramHandle"
                  value={formData.instagramHandle}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                  placeholder="your_handle"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50 mt-4"
          >
            {loading ? "Registering..." : "Complete Registration"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GuideRegistration;
