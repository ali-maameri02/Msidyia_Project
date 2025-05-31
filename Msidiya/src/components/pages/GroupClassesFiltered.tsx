import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Text } from "../atoms/Text";
import { Button } from "../atoms/Button";
import NavBar from "../Landing/NavBar";
import Footer from "../Landing/Footer";
import { useCart } from "../Landing/context/CartContext";
import Slider from "@mui/material/Slider";

// Define TypeScript interfaces for the data structure
interface Review {
  id: number;
  rating: number;
  comment: string;
  group_class: number; // ID of the associated group class
}

interface TutorUser {
  id: number;
  username: string;
}

interface Tutor {
  id: number;
  user: TutorUser;
}

// Define TypeScript interface for GroupClass
interface GroupClass {
  id: number;
  price: number;
  title: string;
  main_image: string;
  category: number; // Category ID
  tutor: number; // Tutor ID (points to User ID)
}

const GroupClassesFiltered = () => {
  const { categoryId } = useParams<{ categoryId: string }>(); // Extract categoryId from URL params
  const [groupClasses, setGroupClasses] = useState<GroupClass[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart } = useCart();

  // State for filters
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTutor, setSelectedTutor] = useState("");
  const [minRating, setMinRating] = useState<number | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]); // Price range state

  // Get tutor username by tutor ID
  const getTutorUsername = (tutorId: number): string => {
    const tutor = tutors.find((tutor) => tutor.user.id === tutorId); // Match tutorId with user.id
    if (!tutor) {
      console.warn(`No tutor found for User ID: ${tutorId}`);
      return "Unknown Tutor";
    }
    return tutor.user?.username || "Unknown Tutor";
  };

  // Fetch group classes, reviews, and tutors
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch group classes
        const groupClassesResponse = await axios.get<GroupClass[]>(
          "http://127.0.0.1:8000/api/group-classes/"
        );
        const filteredClasses = groupClassesResponse.data.filter(
          (groupClass) => groupClass.category.toString() === categoryId
        );
        setGroupClasses(filteredClasses);

        // Fetch reviews
        const reviewsResponse = await axios.get<Review[]>(
          "http://127.0.0.1:8000/api/group-class-reviews/"
        );
        setReviews(reviewsResponse.data);

        // Fetch tutors
        const tutorsResponse = await axios.get<Tutor[]>(
          "http://127.0.0.1:8000/api/tutors/"
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
  }, [categoryId]);

  if (isLoading) {
    return <Text as="p" className={""}>Loading...</Text>;
  }

  // Function to calculate average rating for a group class
  const calculateAverageRating = (classId: number): number => {
    const classReviews = reviews.filter((review) => review.group_class === classId);
    if (!classReviews || classReviews.length === 0) return 0;

    const totalRating = classReviews.reduce((sum, review) => sum + review.rating, 0);
    return parseFloat((totalRating / classReviews.length).toFixed(1));
  };

  // Filtered group classes based on search term, tutor, minimum rating, and price range
  const filteredGroupClasses = groupClasses.filter((groupClass) => {
    const matchesSearchTerm =
      searchTerm.trim() === "" ||
      groupClass.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTutor =
      selectedTutor === "" || getTutorUsername(groupClass.tutor) === selectedTutor;
    const matchesRating =
      minRating === null || calculateAverageRating(groupClass.id) >= minRating;
    const matchesPriceRange =
      groupClass.price >= priceRange[0] && groupClass.price <= priceRange[1];

    return matchesSearchTerm && matchesTutor && matchesRating && matchesPriceRange;
  });

  // Get unique tutor usernames for the filter dropdown
  const uniqueTutors = Array.from(
    new Set(groupClasses.map((groupClass) => getTutorUsername(groupClass.tutor)))
  ).filter((username) => username !== "Unknown Tutor");

  // Handle price range slider changes
  const handleChange = (_event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as [number, number]);
  };

  return (
    <>
      <NavBar />
      <div className="container mx-auto p-6 mt-16">
        <div className="flex flex-col md:flex-row">
          {/* Sidebar */}
          <div className="p-6 left-0 mr-12 bg-white shadow-sm fixed top-24 h-96 z-[99]">
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
              <label className="block text-sm font-medium mb-2">Filter by Tutor:</label>
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
              <label className="block text-sm font-medium mb-2">Minimum Rating:</label>
              <select
                value={minRating ?? ""}
                onChange={(e) =>
                  setMinRating(e.target.value === "" ? null : Number(e.target.value))
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
              <label className="block text-sm font-medium mb-2">Price Range:</label>
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
          {filteredGroupClasses.length === 0 ? (
            <Text as="p" className={""}>
              No group classes found in this category.
            </Text>
          ) : (
            <div className="grid grid-cols-5 md:grid-cols-2 lg:grid-cols-3 gap-6 px-16 ml-48 py-16  ">
              {filteredGroupClasses.map((groupClass) => {
                return (
                  <div
                    key={groupClass.id}
                    className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105"
                  >
                    {/* Group Class Image */}
                    <img
                      src={groupClass.main_image}
                      alt={groupClass.title}
                      className="w-full h-48 object-cover"
                    />

                    {/* Group Class Details */}
                    <div className="p-4">
                      <Text as="h2" className="text-xl font-semibold mb-2">
                        {groupClass.title}
                      </Text>
                      <Text as="p" className="text-gray-600">
                        Price: {groupClass.price} DA
                      </Text>

                      {/* Book Now Button */}
                      <Button
                        onClick={() =>
                          addToCart({
                            id: groupClass.id,
                            title: groupClass.title,
                            price: parseFloat(groupClass.price.toString()),
                            main_image: groupClass.main_image,
                          })
                        }
                        className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                      >
                        Book Now
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GroupClassesFiltered;
