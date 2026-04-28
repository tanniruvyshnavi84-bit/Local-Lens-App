import React, { useState, useEffect, useCallback } from "react";
import { useAppContext } from "../context/AppContext";
import { toast } from "react-hot-toast";

const GuideDashboard = () => {
  const { axios, getToken, user, navigate } = useAppContext();
  const [guideProfile, setGuideProfile] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [places, setPlaces] = useState([]);
  const [editFormData, setEditFormData] = useState({
    name: "",
    phoneNumber: "",
    whatsappNumber: "",
    experienceYears: "",
    specialties: "",
    places: [],
    bio: "",
    hourlyRate: "",
    languages: "",
    profileImage: "",
    gallery: "",
    licenseNumber: "",
    video: ""
  });

  const fetchDashboardData = useCallback(async () => {
    try {
      const token = await getToken();

      if (!user) return;

      // Fetch Profile using user ID
      const profileRes = await axios.get(`/api/guides/user/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (profileRes.data.success) {
        setGuideProfile(profileRes.data.guide);
        setEditFormData({
          ...profileRes.data.guide,
          specialties: profileRes.data.guide.specialties?.join(", ") || "",
          languages: profileRes.data.guide.languages?.join(", ") || "",
          gallery: profileRes.data.guide.gallery?.join(", ") || "",
          profileImage: profileRes.data.guide.profileImage || "",
          bio: profileRes.data.guide.bio || "",
          video: profileRes.data.guide.video || "",
          licenseNumber: profileRes.data.guide.licenseNumber || ""
        });

        // Fetch Bookings
        const bookingsRes = await axios.get(`/api/bookings/guide/${profileRes.data.guide._id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });

        if (bookingsRes.data.success) {
          setBookings(bookingsRes.data.bookings || []);
        }
      }
    } catch (error) {
      console.error("Dashboard error:", error);
      if (error.response?.status !== 404) {
        toast.error("Failed to load dashboard data");
      }
    } finally {
      setLoading(false);
    }
  }, [axios, getToken, user]);

  const fetchPlaces = useCallback(async () => {
    try {
      const { data } = await axios.get("/api/places/all");
      if (data.success) setPlaces(data.places);
    } catch (error) {
      toast.error("Failed to fetch places");
    }
  }, [axios]);

  useEffect(() => {
    fetchDashboardData();
    fetchPlaces();
  }, [fetchDashboardData, fetchPlaces]);

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      const token = await getToken();
      const { data } = await axios.patch(`/api/bookings/${bookingId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        toast.success(`Booking ${newStatus} successfully`);
        fetchDashboardData();
      }
    } catch (error) {
      toast.error("Failed to update status");
    }
  };

  const handleToggleAvailability = async () => {
    try {
      const token = await getToken();
      const newStatus = !guideProfile.isAvailable;
      const { data } = await axios.patch(`/api/guides/availability`,
        { isAvailable: newStatus, userId: user.id },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (data.success) {
        setGuideProfile({ ...guideProfile, isAvailable: newStatus });
        toast.success(`You are now ${newStatus ? 'Available' : 'Unavailable'}`);
      }
    } catch (error) {
      toast.error("Failed to update availability");
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = await getToken();
      const formData = new FormData();

      formData.append('userId', user.id);
      formData.append('name', editFormData.name || '');
      formData.append('phoneNumber', editFormData.phoneNumber || '');
      formData.append('experienceYears', editFormData.experienceYears || '');
      formData.append('hourlyRate', editFormData.hourlyRate || '');
      formData.append('bio', editFormData.bio || '');
      formData.append('licenseNumber', editFormData.licenseNumber || '');

      formData.append('specialties', JSON.stringify((editFormData.specialties || '').split(",").map(s => s.trim()).filter(Boolean)));
      formData.append('languages', JSON.stringify((editFormData.languages || '').split(",").map(l => l.trim()).filter(Boolean)));
      formData.append('places', JSON.stringify(editFormData.places || []));

      if (editFormData.profileImageFile) formData.append('profileImage', editFormData.profileImageFile);
      else if (editFormData.profileImage) formData.append('profileImage', editFormData.profileImage);

      if (editFormData.videoFile) formData.append('video', editFormData.videoFile);
      else if (editFormData.video) formData.append('video', editFormData.video);

      if (editFormData.galleryFiles) {
        editFormData.galleryFiles.forEach(file => formData.append('gallery', file));
      } else if (editFormData.gallery) {
        formData.append('gallery', JSON.stringify(typeof editFormData.gallery === 'string' ? editFormData.gallery.split(",").map(img => img.trim()).filter(Boolean) : editFormData.gallery));
      }

      const { data } = await axios.patch("/api/guides/update", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      if (data.success) {
        toast.success("Profile updated successfully");
        setGuideProfile(data.guide);
        setIsEditing(false);
        fetchDashboardData();
      }
    } catch (error) {
      toast.error("Failed to update profile");
    }
  };

  const togglePlace = (placeId) => {
    setEditFormData(prev => ({
      ...prev,
      places: prev.places.includes(placeId)
        ? prev.places.filter(id => id !== placeId)
        : [...prev.places, placeId]
    }));
  };

  if (loading) return <div className="pt-32 text-center text-indigo-600 font-medium">Loading Dashboard...</div>;
  if (!guideProfile) return (
    <div className="pt-40 flex flex-col items-center justify-center space-y-4">
      <p className="text-xl text-gray-500 italic">No guide profile found. Please register as a guide.</p>
      <button onClick={() => navigate('/guide-registration')} className="bg-indigo-600 text-white px-6 py-2 rounded-full hover:bg-indigo-700 transition-all">
        Become a Guide
      </button>
    </div>
  );

  return (
    <div className="pt-28 pb-16 px-4 md:px-16 lg:px-24 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto space-y-8">

        {/* 🔹 PROFILE HEADER */}
        <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">

          {/* Availability Toggle */}
          <div className="absolute top-4 right-4 z-10">
            <button
              onClick={handleToggleAvailability}
              className={`px-4 py-2 font-bold text-xs uppercase tracking-widest transition-all rounded-full shadow-md ${guideProfile.isAvailable
                  ? 'bg-green-100 text-green-700 hover:bg-green-200 border border-green-200'
                  : 'bg-red-100 text-red-700 hover:bg-red-200 border border-red-200'
                }`}
            >
              {guideProfile.isAvailable ? '● Available' : '○ Not Available'}
            </button>
          </div>

          <div className="relative group">
            <img
              src={user?.imageUrl}
              alt="Profile"
              className="w-32 h-32 md:w-40 md:h-40 rounded-3xl object-cover shadow-lg border-4 border-white group-hover:scale-105 transition-transform duration-300"
            />
            <button
              onClick={() => setIsEditing(true)}
              className="absolute -bottom-2 -right-2 bg-indigo-600 text-white p-2 rounded-xl shadow-lg hover:bg-indigo-700 transition-all"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
            </button>
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex flex-col md:flex-row md:items-baseline gap-2 mb-2">
              <h1 className="text-3xl font-playfair font-bold text-gray-800">{guideProfile.name}</h1>
              <span className="text-sm text-gray-400 font-medium tracking-tight">/ {guideProfile.experienceYears} Years Experience</span>
            </div>

            <p className="text-indigo-600 font-semibold text-sm mb-4">
              {guideProfile.places?.map(pid => places.find(p => p._id === pid)?.name).filter(Boolean).join(" • ")}
            </p>

            <div className="flex flex-wrap gap-2 justify-center md:justify-start">
              {guideProfile.specialties?.map((s, i) => (
                <span key={i} className="px-3 py-1.5 bg-indigo-50 text-indigo-600 text-[10px] font-bold uppercase tracking-wide rounded-lg">
                  {s}
                </span>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full md:w-auto">
            <div className="bg-gray-50 px-6 py-4 rounded-2xl text-center border border-gray-100">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-1">Status</p>
              <p className={`font-bold ${guideProfile.isAvailable ? 'text-green-500' : 'text-red-500'}`}>
                {guideProfile.isAvailable ? 'Online' : 'Offline'}
              </p>
            </div>
            <div className="bg-indigo-600 px-6 py-4 rounded-2xl text-center shadow-md shadow-indigo-100">
              <p className="text-[10px] text-indigo-200 font-bold uppercase tracking-widest mb-1">Bookings</p>
              <p className="text-white font-bold text-xl">{bookings?.length || 0}</p>
            </div>
          </div>
        </div>

        {/* 🔹 EDIT PROFILE MODAL (Conditional) */}
        {isEditing && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white rounded-[2rem] w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 shadow-2xl animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-playfair font-bold text-gray-800">Edit Guide Profile</h2>
                <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-gray-600 transition-all">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>

              <form onSubmit={handleEditSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Full Name</label>
                    <input
                      type="text"
                      value={editFormData.name}
                      onChange={(e) => setEditFormData({ ...editFormData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Phone Number</label>
                    <input
                      type="text"
                      value={editFormData.phoneNumber}
                      onChange={(e) => setEditFormData({ ...editFormData, phoneNumber: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Experience (Years)</label>
                    <input
                      type="number"
                      value={editFormData.experienceYears}
                      onChange={(e) => setEditFormData({ ...editFormData, experienceYears: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Hourly Rate ($)</label>
                    <input
                      type="number"
                      value={editFormData.hourlyRate}
                      onChange={(e) => setEditFormData({ ...editFormData, hourlyRate: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Specialties (Comma separated)</label>
                  <input
                    type="text"
                    value={editFormData.specialties}
                    onChange={(e) => setEditFormData({ ...editFormData, specialties: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Languages (Comma separated)</label>
                  <input
                    type="text"
                    value={editFormData.languages}
                    onChange={(e) => setEditFormData({ ...editFormData, languages: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Profile Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setEditFormData({ ...editFormData, profileImageFile: e.target.files[0] })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Intro Video (MP4)</label>
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setEditFormData({ ...editFormData, videoFile: e.target.files[0] })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Gallery Images</label>
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={(e) => setEditFormData({ ...editFormData, galleryFiles: Array.from(e.target.files) })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">License Number</label>
                  <input
                    type="text"
                    value={editFormData.licenseNumber}
                    onChange={(e) => setEditFormData({ ...editFormData, licenseNumber: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Biography</label>
                  <textarea
                    value={editFormData.bio}
                    onChange={(e) => setEditFormData({ ...editFormData, bio: e.target.value })}
                    rows="4"
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none resize-none"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 ml-1">Places of Expertise</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto p-3 bg-gray-50 rounded-xl border border-gray-100">
                    {places.map(place => (
                      <div
                        key={place._id}
                        onClick={() => togglePlace(place._id)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium cursor-pointer transition-all border ${editFormData.places.includes(place._id)
                            ? 'bg-indigo-600 border-indigo-600 text-white'
                            : 'bg-white border-gray-100 text-gray-600'
                          }`}
                      >
                        {place.name}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex-1 py-3.5 border border-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-50 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3.5 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* 🔹 EXTENDED PROFILE INFO */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-10">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-4">About Me</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {guideProfile.bio || "No biography provided yet. Edit your profile to add one."}
              </p>
            </div>

            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100">
              <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-6">Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {guideProfile.gallery?.length > 0 ? (
                  guideProfile.gallery.map((img, i) => (
                    <img key={i} src={img} alt={`Gallery ${i}`} className="w-full h-64 object-cover rounded-xl shadow-sm" />
                  ))
                ) : (
                  <p className="text-gray-400 italic">No gallery images uploaded yet.</p>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 h-fit">
            <h2 className="text-2xl font-playfair font-bold text-gray-800 mb-6">Intro Video</h2>
            {guideProfile.video ? (
              <div className="relative group overflow-hidden rounded-2xl shadow-lg bg-black aspect-video flex items-center justify-center">
                <video controls className="w-full h-full">
                  <source src={guideProfile.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            ) : (
              <div className="bg-gray-100 rounded-2xl aspect-video flex items-center justify-center text-gray-400">
                <p className="text-sm font-medium">No video uploaded</p>
              </div>
            )}
          </div>
        </div>

        {/* 🔹 BOOKING REQUESTS */}
        <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
          <div className="px-8 py-8 border-b border-gray-50 flex justify-between items-center">
            <h2 className="text-2xl font-playfair font-bold text-gray-800">Recent Bookings</h2>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">{bookings?.length || 0} New Requests</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50/50 text-gray-400 text-[10px] uppercase tracking-[0.2em] font-black">
                <tr>
                  <th className="px-8 py-5">Tourist Details</th>
                  <th className="px-8 py-5">Schedule</th>
                  <th className="px-8 py-5">Status</th>
                  <th className="px-8 py-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {bookings?.map((booking) => (
                  <tr key={booking._id} className="group hover:bg-indigo-50/30 transition-all duration-300">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-indigo-600 rounded-2xl flex items-center justify-center text-white font-playfair font-bold text-lg shadow-inner">
                          {booking.userId?.name?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-gray-800 text-sm">{booking.userId?.name}</p>
                          <p className="text-[10px] text-gray-400 font-medium tracking-tight uppercase">{booking.userId?.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <p className="text-sm font-bold text-gray-700 mb-0.5">{booking.timeSlot}</p>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-2">
                        <span className={`w-1.5 h-1.5 rounded-full ${booking.status === 'accepted' ? 'bg-green-500' :
                            booking.status === 'ongoing' ? 'bg-blue-500' :
                            booking.status === 'completed' ? 'bg-gray-500' :
                            booking.status === 'rejected' ? 'bg-red-500' :
                              'bg-yellow-500'
                          }`}></span>
                        <span className={`text-[10px] font-bold uppercase tracking-widest ${booking.status === 'accepted' ? 'text-green-600' :
                            booking.status === 'ongoing' ? 'text-blue-600' :
                            booking.status === 'completed' ? 'text-gray-600' :
                            booking.status === 'rejected' ? 'text-red-600' :
                              'text-yellow-600'
                          }`}>
                          {booking.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      {booking.status === 'pending' ? (
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={() => handleStatusUpdate(booking._id, 'accepted')}
                            className="bg-white border border-green-200 text-green-600 hover:bg-green-600 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
                          >
                            Accept
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(booking._id, 'rejected')}
                            className="bg-white border border-red-200 text-red-600 hover:bg-red-600 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
                          >
                            Decline
                          </button>
                        </div>
                      ) : booking.status === 'accepted' ? (
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={() => handleStatusUpdate(booking._id, 'ongoing')}
                            className="bg-white border border-blue-200 text-blue-600 hover:bg-blue-600 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
                          >
                            Start Tour
                          </button>
                        </div>
                      ) : booking.status === 'ongoing' ? (
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <button
                            onClick={() => handleStatusUpdate(booking._id, 'completed')}
                            className="bg-white border border-gray-200 text-gray-600 hover:bg-gray-600 hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm"
                          >
                            Mark Completed
                          </button>
                        </div>
                      ) : (
                        <span className="text-[10px] text-gray-300 font-black uppercase tracking-[0.15em] italic">No Pending Action</span>
                      )}
                    </td>
                  </tr>
                ))}
                {(!bookings || bookings.length === 0) && (
                  <tr>
                    <td colSpan="4" className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-2 opacity-30">
                        <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <p className="text-gray-500 italic font-medium">No booking requests found.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default GuideDashboard;
