import React, { useState, useEffect } from 'react'
import Title from '../components/Title'
import { useAppContext } from '../context/AppContext'
import { assets } from '../assets/assets'

const MyBookings = () => {
    const { axios, getToken } = useAppContext();
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const token = await getToken();
                if (!token) return;

                const { data } = await axios.get('/api/bookings/my-bookings', {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (data.success) {
                    setBookings(data.bookings);
                }
            } catch (error) {
                console.error("Error fetching bookings", error);
            }
            setLoading(false);
        };

        fetchBookings();
    }, [axios, getToken]);

    const handlePayment = async (bookingId) => {
        try {
            const token = await getToken();
            const { data } = await axios.patch(`/api/bookings/${bookingId}/pay`, {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            if (data.success) {
                alert("Payment successful!");
                // Refresh bookings after payment
                const { data: refreshData } = await axios.get('/api/bookings/my-bookings', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (refreshData.success) {
                    setBookings(refreshData.bookings);
                }
            }
        } catch (error) {
            console.error("Payment error", error);
            alert("Payment failed.");
        }
    };

  if (loading) {
    return <div className="h-screen flex items-center justify-center">Loading bookings...</div>;
  }

  return (
    <div className='py-28 md:pb-35 md:pt-32 px-4 md:px-16 lg:px-24 xl:px-32'>
        <Title title='My Bookings' subtitle='Easily manage your past, current, and upcoming guide bookings in one place.' align='left' />
        
        {bookings.length === 0 ? (
          <p className="mt-8 text-gray-500">You have no bookings yet.</p>
        ) : (
          <div className='max-w-6xl mt-8 w-full text-gray-800'>
              <div className='hidden md:grid md:grid-cols-[3fr_2fr_1fr] w-full border-b border-gray-300 font-medium text-base py-3'>
                  <div className='w-1/3'>Guide & Place</div>
                  <div className='w-1/3'>Timings</div>
                  <div className='w-1/3'>Payment</div>
              </div>
              
              {bookings.map((booking)=>(
                  <div key={booking._id} className='grid md:grid-cols-[3fr_2fr_1fr] gap-4 border-b border-gray-200 py-6'>
                      {/*--Details---*/}
                      <div className='flex flex-col md:flex-row'>
                          <img src={booking.guideId?.profileImage || "https://randomuser.me/api/portraits/lego/1.jpg"} alt="guide-img" className='w-32 h-32 rounded-full shadow object-cover'/>
                          <div className='flex flex-col gap-1.5 max-md:mt-3 md:ml-4'>
                              <p className='font-playfair text-2xl'>{booking.guideId?.name}
                              <span className='font-inter text-sm'> (Guide)</span>
                              </p>
                              <div className='flex items-center gap-1 text-sm text-gray-500 mt-2'>
                                  <img src={assets.locationIcon} alt="location-icon" />        
                                  <span>{booking.placeId?.name}</span>
                              </div>
                              <p className='text-base mt-2'>Total: ${booking.totalPrice}</p>
                          </div>
                      </div>
                      {/*--Timing---*/}
                      <div className='flex flex-col justify-center mt-3 gap-2'>
                          <div>
                              <p className="font-semibold">Time:</p>
                              <p className='text-gray-500 text-sm' >
                                  {booking.timeSlot}
                              </p>
                          </div>
                          <div>
                              <p className="font-semibold">Status:</p>
                              <p className={`text-sm capitalize font-bold ${
                                  booking.status === 'accepted' ? 'text-green-600' :
                                  booking.status === 'rejected' ? 'text-red-600' :
                                  'text-yellow-600'
                              }`} >
                                  {booking.status}
                              </p>
                          </div>
                      </div>
                      {/*--Payment status---*/}
                      <div className='flex flex-col items-start justify-center pt-3'>
                          <div className='flex items-center gap-2'>
                              <div className={`h-3 w-3 rounded-full ${booking.paymentStatus === 'paid' ? "bg-green-500" : "bg-red-500"}`}></div>
                              <p className={`capitalize font-semibold ${booking.paymentStatus === 'paid' ? "text-green-500" : "text-red-500"}`}>
                                  {booking.paymentStatus}
                              </p>
                          </div>
                          {booking.paymentStatus === 'unpaid' && (
                              <button 
                                onClick={() => handlePayment(booking._id)}
                                className='px-4 py-1.5 mt-4 text-xs border border-gray-400 rounded-full hover:bg-indigo-600 hover:text-white hover:border-indigo-600 transition-all cursor-pointer font-bold'
                              >
                                  Pay Now
                              </button>
                          )}
                      </div>
                  </div>
              ))}
          </div>
        )}
    </div>
  )
}

export default MyBookings