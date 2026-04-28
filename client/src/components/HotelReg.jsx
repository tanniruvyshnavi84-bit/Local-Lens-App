import React, { useState } from 'react';
import { assets, cities } from '../assets/assets';
import toast from 'react-hot-toast';
import { useAppContext } from '../context/AppContext.jsx';

const HotelReg = () => {

  const { setShowHotelReg, axios, getToken, setIsOwner } = useAppContext();

  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");

  const [languages, setLanguages] = useState("");
  const [experience, setExperience] = useState("");
  const [bio, setBio] = useState("");

  const [profilePic, setProfilePic] = useState(null);
  const [introVideo, setIntroVideo] = useState(null);

  // ✅ ONLY ONE HANDLER (FORMDATA VERSION)
  const onSubmitHandler = async (event) => {
    try {
      event.preventDefault();

      const formData = new FormData();

      formData.append("name", name);
      formData.append("contact", contact);
      formData.append("address", address);
      formData.append("city", city);

      formData.append("languages", languages);
      formData.append("experience", experience);
      formData.append("bio", bio);

      if(profilePic) formData.append("profilePic", profilePic);
      if(introVideo) formData.append("introVideo", introVideo);

      const { data } = await axios.post(
        `/api/hotels/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${await getToken()}`,
            "Content-Type": "multipart/form-data"
          }
        }
      );

      if (data.success) {
        toast.success(data.message);
        setIsOwner(true);
        setShowHotelReg(false);
      } else {
        toast.error(data.message);
      }

    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div onClick={() => setShowHotelReg(false)} className='fixed top-0 bottom-0 left-0 right-0 z-50 flex items-center justify-center bg-black/70'>

      <form onSubmit={onSubmitHandler} onClick={(e) => e.stopPropagation()} className='flex bg-white rounded-xl max-w-4xl max-md:mx-2'>

        <img src={assets.regImage} alt="reg-image" className='w-1/2 rounded-xl hidden md:block' />

        <div className='relative flex flex-col items-center md:w-1/2 p-8 md:p-10'>

          <img src={assets.closeIcon} alt="close-icon"
            className='absolute top-4 right-4 h-4 w-4 cursor-pointer'
            onClick={() => setShowHotelReg(false)}
          />

          <p className='text-2xl font-semibold mt-6'>Become a Guide</p>

          {/* Name */}
          <div className='w-full mt-4'>
            <label className='font-medium text-gray-500'>Your Name</label>
            <input value={name} onChange={(e) => setName(e.target.value)}
              type="text" className="input" required />
          </div>

          {/* Phone */}
          <div className='w-full mt-4'>
            <label className='font-medium text-gray-500'>Phone</label>
            <input value={contact} onChange={(e) => setContact(e.target.value)}
              type="text" className="input" required />
          </div>

          {/* Address */}
          <div className='w-full mt-4'>
            <label className='font-medium text-gray-500'>Address</label>
            <input value={address} onChange={(e) => setAddress(e.target.value)}
              type="text" className="input" required />
          </div>

          {/* City */}
          <div className='w-full mt-4'>
            <select value={city} onChange={(e) => setCity(e.target.value)}
              className='input' required>
              <option value="">Select City</option>
              {cities.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Languages */}
          <div className='w-full mt-4'>
            <input value={languages} onChange={(e) => setLanguages(e.target.value)}
              placeholder="Languages" className="input" />
          </div>

          {/* Experience */}
          <div className='w-full mt-4'>
            <input type="number" value={experience}
              onChange={(e) => setExperience(e.target.value)}
              placeholder="Experience" className="input" />
          </div>

          {/* Bio */}
          <div className='w-full mt-4'>
            <textarea value={bio} onChange={(e) => setBio(e.target.value)}
              placeholder="Bio" className="input" />
          </div>

          {/* Profile Pic */}
          <div className='w-full mt-4'>
            <input type="file" accept="image/*"
              onChange={(e) => setProfilePic(e.target.files[0])} />
          </div>

          {/* Video */}
          <div className='w-full mt-4'>
            <input type="file" accept="video/*"
              onChange={(e) => setIntroVideo(e.target.files[0])} />
          </div>

          {/* Submit */}
          <button className='bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2 rounded mt-6'>
            Register
          </button>

        </div>
      </form>
    </div>
  );
};

export default HotelReg;