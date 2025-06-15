import { useEffect, useState } from "react";
import axios from "axios";
import { FaStar } from "react-icons/fa";
import NavBar from "../Landing/NavBar";
import Footer from "../Landing/Footer";
import logo from "../../assets/msidiya-m-logo.png";
import { Slider } from "@mui/material"; // Import Slider from MUI
import { useCart } from "../Landing/context/CartContext"; // Import the CartContext
import { useNavigate } from "react-router-dom";
import { GroupClassReview } from "../../services/reviews/reviews.types";

// Define TypeScript interfaces for the data structure
interface TutorUser {
  id: number;
  username: string;
  email: string;
  first_name: string;
  last_name: string;
  Role: "Student" | "Tutor";
  Gender: "Male" | "Female";
  Phone_number: string;
  Paypal_Email: string;
  Address: string;
  Picture: string;
}

interface Tutor {
  id: number;
  user: TutorUser;
}

interface GroupClass {
  id: number;
  price: number;
  title: string;
  main_image: string;
  tutor: number; // Tutor ID (points to User ID)
}

const GroupClasses = () => {
  // State for group classes, reviews, and tutors
  const [groupClasses, setGroupClasses] = useState<GroupClass[]>([]);
  const [reviews, setReviews] = useState<GroupClassReview[]>([]);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cart context
  const { addToCart, inCart } = useCart();

  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTutor, setSelectedTutor] = useState("");
  const [minRating, setMinRating] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]); // Price range state
  const navigate = useNavigate();
  // Fetch group classes, reviews, and tutors from the Django backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch group classes
        const groupClassesResponse = await axios.get<GroupClass[]>(
          `${import.meta.env.VITE_API_BASE_URL}/api/group-classes/`
        );
        setGroupClasses(groupClassesResponse.data);

        // Fetch reviews
        const reviewsResponse = await axios.get<GroupClassReview[]>(
          `${import.meta.env.VITE_API_BASE_URL}/api/group-class-reviews/`
        );
        setReviews(reviewsResponse.data);

        // Fetch tutors
        const tutorsResponse = await axios.get<Tutor[]>(
          `${import.meta.env.VITE_API_BASE_URL}/api/tutors/`
        );
        console.log("Fetched tutors:", tutorsResponse.data);
        setTutors(tutorsResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="p-6 bg-white min-h-screen flex justify-center items-center">
        <img src={logo} width={50} alt="" className="animate-spin" />
      </div>
    );
  }

  // Function to calculate average rating for a group class
  const calculateAverageRating = (classId: number): number => {
    const classReviews = reviews.filter(
      (review) => review.group_class === classId
    );
    if (!classReviews || classReviews.length === 0) return 0;

    const totalRating = classReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return parseFloat((totalRating / classReviews.length).toFixed(1));
  };

  // Get tutor username by tutor ID
  const getTutorUsername = (tutorId: number): string => {
    const tutor = tutors.find((tutor) => tutor.user.id === tutorId); // Match tutorId with user.id
    if (!tutor) {
      console.warn(`No tutor found for User ID: ${tutorId}`);
      return "Unknown Tutor";
    }
    return tutor.user?.username || "Unknown Tutor";
  };

  // Filtered group classes based on search term, tutor, minimum rating, and price range
  const filteredGroupClasses = groupClasses.filter((groupClass) => {
    const matchesSearchTerm =
      searchTerm.trim() === "" ||
      groupClass.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTutor =
      selectedTutor === "" ||
      getTutorUsername(groupClass.tutor) === selectedTutor;
    const matchesRating =
      minRating === null || calculateAverageRating(groupClass.id) >= minRating;
    const matchesPriceRange =
      groupClass.price >= priceRange[0] && groupClass.price <= priceRange[1];

    return (
      matchesSearchTerm && matchesTutor && matchesRating && matchesPriceRange
    );
  });

  // Get unique tutor usernames for the filter dropdown
  const uniqueTutors = Array.from(
    new Set(
      groupClasses.map((groupClass) => getTutorUsername(groupClass.tutor))
    )
  ).filter((username) => username !== "Unknown Tutor");

  // Handle price range slider changes
  const handleChange = (_event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as [number, number]);
  };

  return (
    <>
      <NavBar />

      <div className="flex flex-col md:flex-row">
        {/* Sidebar */}
        <div className="p-6 mr-12 bg-white shadow-sm fixed top-16 h-full">
          <h2 className="text-xl font-bold mb-4">Filters</h2>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 mb-4 border rounded"
          />

          {/* Tutor Filter */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Filter by Tutor:
            </label>
            <select
              value={selectedTutor}
              onChange={(e) => setSelectedTutor(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="">All Tutors</option>
              {uniqueTutors.map((tutor) => (
                <option key={tutor} value={tutor}>
                  {tutor}
                </option>
              ))}
            </select>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Minimum Rating:
            </label>
            <select
              value={minRating ?? ""}
              onChange={(e) =>
                setMinRating(
                  e.target.value === "" ? null : Number(e.target.value)
                )
              }
              className="w-full p-2 border rounded"
            >
              <option value="">Any</option>
              {[1, 2, 3, 4, 5].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} Stars
                </option>
              ))}
            </select>
          </div>

          {/* Two-Way Range Slider for Price Filtering */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-2">
              Price Range:
            </label>
            <Slider
              getAriaLabel={() => "Price range"}
              value={priceRange}
              onChange={handleChange}
              valueLabelDisplay="auto"
              min={0}
              max={1000}
              step={5}
            />
            <div className="flex justify-between mt-2 text-xs text-gray-500">
              <span>{priceRange[0]} DA</span>
              <span>{priceRange[1]} DA</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:w-3/4 p-6 px-16 pr-0 mt-20 ml-16 bg-white min-h-screen">
          <div className="grid grid-cols-1 w-full ml-52 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredGroupClasses.map((groupClass) => {
              const averageRating = calculateAverageRating(groupClass.id);

              return (
                <div
                  key={groupClass.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
                  onClick={() => navigate(`/group-class/${groupClass.id}`)}
                >
                  {/* Main Image */}
                  <img
                    src={groupClass.main_image}
                    alt={groupClass.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    {/* Title */}
                    <h2 className="text-xl font-semibold mb-2">
                      {groupClass.title}
                    </h2>

                    {/* Rating */}
                    <div className="flex items-center mb-2">
                      <FaStar className="text-yellow-500 mr-1" />
                      <span>
                        {averageRating} (
                        {
                          reviews.filter((r) => r.group_class === groupClass.id)
                            .length
                        }{" "}
                        reviews)
                      </span>
                    </div>

                    {/* Tutor Name */}
                    <p className="text-gray-600">
                      <span className="font-medium">Tutor:</span>{" "}
                      {getTutorUsername(groupClass.tutor)}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-medium">Price:</span>{" "}
                      {groupClass.price}DA
                    </p>

                    {/* Book Now Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToCart({
                          id: groupClass.id,
                          title: groupClass.title,
                          price: parseFloat(groupClass.price.toString()), // Ensure price is a number
                          main_image: groupClass.main_image,
                        });
                      }}
                      className={`mt-4 w-full ${
                        inCart(groupClass.id) ? "bg-red-500" : "bg-blue-500"
                      } text-white py-2 rounded hover:bg-blue-600 transition-colors`}
                    >
                      {inCart(groupClass.id) ? "Remove" : "Book Now"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default GroupClasses;
