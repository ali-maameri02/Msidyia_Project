import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Typography, Box, TextField, Button, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import axios from "axios";

const Updategroupclasse: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const tutorId = localStorage.getItem("user");
  console.log(tutorId)
  
  const [formData, setFormData] = useState<{
    last_time: string;
    title: string;
    max_book: string;
    category: string | number; // Allow both string and number
    main_image: string;
    age_range: string;
    price: string;
    class_type: string;
    status: string;
    grade : string;
  }>({
    title: "",
    max_book: "",
    category: "",  // Ensure category is initialized as string
    main_image: "",
    age_range: "",
    price: "",
    class_type: "",
    status: "",
    grade:"",
    last_time:"",
  });
  
  
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  useEffect(() => {
    const fetchGroupClass = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/group-classes/${id}/`);
        
        if (!response.data) {
          throw new Error("No data received");
        }
    
        setFormData({
          title: response.data.title || "",
          grade: response.data.grade || "",
          max_book: response.data.max_book ? response.data.max_book.toString() : "",
          category: response.data.category?.toString() || "",
          main_image: response.data.main_image || "",
          age_range: response.data.age_range ? response.data.age_range.toString() : "",
          price: response.data.price ? response.data.price.toString() : "",
          class_type: response.data.class_type ? response.data.class_type.toString() : "",
          status: response.data.status ? response.data.status.toString() : "",
          last_time: response.data.last_time ? new Date(response.data.last_time).toISOString().slice(0, 16) : "",
        });
        
      } catch (error) {
        console.error("Error fetching class:", error);
      }
    };
    
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/categories/");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
  
    if (id) {
      fetchGroupClass();
      fetchCategories();
    }
  }, [id]);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value.toString(), // Ensure all values are stored as strings
    });
  };
  
  

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const handleUpdate = async () => {
    const formDataToSend = new FormData();
  
    formDataToSend.append("title", formData.title);
    formDataToSend.append("grade", formData.grade);
    formDataToSend.append("price", formData.price);
    formDataToSend.append("category", formData.category.toString());
    formDataToSend.append("max_book", formData.max_book);
    formDataToSend.append("age_range", formData.age_range);
    formDataToSend.append("class_type", formData.class_type);
    formDataToSend.append("status", formData.status);
    formDataToSend.append("last_time", formData.last_time);
  
    if (tutorId) {
      formDataToSend.append("tutor", JSON.parse(tutorId).id.toString());
    } else {
      alert("Tutor ID is missing.");
      return;
    }
  
    try {
      // Fetch previous data only if no new image is selected
      if (!selectedImage) {
        const response = await axios.get(`http://127.0.0.1:8000/api/group-classes/${id}/`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
  
        const previousImageUrl = response.data.main_image;
  
        if (previousImageUrl) {
          // Convert the previous image URL to a File object
          const previousImageBlob = await fetch(previousImageUrl).then((res) => res.blob());
          const previousImageFile = new File([previousImageBlob], "previousImage.jpg", { type: previousImageBlob.type });
  
          formDataToSend.append("main_image", previousImageFile);
        }
      } else {
        // Append the new selected image
        formDataToSend.append("main_image", selectedImage);
      }
  
      // Send the update request
      await axios.put(
        `http://127.0.0.1:8000/api/group-classes/${id}/`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      alert("Group class updated successfully!");
      navigate("/dashboard/teacher/group-classes");
    } catch (error: any) {
      if (error.response) {
        console.error("Server Response:", error.response.data);
        alert(`Error: ${JSON.stringify(error.response.data)}`);
      } else {
        console.error("Error updating group class:", error);
        alert("Unexpected error occurred");
      }
    }
  };
  
  
  
  
  return (
    <div className="ml-16 mt-16">
      <Box sx={{ padding: "20px" }}>
        <Typography variant="h4">Update Group Class</Typography>
        <Box sx={{ marginTop: "20px" }}>
          <TextField
            name="title"
            label="Class Name"
            value={formData.title}
            fullWidth
            sx={{ marginBottom: 2 }}
            onChange={handleChange}
          />
          <TextField
            name="max_book"
            label="Maximum Learners"
            type="number"
            value={formData.max_book}
            fullWidth
            sx={{ marginBottom: 2 }}
            onChange={handleChange}
          />
          <TextField
            name="grade"
            label="grade"
            type="text"
            value={formData.grade}
            fullWidth
            sx={{ marginBottom: 2 }}
            onChange={handleChange}
          />
          <TextField
            name="age_range"
            label="age_range"
            type="text"
            value={formData.age_range}
            fullWidth
            sx={{ marginBottom: 2 }}
            onChange={handleChange}
          />
          <TextField
            name="last_time"
            label="last_time"
            type="datetime-local"
            value={formData.last_time}
            fullWidth
            sx={{ marginBottom: 2 }}
            onChange={handleChange}
          />
        
          <TextField
            name="price"
            label="price"
            type="number"
            value={formData.price}
            fullWidth
            sx={{ marginBottom: 2 }}
            onChange={handleChange}
          />
        
         <FormControl fullWidth sx={{ marginBottom: 2 }}>
  <InputLabel>Category</InputLabel>
  <Select
  name="category"
  value={formData.category ? formData.category.toString() : ""}
  onChange={handleChange}
  displayEmpty
>

    <MenuItem value="" disabled>
      {categories.find((cat) => cat.id.toString() === formData.category)?.name || "Select a category"}
    </MenuItem>
    {categories.map((cat) => (
      <MenuItem key={cat.id} value={cat.id.toString()}>
        {cat.name}
      </MenuItem>
    ))}
  </Select>
 
</FormControl>
<FormControl fullWidth sx={{ marginBottom: 2 }}>
  {/* <InputLabel>Type</InputLabel> */}
  <Select
    name="class_type"
    value={formData.class_type || ""}
    onChange={handleChange}
    displayEmpty
  >
    <MenuItem value={formData.class_type || ""} disabled>{formData.class_type || ""} </MenuItem>
    <MenuItem value="paid">Paid</MenuItem>
    <MenuItem value="free">Free</MenuItem>
  </Select>
</FormControl>
<FormControl fullWidth sx={{ marginBottom: 2 }}>
  {/* <InputLabel>Type</InputLabel> */}
  <Select
    name="status"
    value={formData.status || ""}
    onChange={handleChange}
    displayEmpty
  >
    <MenuItem value={formData.status || ""} disabled>{formData.status || ""} </MenuItem>
    <MenuItem value="Visible">Visible</MenuItem>
    <MenuItem value="Hidden">Hidden</MenuItem>
  </Select>
</FormControl>

          {formData.main_image && (
            <Box sx={{ marginBottom: 2 }}>
              <Typography>Current Image:</Typography>
              <img 
  src={`${formData.main_image}`} 
  alt="Group Class" 
  style={{ width: "200px", borderRadius: "8px" }}
/>
            </Box>
          )}
          <Button variant="contained" component="label" sx={{ marginBottom: 2 }}>
            Upload New Image
            <input type="file" hidden onChange={handleImageChange} />
          </Button>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button variant="outlined" sx={{ marginRight: 1 }} onClick={() => navigate(-1)}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleUpdate}>
              Update
            </Button>
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Updategroupclasse;
