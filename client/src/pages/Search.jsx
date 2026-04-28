import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const Search = () => {
  const [rooms, setRooms] = useState([]);

  const query = new URLSearchParams(useLocation().search);
  const city = query.get("city");

  useEffect(() => {
    const fetchRooms = async () => {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/rooms?city=${city}`);
      setRooms(res.data.rooms);
    };

    if (city) fetchRooms();
  }, [city]);

  return (
    <div>
      <h2>Results for: {city}</h2>

      {rooms.length === 0 ? (
        <p>No rooms found</p>
      ) : (
        rooms.map((room) => (
          <div key={room._id}>
            <h3>{room.title}</h3>
            <p>{room.city}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Search;