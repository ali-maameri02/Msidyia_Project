import { Image } from "../atoms/Image";
import { Text } from "../atoms/Text";
import { ServiceTexts } from "../particles/DataLists";
import GroupOfPlus from "../../assets/plusGroup.png";
import Card from "../molecules/Card";
import { useEffect } from "react";
import { Fade } from "react-awesome-reveal";
import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

interface CategoryRow {
  id: number;
  tutor: number;
  name: string;
  status: boolean;
  logo: string;
}

const Services = () => {
  const [categories, setCategories] = React.useState<CategoryRow[]>([]);
  const navigate = useNavigate();

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "${import.meta.env.VITE_API_BASE_URL}/api/categories/"
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <section
      className="w-full h-auto flex flex-col items-center justify-center relative lg:px-24 md:px-20 px-6 z-40"
      style={{ zIndex: "9" }}
    >
      <Image
        image={GroupOfPlus}
        alt="Vector"
        className="absolute top-0 right-4 lg:h-36 h-24"
      />
      <main className="w-full pt-32 flex flex-col gap-3 items-center justify-center z-40">
        <Text
          as="p"
          className="font-light text-base text-color3/80 tracking-widest"
        >
          <Fade>{ServiceTexts.firstText}</Fade>
        </Text>
        <Text
          as="h2"
          className="md:text-4xl text-2xl font-medium capitalize text-color3"
        >
          <Fade>{ServiceTexts.secondText}</Fade>
        </Text>

        <div className="w-full h-auto grid lg:grid-cols-4 md:grid-cols-2 lg:gap-7 md:gap-10 gap-7 my-12 z-20 px-8 md:px-0">
          {categories.map((category, index) => (
            <Card
              key={index}
              cardClass="w-full bg-white flex flex-col items-center justify-center py-6 cursor-pointer transition duration-300 hover:shadow-xl px-5 rounded-xl after:bg-color1"
              imageWrapperClass="w-28 h-28 relative z-10 before:content-[''] before:absolute before:top-3 before:right-3 before:w-16 before:h-16 before:bg-color2/30 before:-z-10 before:rounded-tl-3xl before:rounded-br-3xl"
              cover="object-cover"
              imageAlt={category.name}
              imageSrc={category.logo}
              textWrapperClass="w-full flex flex-col items-center gap-2"
              onClick={() => navigate(`/group-classes/category/${category.id}`)} // Navigate to filtered group classes
            >
              <Text
                as="h4"
                className="text-base rounded font-medium text-color3"
              >
                {category.name}
              </Text>
            </Card>
          ))}
        </div>
      </main>
    </section>
  );
};

export default Services;
