import React, { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const GuideDetails = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const placeId = searchParams.get("placeId");
  const { axios, getToken } = useAppContext();
  
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [bookingStatus, setBookingStatus] = useState("");
  const [existingBooking, setExistingBooking] = useState(null);
  const [isBusy, setIsBusy] = useState(false);

  const handleBooking = async () => {
    if (!selectedTimeSlot) {
      alert("Please select a time slot.");
      return;
    }
    setBookingStatus("Booking...");
    try {
      const token = await getToken();
      if (!token) {
        setBookingStatus("Please login first.");
        return;
      }
      const { data } = await axios.post("/api/bookings", {
        guideId: id,
        placeId: placeId || selectedGuide.places?.[0], // Use query param or first place from guide profile
        date: "Flexible",
        timeSlot: selectedTimeSlot,
        totalPrice: selectedGuide.hourlyRate * 2 || 50, // assuming 2 hours or fallback
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (data.success) {
        setBookingStatus("Requested! Pending Guide Approval ⏳");
        setExistingBooking(data.booking);
      }
    } catch (error) {
      setBookingStatus("Error: " + (error.response?.data?.message || error.message));
    }
  };

  useEffect(() => {
    const fetchGuideDataAndBookings = async () => {
      try {
        const { data } = await axios.get(`/api/guides/${id}`);
        if (data.success) {
          setSelectedGuide(data.guide);
          setIsBusy(data.isBusy);
        }

        const token = await getToken();
        if (token) {
           const { data: bookingData } = await axios.get('/api/bookings/my-bookings', {
             headers: { Authorization: `Bearer ${token}` }
           });
           if (bookingData.success) {
              const bookingsForThisGuide = bookingData.bookings.filter(b => 
                (b.guideId?._id || b.guideId) === id
              );
              if (bookingsForThisGuide.length > 0) {
                 bookingsForThisGuide.sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
                 const latestBooking = bookingsForThisGuide[0];
                 setExistingBooking(latestBooking);
                 
                 if (latestBooking.status === 'pending') {
                    setBookingStatus("Requested! Pending Guide Approval ⏳");
                 } else if (latestBooking.status === 'accepted') {
                    setBookingStatus("Request Accepted! ✅");
                 } else if (latestBooking.status === 'rejected') {
                    setBookingStatus("Request Declined ❌");
                 }
              }
           }
        }
      } catch (error) {
        console.error("Error fetching guide details", error);
      }
      setLoading(false);
    };

    fetchGuideDataAndBookings();
  }, [id, axios, getToken]);

  if (loading || !selectedGuide) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading guide details...</p>
      </div>
    );
  }

  return (
    <div className="pt-28 px-6 md:px-16 lg:px-24">

      {/* 🔹 PROFILE */}
      <div className="flex flex-col md:flex-row gap-10 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">

        <div className="flex flex-col items-center">
          <img
            src={selectedGuide.profileImage || "https://randomuser.me/api/portraits/lego/1.jpg"}
            className="w-40 h-40 rounded-2xl object-cover shadow-md"
            alt={selectedGuide.name}
          />
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {selectedGuide.specialties?.map((spec, i) => (
              <span key={i} className="px-3 py-1 bg-indigo-50 text-indigo-600 text-xs font-semibold rounded-full border border-indigo-100">
                {spec}
              </span>
            ))}
          </div>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-4xl font-playfair font-bold text-gray-800">
                {selectedGuide.name}
              </h1>
              <p className="text-indigo-500 font-medium mt-1">Professional Tour Guide</p>
            </div>
            <div className="bg-indigo-600 text-white px-4 py-2 rounded-xl text-center shadow-lg">
              <p className="text-2xl font-bold">${selectedGuide.hourlyRate}</p>
              <p className="text-[10px] uppercase tracking-wider">Per Hour</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div className="flex items-center gap-3 text-gray-600">
              <span className="text-xl">📞</span>
              <div>
                <p className="text-xs text-gray-400">Phone Number</p>
                <p className="font-medium">{selectedGuide.phoneNumber}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <span className="text-xl">📧</span>
              <div>
                <p className="text-xs text-gray-400">Email Address</p>
                <p className="font-medium">{selectedGuide.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <span className="text-xl">🧑‍💼</span>
              <div>
                <p className="text-xs text-gray-400">Experience</p>
                <p className="font-medium">{selectedGuide.experienceYears} Years</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <span className="text-xl">🌐</span>
              <div>
                <p className="text-xs text-gray-400">Languages</p>
                <p className="font-medium">{selectedGuide.languages?.join(', ')}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-gray-600">
              <span className="text-xl">👥</span>
              <div>
                <p className="text-xs text-gray-400">Max Group Size</p>
                <p className="font-medium">{selectedGuide.maxGroupSize} People</p>
              </div>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            {selectedGuide.whatsappNumber && (
              <a 
                href={`https://wa.me/${selectedGuide.whatsappNumber.replace(/[^0-9]/g, '')}`} 
                target="_blank" 
                rel="noreferrer"
                className="flex-1 bg-green-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-green-600 transition-colors shadow-lg shadow-green-100"
              >
                <span>WhatsApp</span>
              </a>
            )}
            {selectedGuide.instagramHandle && (
              <a 
                href={`https://instagram.com/${selectedGuide.instagramHandle.replace('@', '')}`} 
                target="_blank" 
                rel="noreferrer"
                className="flex-1 bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-500 text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-lg shadow-purple-100"
              >
                <span>Instagram</span>
              </a>
            )}
          </div>
        </div>

        {/* 🔹 BOOKING CARD */}
        <div className="w-full md:w-80 bg-gray-50 p-6 rounded-2xl border border-gray-200">
          <h3 className="font-bold text-gray-800 text-xl mb-4">Reserve Now</h3>
          
          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase ml-1">Select Time</label>
              <input 
                type="time"
                className="w-full mt-1 bg-white border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
                value={selectedTimeSlot}
                onChange={(e) => setSelectedTimeSlot(e.target.value)}
              />
            </div>

            <button 
              onClick={handleBooking}
              disabled={!selectedGuide.isAvailable || isBusy || bookingStatus === "Booking..."}
              className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 disabled:opacity-50 transition-all mt-4"
            >
              {!selectedGuide.isAvailable ? "Guide Unavailable" : isBusy ? "Guide is Busy (Tour Ongoing)" : (bookingStatus === "Booking..." ? "Confirming..." : "Book Guide")}
            </button>
            
            {!selectedGuide.isAvailable && (
              <p className="mt-2 text-xs text-center text-red-500 font-medium italic">
                This guide is currently not accepting new bookings.
              </p>
            )}
            
            {bookingStatus && bookingStatus !== "Booking..." && (
              <p className={`mt-3 text-sm text-center font-bold ${
                (bookingStatus.includes('Confirmed') || bookingStatus.includes('Requested') || bookingStatus.includes('Accepted')) 
                ? 'text-green-600' : 'text-red-500'}`}>
                {bookingStatus}
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 mt-10">
        {/* 🔹 ABOUT */}
        <div className="lg:col-span-2 space-y-10">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-4">About Me</h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              {selectedGuide.bio || "No biography provided yet."}
            </p>
          </div>

          {/* 🔹 PREVIOUS TOURS GALLERY */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-6">Past Adventures</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedGuide.gallery?.length > 0 ? (
                selectedGuide.gallery.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt={`Tour ${i+1}`}
                    className="w-full h-64 object-cover rounded-xl shadow-sm hover:scale-[1.02] transition-transform cursor-pointer"
                  />
                ))
              ) : (
                <p className="text-gray-400 italic">No tour photos uploaded yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* 🔹 INTRO VIDEO */}
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 h-fit sticky top-28">
          <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-6">Intro Video</h2>
          {selectedGuide.video ? (
            <div className="relative group overflow-hidden rounded-2xl shadow-lg bg-black aspect-video flex items-center justify-center">
              <video controls className="w-full h-full">
                <source src={selectedGuide.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            <div className="bg-gray-100 rounded-2xl aspect-video flex items-center justify-center text-gray-400">
              <p className="text-sm font-medium">Video introduction coming soon</p>
            </div>
          )}
          <div className="mt-6 border-t pt-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center text-xl">
                ⭐
              </div>
              <div>
                <p className="text-xl font-bold text-gray-800">{selectedGuide.rating || "4.5"}</p>
                <p className="text-xs text-gray-400 font-medium">Average Rating</p>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default GuideDetails;