import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'; 
import Footer from './components/Footer';
import AllRooms from './pages/AllRooms';
import AllPlaces from './pages/AllPlaces';
import PlaceDetails from './pages/PlaceDetails';
import MyBookings from './pages/MyBookings';
import HotelReg from './components/HotelReg';
import Dashboard from './pages/hotelOwner/Dashboard';
import GuideDashboard from './pages/GuideDashboard';
{/*import AddRoom from './pages/hotelOwner/AddRoom';*/}
{/*import ListRoom from './pages/hotelOwner/ListRoom';*/}
import Layout from './pages/hotelOwner/Layout';
import { Toaster } from 'react-hot-toast';
import { useAppContext } from './context/AppContext';
import Search from "./pages/Search";
import GuideDetails from "./pages/GuideDetails";
import GuideRegistration from "./pages/GuideRegistration";

const App = () => {
  const isOwnerPath=useLocation().pathname.includes("owner");
  const { showHotelReg } = useAppContext();

  return (
    <div>
      <Toaster />
      {!isOwnerPath && <Navbar /> }
      {showHotelReg && <HotelReg />}
      <div className='min-h-[70vh]'>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/rooms' element={<AllRooms/>} />
          <Route path='/places/:city' element={<AllPlaces/>} />
          <Route path='/place/:id' element={<PlaceDetails/>} />
          <Route path="/guide/:id" element={<GuideDetails />} />
          <Route path="/guide-registration" element={<GuideRegistration />} />
          <Route path="/guide-dashboard" element={<GuideDashboard />} />
          <Route path='/my-bookings' element={<MyBookings/>} />
          <Route path="/search" element={<Search />} />
          <Route path='/owner' element={<Layout/>}>
            <Route index element={<Dashboard/>} />
            {/* <Route path="add-room" element={<AddRoom/>} /> */}
           {/* <Route path="list-room" element={<ListRoom/>} />*/}
           <Route path="guide-dashboard" element={<GuideDashboard/>}/>
            </Route>
        </Routes>
      </div>
      <Footer />
    </div>
  )
}

export default App