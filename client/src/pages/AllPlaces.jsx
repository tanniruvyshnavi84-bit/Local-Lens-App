import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import StarRating from "../components/StarRating";

const CheckBox = ({ label, selected = false, onChange = () => {} }) => {
    return (
        <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
            <input
                type="checkbox"
                checked={selected}
                onChange={(e) => onChange(e.target.checked, label)}
            />
            <span className='font-light select-none'>{label}</span>
        </label>
    );
};

const RadioButton = ({ label, selected = false, onChange = () => {} }) => {
    return (
        <label className="flex gap-3 items-center cursor-pointer mt-2 text-sm">
            <input
                type="radio"
                name="sortOption"
                checked={selected}
                onChange={() => onChange(label)}
            />
            <span className='font-light select-none'>{label}</span>
        </label>
    );
};

const AllPlaces = () => {
    const navigate = useNavigate();
    const { city } = useParams();
    const { cities, axios } = useAppContext();
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlaces = async () => {
            const selectedCity = cities.find(c => c.name.toLowerCase() === city.toLowerCase());
            if (selectedCity) {
                try {
                    const { data } = await axios.get(`/api/cities/${selectedCity._id}/places`);
                    if (data.success) {
                        setPlaces(data.places);
                    }
                } catch (error) {
                    console.error("Error fetching places", error);
                }
            }
            setLoading(false);
        };
        
        if (cities.length > 0) {
            fetchPlaces();
        }
    }, [city, cities, axios]);

    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <p className="text-xl font-semibold">Loading places...</p>
        </div>
      );
    }

    return (
        <div className='flex flex-col-reverse lg:flex-row items-start justify-between pt-28 md:pt-35 px-4 md:px-16 lg:px-24 xl:px-32'>

            {/* LEFT SIDE (PLACES LIST) */}
            <div>
                <div className='flex flex-col items-start text-left'>
                    <h1 className='font-playfair text-4xl md:text-[40px]'>
                        Places in {city}
                    </h1>
                    <p className='text-sm md:text-base text-gray-500/90 mt-2 max-w-174'>
                        Explore top places in {city} and enjoy your journey.
                    </p>
                </div>

                {/* ✅ FIXED: map through places */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
  {places.map((place) => (
    <div key={place._id} className='flex flex-col gap-4 border-b pb-6'>

      <img
        onClick={() => {
          navigate(`/place/${place._id}`);
          window.scrollTo(0, 0);
        }}
        src={place.imageUrl || "https://example.com/placeholder.jpg"}
        className='w-full h-60 object-cover rounded-xl cursor-pointer'
      />

      <p className='text-gray-500'>{city}</p>

      <p
        onClick={() => {
          navigate(`/place/${place._id}`);
          window.scrollTo(0, 0);
        }}
        className='text-gray-800 text-xl font-playfair cursor-pointer'
      >
        {place.name}
      </p>

      <div className='flex items-center'>
        <StarRating />
        <p className='ml-2'>{place.rating} rating</p>
      </div>

     

    </div>
  ))}
</div>

           </div>
        </div>
    );
};

export default AllPlaces;