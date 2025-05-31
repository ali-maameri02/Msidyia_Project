import { Image } from "../atoms/Image";
import bgImage from "../../assets/HeroVector.png";
import heroImage2 from "../../assets/hero-img (2).png";
import { Text } from "../atoms/Text";
import { Button } from "../atoms/Button";
import { Play } from "@phosphor-icons/react";
import { Fade, Slide } from "react-awesome-reveal";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const isArabic = i18n.language === "ar";

  return (
    <section className="w-full lg:h-screen md:h-[550px] h-[830px] relative overflow-x-hidden flex justify-end">
      <Image
        className={`h-[60%] w-[80%] lg:h-[90vh] md:h-[50vh] lg:w-1/2 md:w-[55%] ${
          isArabic ? "transform scale-x-[-1]" : ""
        }`}
        image={bgImage}
        alt="Hero Background Vector"
      />
      <main className="w-full lg:h-full h-auto grid md:grid-cols-2 absolute top-0 left-0 lg:px-24 md:px-8 px-5 pt-24 md:pt-32 lg:pt-0">
        <div className="flex flex-col justify-center md:gap-6 gap-3 md:order-1 order-2">
          <Text as="p" className="text-color1 uppercase tracking-widest lg:text-base text-sm font-normal">
            <Fade>{t("BEST E-learning Platform")}</Fade>
          </Text>
          <Text as="h1" className="text-color3 lg:text-7xl md:text-5xl text-3xl font-medium">
            <Fade>{t("Find Your Group Class Or Tutor And Start Learning Now!")}</Fade>
          </Text>
          <div className="w-full flex md:justify-start justify-between items-center lg:gap-12 md:gap-6 gap-0">
            <Button
              type="button"
              className="outline-none border-none lg:px-7 px-5 py-3 bg-color2 text-white font-extralight rounded-lg"
            >
              {t("Find out more")}
            </Button>
            <div className="flex items-center lg:gap-6 gap-3 cursor-pointer">
              <Text as="span" className="relative flex h-14 w-14">
                <Text as="span" className="animate-ping absolute inline-flex h-full w-full rounded-full bg-color1 opacity-75"></Text>
                <Text as="span" className="relative flex justify-center items-center text-white rounded-full h-14 w-14 bg-color1">
                  <Play size={20} color="currentColor" weight="fill" />
                </Text>
              </Text>
              <Button type="button" className="outline-none border-none">
                {t("Play Demo")}
              </Button>
            </div>
          </div>
          <div className="flex justify-center mt-4" style={{ width: "100%" }}>
            <TextField
              variant="outlined"
              placeholder={t("Search...")}
              fullWidth
              sx={{
                width: "70vw",
                backgroundColor: "#fff",
                borderRadius: 2,
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="action" />
                  </InputAdornment>
                ),
              }}
            />
          </div>
        </div>
        <div className="flex flex-col items-center justify-end md:order-2 order-1">
          <Slide direction="right">
            <Image
              image={heroImage2}
              alt="Hero Image"
              className="top:0 lg:h-[100%] lg:w-[100%] md:h-[100%] md:w-full w-[100%] h-[100vh]"
            />
          </Slide>
        </div>
      </main>
    </section>
  );
};

export default HeroSection;
