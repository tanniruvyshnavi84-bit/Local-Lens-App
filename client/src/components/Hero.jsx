import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Hero = () => {

  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { cities } = useAppContext();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    const matchedCity = cities.find(city =>
      city.name.toLowerCase().includes(search.toLowerCase())
    );

    if (matchedCity) {
      navigate(`/places/${matchedCity.name}`);
    } else {
      alert("City not found");
    }
  };

  return (
    <div className='flex flex-col items-start justify-center px-6 md:px-16 lg:px-24 xl:px-32 text-white bg-[url("/src/assets/heroImage.png")] bg-no-repeat bg-cover bg-center min-h-screen'>

      <p className='px-1 py-1 rounded-full mt-20'>Guided Tours & Experiences</p>

      <h1 className='font-playfair text-2xl md:text-[56px] md:leading-[56px] font-bold md:font-extrabold max-w-xl mt-4'>
        Explore Unique Travel Experiences with Guides
      </h1>

      <p className='max-w-xl mt-2 text-sm md:text-base'>
        Explore cities like never before Start your journey today.
      </p>

      {/* 🔍 FORM */}
      <form onSubmit={handleSearch}
        className='text-gray-500 rounded-lg px-6 py-4 mt-8 flex flex-col md:flex-row gap-4'>

        <div className="bg-white flex items-center border-b rounded-full gap-2 border-gray-500/30 h-[46px] max-w-md w-full px-6 ">

          <input
            type="text"
            placeholder="Search city..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-full outline-none bg-transparent text-sm"
          />

          <button type="submit"
            className="bg-indigo-500 w-32 h-9 rounded-full text-sm text-white">
            Search
          </button>

        </div>
      </form>

    </div>
  )
}

export default Hero