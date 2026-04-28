import logo from './logo.png'
import searchIcon from './searchIcon.svg'
import userIcon from './userIcon.svg'
import calenderIcon from './calenderIcon.svg'
import locationIcon from './locationIcon.svg'
import starIconFilled from './starIconFilled.svg'
import arrowIcon from './arrowIcon.svg'
import starIconOutlined from './starIconOutlined.svg'
import instagramIcon from './instagramIcon.svg'
import facebookIcon from './facebookIcon.svg'
import twitterIcon from './twitterIcon.svg'
import linkendinIcon from './linkendinIcon.svg'
import freeWifiIcon from './freeWifiIcon.svg'
import freeBreakfastIcon from './freeBreakfastIcon.svg'
import roomServiceIcon from './roomServiceIcon.svg'
import mountainIcon from './mountainIcon.svg'
import poolIcon from './poolIcon.svg'
import homeIcon from './homeIcon.svg'
import closeIcon from './closeIcon.svg'
import locationFilledIcon from './locationFilledIcon.svg'
import heartIcon from './heartIcon.svg'
import badgeIcon from './badgeIcon.svg'
import menuIcon from './menuIcon.svg'
import closeMenu from './closeMenu.svg'
import guestsIcon from './guestsIcon.svg'
import regImage from './regImage.png'
import exclusiveOfferCardImg1 from "./exclusiveOfferCardImg1.png";
import exclusiveOfferCardImg2 from "./exclusiveOfferCardImg2.png";
import exclusiveOfferCardImg3 from "./exclusiveOfferCardImg3.png";
import addIcon from "./addIcon.svg";
import dashboardIcon from "./dashboardIcon.svg";
import listIcon from "./listIcon.svg";
import uploadArea from "./uploadArea.svg";
import totalBookingIcon from "./totalBookingIcon.svg";
import totalRevenueIcon from "./totalRevenueIcon.svg";
import hydImg from './hyderabad.jpg'
import delhiImg from './delhi.jpg'
import blrImg from './bangalore.jpg'
import cbeImg from './coimbatore.jpg'
import mumImg from './mumbai.jpg'
import golconda from './golconda.webp'
import birlaMandir from './BirlaMandir.jpg'
import Shilparamam from './Shilparamam.jpg'
import TajMahal from './TajMahal.jpg'
import RedFort from './RedFort.jpg'
import IndiaGate from './IndiaGate.jpg'
import LotusTemple from './LotusTemple.jpg'
import DilliHaat from './DilliHaat.jpg'
import MysorePalace from './MysorePalace.jpg'
import CubbonPark from './CubbonPark.jpg'
import BangPalace from './BangPalace.jpg'
import BotanicalGarden from './BotanicalGarden.jpg'
import Isha from './Isha.jpg'
import Siruvani from './Siruvani.jpg'
import Velliangiri from './Velliangiri.jpg'
import GassForest from './GassForest.jpg'
import GatewayOfIndia from './GatewayOfIndia.jpg'
import MarineDrive from './MarineDrive.jpg'
import ElephantaCaves from './ElephantaCaves.jpg'
import Swarnagiri from './Swarnagiri.jpg'
import RFC from './RFC.jpg'
export const assets = {
    logo,
    searchIcon,
    userIcon,
    calenderIcon,
    locationIcon,
    starIconFilled,
    arrowIcon,
    starIconOutlined,
    instagramIcon,
    facebookIcon,
    twitterIcon,
    linkendinIcon,
    freeWifiIcon,
    freeBreakfastIcon,
    roomServiceIcon,
    mountainIcon,
    poolIcon,
    closeIcon,
    homeIcon,
    locationFilledIcon,
    heartIcon,
    badgeIcon,
    menuIcon,
    closeMenu,
    guestsIcon,
    regImage,
    addIcon,
    dashboardIcon,
    listIcon,
    uploadArea,
    totalBookingIcon,
    totalRevenueIcon,
    golconda,
}

export const cities = [
    "Hyderabad",
    "Delhi",
    "Bangalore",
    "Coimbatore",
    "Mumbai"
];



// Exclusive Offers Dummy Data
export const exclusiveOffers = [
    { _id: 1, title: "Summer Escape Package", description: "Enjoy a complimentary night and daily breakfast", priceOff: 25, expiryDate: "Aug 31", image: exclusiveOfferCardImg1 },
    { _id: 2, title: "Romantic Getaway", description: "Special couples package including spa treatment", priceOff: 20, expiryDate: "Sep 20", image: exclusiveOfferCardImg2 },
    { _id: 3, title: "Luxury Retreat", description: "Book 60 days in advance and save on your stay at any of our luxury properties worldwide.", priceOff: 30, expiryDate: "Sep 25", image: exclusiveOfferCardImg3 },
]

// Testimonials Dummy Data
export const testimonials = [
    { id: 1, name: "Priyanka", address: "Hyderabad, Telangana", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQyUByIcyNfUbQvSRQ1KtHbruwDsqvxvv_nkA&s", rating: 5, review: "I've used many booking platforms before, but none compare to the personalized experience and attention to detail that LocalLens provides." },
    { id: 2, name: "Rahul", address: "Chennai, Tamilnadu", image: "https://i.pinimg.com/originals/f2/d0/ac/f2d0ac079588297a2bd818a4c061ec71.jpg", rating: 4, review: "LocalLens exceeded my expectations. The booking process was seamless, and the experience was absolutely top-notch. Highly recommended!" },
    { id: 3, name: "Sophia", address: "Rajkot ,Delhi", image: "https://images.unsplash.com/photo-1701615004837-40d8573b6652?q=80&w=200", rating: 5, review: "Amazing service! I always find the best guides through LocalLens. Their recommendations never disappoint!" }
];

// Facility Icon
export const facilityIcons = {
    "Free WiFi": assets.freeWifiIcon,
    "Free Breakfast": assets.freeBreakfastIcon,
    "Room Service": assets.roomServiceIcon,
    "Mountain View": assets.mountainIcon,
    "Pool Access": assets.poolIcon,
};

// For Room Details Page
export const roomCommonData = [
    { icon: assets.homeIcon, title: "Clean & Safe Stay", description: "A well-maintained and hygienic space just for you." },
    { icon: assets.badgeIcon, title: "Enhanced Cleaning", description: "This host follows Staybnb's strict cleaning standards." },
    { icon: assets.locationFilledIcon, title: "Excellent Location", description: "90% of guests rated the location 5 stars." },
    { icon: assets.heartIcon, title: "Smooth Check-In", description: "100% of guests gave check-in a 5-star rating." },
];

// User Dummy Data
export const userDummyData = {
    "_id": "user_2unqyL4diJFP1E3pIBnasc7w8hP",
    "username": "Great Stack",
    "email": "user.greatstack@gmail.com",
    "image": "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJ2N2c5YVpSSEFVYVUxbmVYZ2JkSVVuWnFzWSJ9",
    "role": "hotelOwner",
    "createdAt": "2025-03-25T09:29:16.367Z",
    "updatedAt": "2025-04-10T06:34:48.719Z",
    "__v": 1,
    "recentSearchedCities": [
        "New York"
    ]
}

// Hotel Dummy Data
export const hotelDummyData = {
    "_id": "67f76393197ac559e4089b72",
    "name": "Hyderabad",
    "address": "Main Road  123 Street , 23 Colony",
    "contact": "+0123456789",
    "owner": userDummyData,
    "city": "New York",
    "createdAt": "2025-04-10T06:22:11.663Z",
    "updatedAt": "2025-04-10T06:22:11.663Z",
    "__v": 0
}

const hotel1 = {
    _id: "1",
    name: "Hyderabad",
    address: "India",
    contact: "+911234567890",
    owner: userDummyData,
    city: "Hyderabad",
    createdAt: "2025-04-10T06:22:11.663Z",
    updatedAt: "2025-04-10T06:22:11.663Z",
    __v: 0
};

const hotel2 = {
    _id: "2",
    name: "Delhi",
    address: "India",
    contact: "+911234567891",
    owner: userDummyData,
    city: "Delhi",
    createdAt: "2025-04-10T06:22:11.663Z",
    updatedAt: "2025-04-10T06:22:11.663Z",
    __v: 0
};

const hotel3 = {
    _id: "3",
    name: "Bangalore",
    address: "India",
    contact: "+911234567892",
    owner: userDummyData,
    city: "Bangalore",
    createdAt: "2025-04-10T06:22:11.663Z",
    updatedAt: "2025-04-10T06:22:11.663Z",
    __v: 0
};

const hotel4 = {
    _id: "4",
    name: "Coimbatore",
    address: "India",
    contact: "+911234567893",
    owner: userDummyData,
    city: "Coimbatore",
    createdAt: "2025-04-10T06:22:11.663Z",
    updatedAt: "2025-04-10T06:22:11.663Z",
    __v: 0
};

const hotel5 = {
    _id: "5",
    name: "Mumbai",
    address: "India",
    contact: "+911234567894",
    owner: userDummyData,
    city: "Mumbai",
    createdAt: "2025-04-10T06:22:11.663Z",
    updatedAt: "2025-04-10T06:22:11.663Z",
    __v: 0
};

export const cityPlaces = {
  Hyderabad: [
    {
      id: "hyd1",
      name: "Charminar",
      description: "The Charminar, built in 1591 by Sultan Mohammed Quli Qutb Shah, is an iconic monument and mosque in Hyderabad, India, symbolizing the city's rich history. Located in the bustling Old City near the Musi River, this square granite and limestone structure features four 56-meter minarets, a top-floor mosque, and offers panoramic views of the surrounding, vibrant Laad Bazaar.",
      image: hydImg,
      rating: 4.5,

      guides: [
        {
    name: "Rahul",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    phone: "9876543210",
    email: "rahul.guide@email.com",
    experience: "5 Years",
    languages: "English, Hindi",
    about: "Passionate guide with deep knowledge of historical monuments and local culture.",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    tourImage: "https://images.unsplash.com/photo-1501785888041-af3ef285b470"
  },
  {
    name: "Sana",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    phone: "9123456780",
    email: "sana.guide@email.com",
    experience: "3 Years",
    languages: "English, Urdu",
    about: "Friendly and energetic guide specializing in cultural tours and local experiences.",
    video: "https://www.w3schools.com/html/movie.mp4",
    tourImage: "https://images.unsplash.com/photo-1526779259212-756e3c1e3f4b"
  },
  {
    name: "Arjun",
    image: "https://randomuser.me/api/portraits/men/65.jpg",
    phone: "9988776655",
    email: "arjun.guide@email.com",
    experience: "7 Years",
    languages: "English, Hindi, Telugu",
    about: "Expert in heritage tours with strong storytelling skills and historical insights.",
    video: "https://www.w3schools.com/html/mov_bbb.mp4",
    tourImage: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
  }
      ]
    },
    {
      id: "hyd2",
      name: "Golconda Fort",
      image: golconda,
      description: "Golconda Fort is a magnificent 13th-century fortress in Hyderabad, known for its massive 3-square-kilometer layout, incredible acoustic engineering, and historical role as the hub of the diamond trade. Originally built by the Kakatiya dynasty, it was later fortified by the Bahmani Sultans and the Qutb Shahi dynasty.",
      rating: 4.6,
      guides: [
        {
          name: "Ramesh",
          rating: 4.5,
          image: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
          name: "Sowmya",
          rating: 4.7,
          image: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
          name: "Arun",
          rating: 4.3,
          image: "https://randomuser.me/api/portraits/men/65.jpg"
        }
      ]
      
    },

    {
      id: "hyd3",
      name: "Birla Mandir",
      image: birlaMandir,
      description: "Birla Mandir refers to a series of stunning Hindu temples built by the Birla Foundation across India, primarily using white marble. Most famous is the Hyderabad Mandir (1976) atop Naubath Pahad, featuring Lord Venkateswara, and the Delhi Laxminarayan Temple (1939), famously inaugurated by Mahatma Gandhi to be open to all castes.",
      rating: 4.8,
      guides: [
        {
          name: "Raju",
          rating: 4.5,
          image: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
          name: "Anjali",
          rating: 4.7,
          image: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
          name: "Varun",
          rating: 4.3,
          image: "https://randomuser.me/api/portraits/men/65.jpg"
        }
      ] 
    },
    {
      id: "hyd4",
      name: "Shilparamam",
      image: Shilparamam,
      description: "Shilparamam is a premier 50-acre arts, crafts, and cultural village located in Madhapur, HITEC City, Hyderabad, designed to showcase India's heritage and support artisans. It features rural-themed landscapes, a 1,500-seat amphitheater for performances, a village museum, and numerous shopping stalls for traditional handicrafts, textiles, and, specifically, Hyderabad pearls.",
      rating: 4.8,
      guides: [
        {
          name: "Mahesh",
          rating: 4.5,
          image: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
          name: "Anitha",
          rating: 4.7,
          image: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
          name: "Prabhas",
          rating: 4.3,
          image: "https://randomuser.me/api/portraits/men/65.jpg"
        }
      ]
    },
    {
      id: "hyd5",
      name: "Swarnagiri",
      image: Swarnagiri,
      description: "The Swarnagiri Venkateswara Swamy Temple is a prominent, modern hilltop shrine located in Bhuvanagiri (about 50 km from Hyderabad), Telangana, dedicated to Lord Venkateswara. Renowned for its gold-plated gopuram, Dravidian architecture, and 12-foot main idol, it is a significant pilgrimage site featuring a 40-foot Hanuman statue and scenic nighttime lighting.",
      rating: 4.8
    },
    {
      id: "hyd6",
      name: "Ramoji Film City",
      image: RFC,
      description: "Ramoji Film City, located near Hyderabad, is the world's largest integrated film studio complex, sprawling over 2,000 acres. Established in 1996 by Ramoji Rao, this premier thematic tourism destination holds a Guinness World Record and offers a blend of professional filmmaking facilities, themed attractions, live shows, adventure sports at Sahas, and luxury accommodation.",
      rating: 4.8
    }
  ],
  Delhi: [
    {
      id: "del1",
      name: "Red Fort",
      image: RedFort,
      description: "The Red Fort (Lal Qila) in Delhi is a 17th-century UNESCO World Heritage Site built by Mughal Emperor Shah Jahan. Located on the Yamuna bank, this massive red sandstone fort served as the main residence of the Mughal dynasty and is a masterpiece of Indo-Islamic architecture, featuring palaces, museums, and lush gardens.",
      rating: 4.5
    },
    {
      id: "del2",
      name: "Taj Mahal Palace",
      image: TajMahal,
      description: "The Taj Mahal is an ivory-white marble mausoleum in Agra, India, commissioned in 1632 by Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal. As a UNESCO World Heritage Site and one of the New Seven Wonders of the World, it is renowned as a masterpiece of Indo-Islamic architecture, symbolizing eternal love and immense beauty.",
      rating: 4.6
    },
    {
      id: "del3",
      name: "Lotus Temple",
      image: LotusTemple,
      description: "The Lotus Temple in New Delhi, opened in 1986, is a prominent Baháʼí House of Worship famous for its structure resembling a blooming lotus flower. Composed of 27 white marble-clad petals arranged in nine sides, it accommodates up to 2,500 people in its central hall and welcomes visitors of any faith for meditation.",
      rating: 4.5
    },
    {
      id: "del4",
      name: "India Gate",
      image: IndiaGate,
      description: "India Gate is a 42-meter-high war memorial in New Delhi, designed by Sir Edwin Lutyens and completed in 1931 to honor over 70,000 soldiers who died in World War I and the Afghan War. Located on Rajpath, this iconic sandstone arch often features the Amar Jawan Jyoti (eternal flame) and serves as a major national landmark and popular public park.",
      rating: 4.6
    },
    {
      id: "del5",
      name: "Dilli Haat-INA",
      image: DilliHaat,
      description: "Dilli Haat (INA) is a vibrant, 6-acre permanent open-air craft bazaar and food plaza in South Delhi, offering a village-market ambiance. Operated by Delhi Tourism, it features over 60 stalls selling authentic handicrafts, textiles, and ethnic products from all over India. It also hosts a popular food court serving regional cuisine from different states.",
      rating: 4.4
    },
    {
      id: "del6",
      name: "Mysore Palace",
      image: MysorePalace,
      description: "Mysore Palace (Amba Vilas Palace) is a breathtaking, three-story Indo-Saracenic structure located in Mysuru, Karnataka, not Delhi. Built between 1897 - 1912 by architect Henry Irwin, it serves as the seat of the Wadiyar dynasty, featuring fine gray granite, pink marble domes, a 145-foot tower, and intricate, luxurious interiors adorned with chandeliers, stained glass, and opulent Durbar halls.",
      rating: 4.6
    }
  ],
  Bangalore: [
    {
      id: "blr1",
      name: "Cubbon Park",
      image: CubbonPark,
      description: "Cubbon Park, officially Sri Chamarajendra Park, is a 300-acre green lung space in the heart of Bengaluru's Central Administrative Area, established in 1870. It acts as a major recreational hub featuring lush bamboo groves, exotic plant species, and iconic red-brick landmarks like the State Central Library and Attara Kacheri (High Court).",
      rating: 4.4
    },
    {
      id: "blr2",
      name: "Bangalore Palace",
      image: BangPalace,
      description: "Bangalore Palace, built in 1887 by King Chamarajendra Wadiyar, is a magnificent Tudor-style landmark in Bengaluru inspired by Windsor Castle. It features iconic fortified towers, turreted parapets, and elegant wood carvings, showcasing a blend of Tudor and Scottish Gothic architecture. The palace is famous for its opulent, nostalgic interiors, including stained glass windows, vintage paintings, and a Durbar Hall.",
      rating: 4.2
    },
    {
      id: "blr3",
      name: "Lalbagh Botanical Garden",
      image: BotanicalGarden,
      description: "Lalbagh Botanical Garden is a 240-acre, 18th-century, historic green oasis in Bengaluru, renowned for its massive collection of over 1,800 species of tropical flora, iconic Glass House, and 3,000-million-year-old rock formations. Commissioned in 1760 by Hyder Ali and completed by Tipu Sultan, it hosts famous biannual flower shows.",
      rating: 4.4
    }
  ],
  Coimbatore: [
    {
      id: "cbe1",
      name: "Isha Foundation",
      image: Isha,
      description: "The Isha Yoga Center, established by Sadhguru at the foothills of the Velliangiri Mountains near Coimbatore, is a premier spiritual and wellness hub dedicated to inner growth and self-transformation. Surrounded by lush greenery, it serves as the headquarters for the volunteer-run Isha Foundation, featuring iconic structures like the Dhyanalinga, Linga Bhairavi Temple, and the 112-foot Adiyogi statue.",
      rating: 4.6
    },
    {
      id: "cbe2",
      name: "Siruvani Waterfall",
      image: Siruvani,
      description: "Siruvani Waterfalls, located near Coimbatore (approx. 30–35 km) in the Western Ghats, is a scenic two-stage cascade famous for its pristine, sweet-tasting water and lush, dense surroundings. It is a popular, serene getaway (not near Bangalore) often visited for its natural beauty, trekking opportunities, and proximity to the Siruvani Dam.",
      rating: 4.3
    },
    {
      id: "cbe3",
      name: "Velliangiri Hills",
      image: Velliangiri,
      description: "The Velliangiri Hills, located near Coimbatore, are a sacred seven-hill mountain range in the Western Ghats known as Then Kailayam (Kailash of the South). Standing at nearly 6,000 feet, they offer a strenuous 6 km trekking experience to a Swayambhu Shiva temple at the peak, which is frequented during the March-May season.",
      rating: 4.7
    },
    {
      id: "cbe4",
      name: "Gass Forest Museum",
      image: GassForest,
      description: "The Gass Forest Museum in Coimbatore is a century-old, government-run natural history museum established in 1902 by Horace Archibald Gass on Cowley Brown Road. Housed in a heritage building within the Tamil Nadu Forest Academy, it showcases extensive collections of stuffed animals, timber samples, insects, and tribal artifacts, focusing on Western Ghats biodiversity.",
      rating: 4.5
    }
  ],
  Mumbai: [
    {
      id: "mum1",
      name: "Gateway of India",
      image: GatewayOfIndia,
      description: "The Gateway of India is an iconic 26-meter-high yellow basalt arch monument in South Mumbai, overlooking the Arabian Sea at Apollo Bunder. Designed by George Wittet in the Indo-Saracenic style, it combines Hindu and Muslim architectural elements. Built to commemorate King George V's 1911 visit, it was completed in 1924 and symbolizes both British colonial history and India's independence.",
      rating: 4.6
    },
    {
      id: "mum2",
      name: "Taj Mahal Palace Hotel",
      image: mumImg,
      description: "The Taj Mahal Palace, Mumbai is an iconic 5-star heritage hotel founded in 1903, offering unparalleled luxury in Colaba with stunning Arabian Sea views. Located next to the Gateway of India, it serves as a flagship property known for its Indo-Saracenic architecture, 500+ rooms, and world-class dining, including Wasabi by Morimoto and Sea Lounge.",
      rating: 4.7
    },
    {
      id: "mum3",
      name: "Marine Drive",
      image: MarineDrive,
      description: "Marine Drive is a 3.6-kilometer, C -shaped boulevard in South Mumbai, forming a natural bay along the Arabian Sea from Nariman Point to Girgaon Chowpatty. Known as the Queen's Necklace due to its sparkling streetlights at night, this iconic promenade is a popular spot for scenic walks, sunset views, and relaxation.",
      rating: 4.3
    },
    {
      id: "mum4",
      name: "Elephanta Caves",
      image: ElephantaCaves,
      description: "The Elephanta Caves, a UNESCO World Heritage Site located on Gharapuri Island near Mumbai, are a 6th-7th century rock-cut temple complex dedicated primarily to Lord Shiva. Famous for the 20-foot Trimurti sculpture, these basalt caves feature intricate panels showcasing Hindu mythology, accessible via a 1-hour ferry ride from the Gateway of India.",
      rating: 4.3
    }
  ]
};

// Rooms Dummy Data
export const roomsDummyData = [
    {
        "_id": "1",
        "hotel": hotel1,
        "roomType": "Double Bed",
        "pricePerNight": 399,
        "amenities": ["Book Guides", "Explore Places", "Travel Experience"],
        "images": [hydImg],
        "isAvailable": true
    },
    {
        "_id": "2",
        "hotel": hotel2,
        "roomType": "Double Bed",
        "pricePerNight": 299,
        "amenities": ["Room Service", "Mountain View"],
        "images": [delhiImg],
        "isAvailable": true
    },
    {
        "_id": "3",
        "hotel": hotel3,
        "roomType": "Double Bed",
        "pricePerNight": 249,
        "amenities": ["Free WiFi", "Free Breakfast"],
        "images": [blrImg],
        "isAvailable": true
    },
    {
        "_id": "4",
        "hotel": hotel4,
        "roomType": "Single Bed",
        "pricePerNight": 199,
        "amenities": ["Free WiFi"],
        "images": [cbeImg],
        "isAvailable": true
    },
    {
        "_id": "5",
        "hotel": hotel5,
        "roomType": "Luxury Suite",
        "pricePerNight": 499,
        "amenities": ["Pool Access", "Free Breakfast"],
        "images": [mumImg],
        "isAvailable": true
    }
];



// User Bookings Dummy Data
export const userBookingsDummyData = [
    {
        "_id": "67f76839994a731e97d3b8ce",
        "user": userDummyData,
        "room": roomsDummyData[1],
        "hotel": hotelDummyData,
        "checkInDate": "2025-04-30T00:00:00.000Z",
        "checkOutDate": "2025-05-01T00:00:00.000Z",
        "totalPrice": 299,
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Stripe",
        "isPaid": true,
        "createdAt": "2025-04-10T06:42:01.529Z",
        "updatedAt": "2025-04-10T06:43:54.520Z",
        "__v": 0
    },
    {
        "_id": "67f76829994a731e97d3b8c3",
        "user": userDummyData,
        "room": roomsDummyData[0],
        "hotel": hotelDummyData,
        "checkInDate": "2025-04-27T00:00:00.000Z",
        "checkOutDate": "2025-04-28T00:00:00.000Z",
        "totalPrice": 399,
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Pay At Hotel",
        "isPaid": false,
        "createdAt": "2025-04-10T06:41:45.873Z",
        "updatedAt": "2025-04-10T06:41:45.873Z",
        "__v": 0
    },
    {
        "_id": "67f76810994a731e97d3b8b4",
        "user": userDummyData,
        "room": roomsDummyData[3],
        "hotel": hotelDummyData,
        "checkInDate": "2025-04-11T00:00:00.000Z",
        "checkOutDate": "2025-04-12T00:00:00.000Z",
        "totalPrice": 199,
        "guests": 1,
        "status": "pending",
        "paymentMethod": "Pay At Hotel",
        "isPaid": false,
        "createdAt": "2025-04-10T06:41:20.501Z",
        "updatedAt": "2025-04-10T06:41:20.501Z",
        "__v": 0
    }
]

// Dashboard Dummy Data
export const dashboardDummyData = {
    "totalBookings": 3,
    "totalRevenue": 897,
    "bookings": userBookingsDummyData
}

// --------- SVG code for Book Icon------
/* 
const BookIcon = ()=>(
    <svg className="w-4 h-4 text-gray-700" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 19V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v13H7a2 2 0 0 0-2 2Zm0 0a2 2 0 0 0 2 2h12M9 3v14m7 0v4" />
</svg>
)

*/