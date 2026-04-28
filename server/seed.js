import mongoose from "mongoose";
import dotenv from "dotenv";
import City from "./models/City.js";
import Place from "./models/Place.js";
import Guide from "./models/Guide.js";

dotenv.config();

// We removed the image imports and replaced them with dummy URL strings for the backend.
// In a real app, these would be hosted URLs (S3, Cloudinary).
const hydImg = "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/05/a3/62/98/golkonda-fort.jpg?w=500&h=400&s=1";
const delhiImg = "https://deih43ym53wif.cloudfront.net/large_Rajpath-delhi-shutterstock_1195751923.jpg_7647e1aad2.jpg";
const bangaloreImg = "https://s7ap1.scene7.com/is/image/incredibleindia/vidhana-soudha-bangalore-karnataka-hero?qlt=82&ts=1742199603184";
const cbeImg = "https://s3.india.com/wp-content/uploads/2025/07/Coimbatore-seasonal-guide.jpg?impolicy=Medium_Widthonly&w=350&h=263";
const mumImg = "https://www.thehosteller.com/_next/image/?url=https%3A%2F%2Fstatic.thehosteller.com%2Fhostel%2Fimages%2Fimage.jpg%2Fimage-1735884840040.jpg&w=2048&q=75";

const cityPlaces = {
  Hyderabad: [
    {
      name: "Charminar",
      description: "The Charminar, built in 1591 by Sultan Mohammed Quli Qutb Shah, is an iconic monument and mosque in Hyderabad...",
      imageUrl: "https://assets.telegraphindia.com/telegraph/2023/Nov/1701074133_hyderabad.jpg",
      rating: 4.5,
      guides: [
        { name: "Rahul", bio: "Passionate guide with deep knowledge of historical monuments.", hourlyRate: 20, languages: ["English", "Hindi"], profileImage: "https://randomuser.me/api/portraits/men/32.jpg" },
        { name: "Sana", bio: "Friendly and energetic guide specializing in cultural tours.", hourlyRate: 25, languages: ["English", "Urdu"], profileImage: "https://randomuser.me/api/portraits/women/44.jpg" }
      ]
    },
    {
      name: "Golconda Fort",
      imageUrl: "https://media.tacdn.com/media/attractions-splice-spp-674x446/06/e6/42/45.jpg",
      description: "It was originally known as Mankal, and built on a hilltop in the year 1143. It was originally a mud fort under the reign of Rajah of Warangal. Later it was fortified between 14th and 17th centuries by the Bahmani Sultans and then the ruling Qutub Shahi dynasty. Golconda was the principal capital of the Qutub Shahi kings.",
      rating: 4.6,
      guides: [{ name: "Ramesh", bio: "Expert in Fort history.", hourlyRate: 15, languages: ["English", "Telugu"], profileImage: "https://randomuser.me/api/portraits/men/32.jpg" },
        { name: "Sita", bio: "Expert in temple history.", hourlyRate: 15, languages: ["English","Hindi", "Telugu"], profileImage: "https://randomuser.me/api/portraits/men/32.jpg" }
    ]
    },
    {
      name: "Birla Mandir",
      imageUrl: "https://hblimg.mmtcdn.com/content/hubble/img/ttd_images/mmt/activities/m_Warangal_Secundarabad_1_l_491_640.jpg",
      description: "Birla Mandir Temple (Lakshmi Narayan), New Delhi - TripadvisorBirla Mandir refers to several Hindu temples built by the Birla family across India, famously constructed from white marble and dedicated to Lakshmi Narayan (Vishnu) or Radha Krishna. ",
      rating: 4.6,
      guides: [{ name: "Sita", bio: "Expert in temple history.", hourlyRate: 15, languages: ["English","Hindi", "Telugu"], profileImage: "https://randomuser.me/api/portraits/men/32.jpg" }]
    },
    {
      name: "Ramoji Film City",
      description: "Ramoji Film City in HyderabadRamoji Film City, located near Hyderabad, India, is the world's largest integrated film studio complex, spanning over 2,000 acres. Established in 1996 by Ramoji Rao, this Guinness World Record-holding site functions as a premier theme park and major filmmaking hub. It features elaborate film sets (including Bahubali), amusement rides, live shows, and themed accommodation.",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRwPuq8Tv_mjEvp6mveAdWgQL0HcRLSj4bw_Q&s",
      rating: 4.5,
      guides: [
        { name: "Rahul", bio: "Passionate guide with deep knowledge of historical monuments.", hourlyRate: 20, languages: ["English", "Hindi"], profileImage: "https://randomuser.me/api/portraits/men/32.jpg" },
        { name: "Sana", bio: "Friendly and energetic guide specializing in cultural tours.", hourlyRate: 25, languages: ["English", "Urdu"], profileImage: "https://randomuser.me/api/portraits/women/44.jpg" }
      ]
    }
  ],
  Delhi: [
    {
      name: "Red Fort",
      imageUrl: "https://s7ap1.scene7.com/is/image/incredibleindia/red-fort-delhi1-attr-hero?qlt=82&ts=1742170492880",
      description: "The Red Fort (Lal Qila) in Delhi is a 17th-century UNESCO World Heritage Site...",
      rating: 4.5,
      guides: [{ name: "Amit", bio: "Historian and friendly guide.", hourlyRate: 30, languages: ["Hindi", "English"], profileImage: "https://randomuser.me/api/portraits/men/11.jpg" }]
    },
    {
      name: "India Gate",
      imageUrl: "https://cdn.britannica.com/37/189837-050-F0AF383E/New-Delhi-India-War-Memorial-arch-Sir.jpg",
      description: "India Gate is a 42-meter-high, iconic war memorial arch in New Delhi, designed by Sir Edwin Lutyens and completed in 1931. It honors over 70,000 Indian soldiers who died in World War I and the Third Afghan War, with 13,516 names inscribed on its walls. Situated on Kartavya Path, it features the eternal flame, Amar Jawan Jyoti, added in 1972. ",
      rating: 4.5,
      guides: [{ name: "Amit", bio: "Historian and friendly guide.", hourlyRate: 30, languages: ["Hindi", "English"], profileImage: "https://randomuser.me/api/portraits/men/11.jpg" },
      { name: "Sita", bio: "Expert in temple history.", hourlyRate: 15, languages: ["English","Hindi", "Telugu"], profileImage: "https://randomuser.me/api/portraits/men/32.jpg" }]
    },
    {
      name: "Lotus Temple",
      imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZXC1iRVdoZ-kAB-36JWpPtkndG4BtDYpRMg&s",
      description: "The Lotus Temple, located in New Delhi, India, is a prominent Baháʼí House of Worship inaugurated in December 1986, renowned for its lotus-like shape and inclusive atmosphere. Designed by Fariborz Sahba, it features 27 free-standing, white marble-clad \"petals\" arranged in nine sides, welcoming visitors of all faiths for meditation.",
      rating: 4.7,
      guides: [{ name: "Amit", bio: "Historian and friendly guide.", hourlyRate: 30, languages: ["Hindi", "English"], profileImage: "https://randomuser.me/api/portraits/men/11.jpg" },
      { name: "Sita", bio: "Expert in temple history.", hourlyRate: 15, languages: ["English","Hindi", "Telugu"], profileImage: "https://randomuser.me/api/portraits/men/32.jpg" }]
    },
    {
      name: "Taj Mahal",
      imageUrl: "https://travelindiaplus.com/wp-content/uploads/2023/10/Taj-Mahal-Near-Delhi-1024x614.jpg",
      description: "The Taj Mahal is an ivory-white marble mausoleum in Agra, India, commissioned in 1632 by Mughal emperor Shah Jahan to house the tomb of his favorite wife, Mumtaz Mahal. Known as a symbol of love, this UNESCO World Heritage Site represents the pinnacle of Mughal architecture, blending Indian, Persian, and Islamic styles.",
      rating: 4.5,
      guides: [{ name: "Amit", bio: "Historian and friendly guide.", hourlyRate: 30, languages: ["Hindi", "English"], profileImage: "https://randomuser.me/api/portraits/men/11.jpg" },
      { name: "Sita", bio: "Expert in temple history.", hourlyRate: 15, languages: ["English","Hindi", "Telugu"], profileImage: "https://randomuser.me/api/portraits/men/32.jpg" }]
    }
    
  ],
  Bangalore: [
    {
      name: "Bangalore Palace",
      imageUrl: "https://karnatakatourism.org/_next/image/?url=https%3A%2F%2Fweb-cms.karnatakatourism.org%2Fwp-content%2Fuploads%2F2025%2F07%2FBangalore-Palace_600-1280x720-1.jpg&w=3840&q=75",
      description: "Bangalore Palace, built in the late 19th century (commissioned in 1873) by the Wadiyar dynasty, is a prominent landmark in Bengaluru known for its striking Tudor and Scottish Gothic architecture, featuring fortified towers, turrets, and elegant wood carvings. Located in Vasanth Nagar, this tourist attraction includes a museum with royal photographs, paintings, and a grand ballroom, with surrounding grounds often used for concerts and events.",
      rating: 4.5,
      guides: [{ name: "Amit", bio: "Historian and friendly guide.", hourlyRate: 30, languages: ["Hindi", "English"], profileImage: "https://randomuser.me/api/portraits/men/11.jpg" }]
    },
    {
      name: "Lalbagh Botanical Garden",
      imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/17/32/90/26/lalbagh-bengaluru-once.jpg?w=600&h=-1&s=1",
      description: "Lalbagh Botanical Garden is a 240-acre, 18th-century oasis in Bengaluru, India, commissioned by Hyder Ali in 1760 and completed by Tipu Sultan. Famous for its tropical plant diversity, it features a Victorian-era Glasshouse, a 3,000-million-year-old rock formation, a massive lake, and biannual flower shows. It is a major botanical repository.",
      rating: 4.5,
      guides: [{ name: "Amit", bio: "Historian and friendly guide.", hourlyRate: 30, languages: ["Hindi", "English"], profileImage: "https://randomuser.me/api/portraits/men/11.jpg" },
      { name: "Sita", bio: "Expert in temple history.", hourlyRate: 15, languages: ["English","Hindi", "Telugu"], profileImage: "https://randomuser.me/api/portraits/men/32.jpg" }]
    },
    {
      name: "Cubbon Park",
      imageUrl: "https://dq1q7qkthxkc0.cloudfront.net/StaticMedia/e16c31b3-5bbe-4d96-91a1-f83984027fea.jpg",
      description: "CUBBON PARK (2026) All You SHOULD Know Before Going (with ...Cubbon Park, officially Sri Chamarajendra Park, is a massive 300-acre green space located in the heart of Bengaluru's Central Business District. Established in 1870, it serves as a major lung space for the city, featuring diverse flora, walking paths, libraries, museums, the Putani Express toy train, and the Government Aquarium.",
      rating: 4.7,
      guides: [{ name: "Amit", bio: "Historian and friendly guide.", hourlyRate: 30, languages: ["Hindi", "English"], profileImage: "https://randomuser.me/api/portraits/men/11.jpg" },
      { name: "Sita", bio: "Expert in temple history.", hourlyRate: 15, languages: ["English","Hindi", "Telugu"], profileImage: "https://randomuser.me/api/portraits/men/32.jpg" }]
    },
    {
      name: "Shri Someshwara Swamy Temple",
      imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0a/2e/24/45/the-temple.jpg?w=900&h=-1&s=1",
      description: "The Sri Someshwara Swamy Temple in Halasuru (Ulsoor), Bangalore, is an ancient, revered Shiva temple dating back to the Chola period (around the 12th–13th century), with major renovations by Kempe Gowda II. It is a masterpiece of Vijayanagara architecture, featuring a massive Gopuram, intricate carvings of Hindu mythology on 48 pillars, and a dedicated Nandi pillar.",
      rating: 4.5,
      guides: [{ name: "Amit", bio: "Historian and friendly guide.", hourlyRate: 30, languages: ["Hindi", "English"], profileImage: "https://randomuser.me/api/portraits/men/11.jpg" },
      { name: "Sita", bio: "Expert in temple history.", hourlyRate: 15, languages: ["English","Hindi", "Telugu"], profileImage: "https://randomuser.me/api/portraits/men/32.jpg" }]
    }
    
  ]
};

async function seedDatabase() {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/local-lens";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB.");

    // Clear existing data
    await City.deleteMany({});
    await Place.deleteMany({});
    await Guide.deleteMany({});
    console.log("Cleared existing data.");

    for (const [cityName, places] of Object.entries(cityPlaces)) {
      // Create city
      const city = new City({
        name: cityName,
        country: "India",
        imageUrl: cityName === "Hyderabad" 
        ? hydImg 
        : cityName === "Delhi" 
        ? delhiImg 
        : cityName === "Bangalore" 
        ? bangaloreImg 
        :"",
        description: `Explore top places in ${cityName} and enjoy your journey.`
      });
      await city.save();

      for (const placeData of places) {
        // Create place
        const place = new Place({
          name: placeData.name,
          cityId: city._id,
          description: placeData.description,
          imageUrl: placeData.imageUrl,
          rating: placeData.rating
        });
        await place.save();

        if (placeData.guides) {
          for (const guideData of placeData.guides) {
            // Create guide
            const guide = new Guide({
              userId: `dummy_clerk_id_${Math.random().toString(36).substr(2, 9)}`,
              places: [place._id],
              name: guideData.name,
              bio: guideData.bio,
              hourlyRate: guideData.hourlyRate,
              languages: guideData.languages,
              profileImage: guideData.profileImage,
              email: `${guideData.name.toLowerCase()}@example.com`,
              phoneNumber: "+91 " + Math.floor(1000000000 + Math.random() * 9000000000),
              whatsappNumber: "+91 " + Math.floor(1000000000 + Math.random() * 9000000000),
              experienceYears: Math.floor(Math.random() * 10) + 2,
              specialties: ["History", "Photography", "Cultural Tours", "Food & Culinary"].sort(() => 0.5 - Math.random()).slice(0, 2),
              maxGroupSize: Math.floor(Math.random() * 10) + 5,
              gallery: [
                "https://images.unsplash.com/photo-1544644181-1484b3fdfc62?w=500",
                "https://images.unsplash.com/photo-1506461883276-594a12b11dc3?w=500"
              ],
              instagramHandle: `@${guideData.name.toLowerCase()}_tours`,
              licenseNumber: `GUIDE-${Math.floor(10000 + Math.random() * 90000)}`,
              rating: 4.5,
              availability: [
                {
                  date: new Date().toISOString().split('T')[0], // Today
                  timeSlots: ["10:00 AM", "02:00 PM"]
                }
              ]
            });
            await guide.save();
          }
        }
      }
    }

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();
