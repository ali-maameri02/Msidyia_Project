import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  TextField,
  Button,
  Box,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Add, CameraAlt } from "@mui/icons-material";

// Define the structure of the student profile data
interface StudentProfile {
  id: number;
  username: string;
  email: string;
  Role: string;
  Phone_number: string | null;
  Paypal_Email: string | null;
  Address: string | null;
  Zip_code: string | null;
  Gender: string | null;
  Picture: string | null;
  student: {
    Grade: string | null;
  };
}

const UserProfile = () => {
  // State variables
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [activeTab, setActiveTab] = useState("General Information");
  const [profileImage, setProfileImage] = useState(
    "https://via.placeholder.com/150"
  );
  const [isEditable, setIsEditable] = useState(false); // Controls edit mode
  const [user, setUser] = useState<StudentProfile | null>(null);
  const [formData, setFormData] = useState<Partial<StudentProfile>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user profile data on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      fetchUserProfile(parsedUser.id);
    }
  }, []);

  // Fetch user profile data from the backend
  const fetchUserProfile = async (userId: number) => {
    try {
      const response = await axios.get<StudentProfile>(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/${userId}/update/`
      );
      const userData = response.data;
      setUser(userData);
      setProfileImage(userData.Picture || "https://via.placeholder.com/150");
      setFormData({
        ...userData,
        student: {
          Grade: userData.student?.Grade || "",
        },
      });
    } catch (err) {
      console.error(err);
      setError("Failed to load student profile");
    } finally {
      setLoading(false);
    }
  };

  // Handle changes in form fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    // Check if the field belongs to the nested `student` object
    if (name.startsWith("student.")) {
      const studentField = name.split(
        "."
      )[1] as keyof StudentProfile["student"];
      setFormData((prev) => ({
        ...prev,
        student: {
          ...(prev.student ?? {}),
          [studentField]: value || null,
        },
      }));
    } else {
      // Handle top-level fields
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  // Handle profile image upload
  const handleProfileImageChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setProfileFile(file); // Store file for upload
      setProfileImage(URL.createObjectURL(file)); // Preview new image
    }
  };

  const handleUpdate = async () => {
    if (!user) return;

    const updatedData: Partial<StudentProfile> = {
      username: formData.username ?? user.username,
      email: formData.email ?? user.email,
      Phone_number: formData.Phone_number ?? user.Phone_number,
      Paypal_Email: formData.Paypal_Email ?? user.Paypal_Email,
      Address: formData.Address ?? user.Address,
      Zip_code: formData.Zip_code ?? user.Zip_code,
      Gender: formData.Gender ?? user.Gender,
      Role: user.Role,
      student: {
        Grade: formData.student?.Grade ?? user.student?.Grade,
      },
    };

    try {
      const form = new FormData();

      // Append fields to FormData
      form.append("username", updatedData.username!);
      form.append("email", updatedData.email!);
      form.append("Phone_number", updatedData.Phone_number || "");
      form.append("Paypal_Email", updatedData.Paypal_Email || "");
      form.append("Address", updatedData.Address || "");
      form.append("Zip_code", updatedData.Zip_code || "");
      form.append("Gender", updatedData.Gender || "");
      form.append("Role", updatedData.Role!);

      // Add individual fields from the 'student' object
      if (updatedData.student?.Grade) {
        form.append("student.Grade", updatedData.student.Grade);
      }

      // Append profile picture if available
      if (profileFile) {
        form.append("Picture", profileFile);
      }

      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/users/${user.id}/update/`,
        form,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      await fetchUserProfile(user.id); // Refresh the user data
      setIsEditable(false); // Turn off edit mode
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to update profile");
    }
  };

  // Toggle edit mode
  const handleEditClick = () => {
    setIsEditable(!isEditable); // Toggle edit mode
  };

  // Handle tab clicks
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  // Render loading or error states
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mt-16 p-16 ml-16">
      <div className="relative w-full flex flex-col justify-start items-start lg:flex-col bg-white h-full rounded-lg shadow-md">
        {/* Profile Image */}
        <div className="relative -mt-16">
          <img
            src={profileImage}
            alt="Profile"
            className="w-52 h-48 rounded-full mx-auto border-4 border-white"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleProfileImageChange}
            className="hidden"
            id="profile-image-upload"
          />
          <label
            htmlFor="profile-image-upload"
            className="absolute bottom-0 right-4 bg-blue-500 text-white p-2 rounded-full cursor-pointer"
          >
            <CameraAlt className="h-6 w-6" />
          </label>
        </div>

        {/* Main Content */}
        <div className="lg:w-2/3 p-4 lg:pl-8">
          <div className="border-b border-gray-200 mb-4">
            <ul className="flex space-x-6">
              <li
                className={`cursor-pointer ${
                  activeTab === "General Information"
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-500"
                } pb-2`}
                onClick={() => handleTabClick("General Information")}
              >
                General Information
              </li>
              <li
                className={`cursor-pointer ${
                  activeTab === "Security and Notification"
                    ? "text-blue-500 border-b-2 border-blue-500"
                    : "text-gray-500"
                } pb-2`}
                onClick={() => handleTabClick("Security and Notification")}
              >
                Security and Notification
              </li>
            </ul>
          </div>

          {/* Render the form based on the active tab */}
          {activeTab === "General Information" && (
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
                gap: 2,
              }}
            >
              <TextField
                label="Username"
                variant="outlined"
                fullWidth
                name="username"
                value={formData.username || ""}
                onChange={handleChange}
                InputProps={{
                  readOnly: !isEditable,
                }}
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
                InputProps={{
                  readOnly: !isEditable,
                }}
              />
              <TextField
                label="Grade"
                variant="outlined"
                fullWidth
                name="student.Grade"
                value={formData.student?.Grade || ""}
                onChange={handleChange}
                InputProps={{
                  readOnly: !isEditable,
                }}
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                name="Phone_number"
                value={formData.Phone_number || ""}
                onChange={handleChange}
                InputProps={{
                  readOnly: !isEditable,
                  startAdornment: (
                    <InputAdornment position="start">+213</InputAdornment>
                  ),
                }}
              />
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                name="Address"
                value={formData.Address || ""}
                onChange={handleChange}
                InputProps={{
                  readOnly: !isEditable,
                }}
              />
              <TextField
                label="Zip Code"
                variant="outlined"
                fullWidth
                name="Zip_code"
                value={formData.Zip_code || ""}
                onChange={handleChange}
                InputProps={{
                  readOnly: !isEditable,
                }}
              />
              <TextField
                label="Paypal Email"
                variant="outlined"
                fullWidth
                name="Paypal_Email"
                value={formData.Paypal_Email || ""}
                onChange={handleChange}
                InputProps={{
                  readOnly: !isEditable,
                }}
              />
              <Box
                sx={{
                  gridColumn: "span 2",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={isEditable ? handleUpdate : handleEditClick}
                >
                  {isEditable ? "Save Changes" : "Edit"}
                </Button>
              </Box>
            </Box>
          )}

          {activeTab === "Security and Notification" && (
            <Box
              component="form"
              noValidate
              autoComplete="off"
              sx={{ display: "grid", gap: 2 }}
            >
              <Typography variant="h6" gutterBottom>
                Security Settings
              </Typography>
              <Box>
                <Typography variant="subtitle1">
                  Two-Factor Authentication
                </Typography>
                <IconButton>
                  <Add />
                </IconButton>
              </Box>
              <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={isEditable ? handleUpdate : handleEditClick}
                >
                  {isEditable ? "Save Changes" : "Edit"}
                </Button>
              </Box>
            </Box>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
