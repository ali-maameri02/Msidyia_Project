import React, { useEffect, useState } from "react";
import {
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../Landing/NavBar";
import Footer from "../Landing/Footer";

interface User {
  id: number;
  username: string;
  email: string;
}

interface GroupClass {
  id: number;
  title: string;
  grade: string;
  price: number;
  category: {
    name: string;
  };
  max_book: number;
  class_type: string;
  main_image: string;
  schedules?: { // Optional schedules
    date: string;
    duration: string;
  }[];
  tutor: User;
}

const GroupClassDetails: React.FC = () => {
  const { classId } = useParams();
  const navigate = useNavigate();
  const [groupClass, setGroupClass] = useState<GroupClass | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchGroupClass = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/group-classes/${classId}/`);
        console.log("API Response:", response.data); // Debugging line
        setGroupClass(response.data);
      } catch (error) {
        console.error("Error fetching group class details:", error);
      }
    };
    fetchGroupClass();
  }, [classId]);

  const handleEnroll = async () => {
    try {
      await axios.post(`http://127.0.0.1:8000/api/enrollments/`, {
        group_class: classId,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });
      alert("Enrollment successful!");
      navigate("/dashboardstudent/student");
    } catch (error) {
      console.error("Enrollment failed:", error);
      alert("Enrollment failed. Please try again.");
    }
  };

  if (!groupClass) return <div>Loading...</div>;

  return (
    <>
      <NavBar />
      <div className="group-class-details p-10 mt-20 ml-20">
        <Card sx={{ maxWidth: 800 }}>
          <CardMedia
            component="img"
            height="400"
            image={groupClass.main_image}
            alt={groupClass.title}
          />
          <CardContent>
            <Typography variant="h4">{groupClass.title}</Typography>
            <Typography variant="h6">
              Tutor: {groupClass.tutor?.username || "Unknown Tutor"}
            </Typography>
            <div className="details mt-4">
              <Typography>Grade: {groupClass.grade}</Typography>
              <Typography>Price: ${groupClass.price}</Typography>
              <Typography>Category: {groupClass.category.name}</Typography>
              <Typography>Max Students: {groupClass.max_book}</Typography>
              <Typography>Type: {groupClass.class_type}</Typography>
              <div className="schedules mt-4">
                <Typography variant="h6">Schedules:</Typography>
                {groupClass.schedules && groupClass.schedules.length > 0 ? (
                  (groupClass.schedules || []).map((schedule, index) => (
                    <div key={index}>
                      <Typography>Date: {schedule.date}</Typography>
                      <Typography>Duration: {schedule.duration}</Typography>
                    </div>
                  ))
                ) : (
                  <Typography>No schedules available.</Typography>
                )}
              </div>
            </div>
            <div className="enrollment-form mt-6">
              <TextField
                label="Your Name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                fullWidth
                margin="normal"
              />
              <TextField
                label="Phone Number"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
                fullWidth
                margin="normal"
              />
              <Button
                variant="contained"
                color="primary"
                onClick={handleEnroll}
                fullWidth
              >
                Confirm Enrollment
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
};

export default GroupClassDetails;