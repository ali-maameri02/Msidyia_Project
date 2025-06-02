import React, { useEffect, useState } from "react";
import axios from "axios";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Rating from "@mui/material/Rating";
import NavBar from "../Landing/NavBar";
import Footer from "../Landing/Footer";
import { useNavigate } from "react-router-dom";
import logo from '../../assets/msidiya-m-logo.png';

interface User {
  id: number;
  username: string;
  Picture?: string;
}

interface Tutor {
  user: User;
  Description?: string;
  id: number;
}

const Tutors: React.FC = () => {
  const navigate = useNavigate();
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    axios
      .get<Tutor[]>("https://msidiya.com/api/tutors/")
      .then((response) => {
        setTutors(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load tutors.");
        setLoading(false);
      });
  }, []);

  if (loading) return  <div className="p-6 bg-white min-h-screen flex justify-center items-center">
  <img src={logo} width={50} alt="" className="animate-spin" />
</div>;
  if (error) return <p className="text-center mt-20 text-red-500">{error}</p>;

  return (
    <>
      <NavBar />
      <div className="tutorslist mt-20 p-10 ml-20 flex flex-row justify-around flex-wrap gap-5">
        {tutors.map((tutor) => (
          <Card key={tutor.user.id} sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="200"
                className="h-64 object-cover"
                image={tutor.user.Picture || "https://via.placeholder.com/200"}
                alt={tutor.user.username}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {tutor.user.username}
                </Typography>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {tutor.Description || "No bio available."}
                </Typography>
                <Rating name="size-large" defaultValue={3} size="large" readOnly />
              </CardContent>
            </CardActionArea>
            <CardActions>
              <Button
                size="medium"
                className="font-bold"
                variant="contained"
                color="primary"
                onClick={() => navigate(`/Tutors/TutorDetails/${tutor.id}`)}
              >
                See More
              </Button>
            </CardActions>
          </Card>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default Tutors;
