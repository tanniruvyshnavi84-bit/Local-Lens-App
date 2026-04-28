import React from 'react';
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import StarRating from "../components/StarRating";

const AllRooms = () => {
  const navigate = useNavigate();
  const { cities } = useAppContext();

  if (!cities || cities.length === 0) {
    return <div className="h-screen flex items-center justify-center">Loading cities...</div>;
  }

  return (
    <div className='flex flex-col pt-28 px-4 md:px-16 lg:px-24 xl:px-32'>

      <div className='flex flex-col items-start text-left'>
        <h1 className='font-playfair text-4xl md:text-[40px]'>Cities</h1>
        <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>
          Make the most of your travels with LocalLens by discovering guided experiences.
        </p>
      </div>

      {/* ✅ GRID (3 per row) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">

        {cities.map((city) => (
          <div key={city._id} className='flex flex-col gap-4 border-b pb-6'>

            <img
              onClick={() => {
                navigate(`/places/${city.name}`);
                window.scrollTo(0, 0);
              }}
              src={city.imageUrl || "https://example.com/placeholder.jpg"}
              className='w-full h-60 object-cover rounded-xl cursor-pointer'
            />

            <p
              onClick={() => {
                navigate(`/places/${city.name}`);
                window.scrollTo(0, 0);
              }}
              className='text-gray-800 text-2xl font-playfair cursor-pointer'
            >
              {city.name}
            </p>

            <div className='flex items-center gap-1 text-gray-500 text-sm'>
              <img src={assets.locationIcon} alt="location" />
              <span>{city.country}</span>
            </div>

          </div>
        ))}

      </div>
    </div>
  );
};

export default AllRooms;