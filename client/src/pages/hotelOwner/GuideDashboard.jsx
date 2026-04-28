import { useEffect, useState } from "react";
import { useAppContext } from "../../context/AppContext";
import Navbar from '../../components/Navbar'
const GuideDashboard = () => {

  const { axios, getToken } = useAppContext();

  const [data, setData] = useState(null);

  const fetchData = async () => {
    try {
      const token = await getToken();

      console.log("TOKEN:", token);

      const res = await axios.get("/api/hotels/me", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      console.log("API RESPONSE:", res.data);

      setData(res.data.hotel);

    } catch (error) {
      console.log("ERROR:", error);
    }
  };

  // 🔥 CALL FUNCTION HERE
   
  useEffect(() => {
    fetchData();
  }, []);

  // UI
  return (
    <div>
        <Navbar/>
      <h1>Guide Dashboard</h1>

      {data && (
        <>
          <h2>{data.name}</h2>
          <p>{data.bio}</p>
        </>
      )}
    </div>
  );
};

export default GuideDashboard;