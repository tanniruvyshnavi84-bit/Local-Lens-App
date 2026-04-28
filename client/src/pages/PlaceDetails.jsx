import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { useAppContext } from "../context/AppContext";
import StarRating from "../components/StarRating";
import Testimonial from '../components/Testimonial';

const PlaceDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { axios } = useAppContext();
  
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [guides, setGuides] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaceData = async () => {
      try {
        const placeRes = await axios.get(`/api/places/${id}`);
        if (placeRes.data.success) {
          setSelectedPlace(placeRes.data.place);
        }
        
        const guidesRes = await axios.get(`/api/places/${id}/guides`);
        if (guidesRes.data.success) {
          setGuides(guidesRes.data.guides);
        }
      } catch (error) {
        console.error("Error fetching place details", error);
      }
      setLoading(false);
    };

    fetchPlaceData();
  }, [id, axios]);

  if (loading || !selectedPlace) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold">Loading place details...</p>
      </div>
    );
  }

  return (
    <div className="pt-28 px-6">

      {/* 🔹 TOP SECTION */}
      <div className="flex flex-col md:flex-row gap-10 items-start">

        {/* Image */}
        <img
          src={selectedPlace.imageUrl}
          alt={selectedPlace.name}
          className="w-full md:w-[40%] h-72 object-cover rounded-xl shadow-lg"
        />

        {/* Details */}
        <div className="md:w-[60%]">
          <h1 className="text-4xl font-playfair">
            {selectedPlace.name}
          </h1>

          <p className="mt-4 text-gray-600">
            {selectedPlace.description}
          </p>

          <div className="mt-4 flex items-center">
            <StarRating />
            <span className="ml-2">{selectedPlace.rating}</span>
          </div>
        </div>

      </div>

      {/* 🔹 GUIDE CARDS */}
      <div className="mt-16">
        <h2 className="text-2xl font-playfair mb-6">
          Available Guides
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

          {guides.map((guide, index) => (
            <div
              key={guide._id || index}
              className="bg-gray-200 rounded-xl shadow p-4 flex flex-col items-center gap-3"
            >
              <img
                src={guide.profileImage || "https://randomuser.me/api/portraits/lego/1.jpg"}
                alt="guide"
                className="w-20 h-20 rounded-full object-cover"
              />

              <p className="text-lg font-medium">
                {guide.name}
              </p>

              <div className="flex items-center">
                <StarRating />
                <span className="ml-2 text-sm">{guide.rating || 4.5}</span>
              </div>

              <div className={`text-[10px] font-bold uppercase px-2 py-1 rounded-full ${guide.isAvailable ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                {guide.isAvailable ? 'Available' : 'Currently Unavailable'}
              </div>

              <button
                onClick={() => guide.isAvailable && navigate(`/guide/${guide._id}?placeId=${id}`)}
                disabled={!guide.isAvailable}
                className={`mt-2 px-4 py-2 rounded-lg text-sm transition-all ${
                  guide.isAvailable 
                  ? 'bg-indigo-500 text-white hover:bg-indigo-600' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {guide.isAvailable ? 'View Guide' : 'Unavailable'}
              </button>
            </div>
          ))}

        </div>
      </div>
      <Testimonial/>
    </div>
  );
};

export default PlaceDetails;