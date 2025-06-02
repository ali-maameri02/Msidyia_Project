import React, { useEffect, useState } from 'react';
import { CameraAlt } from '@mui/icons-material';
import { TextField, Button, Box, FormControlLabel, Checkbox, Typography, InputAdornment, IconButton, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import axios from 'axios';
interface UserProfile {
  id: number;
  username: string;
  email: string;
  Role: string;
  Phone_number?: string;
  Paypal_Email?: string;
  Address?: string;
  Zip_code?: number;
  Picture?: string;
  Gender?: string;
  tutor?: {
    Cover?: string;
    Description?: string;
    Intro_video?: string;
    Verification_Id?: boolean;
    qualifications?: string[];  // Add this
    languages?: string[];
  };
}
const UserProfile: React.FC = () => {
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [coverFile, setcoverFile] = useState<File | null>(null);

  const [activeTab, setActiveTab] = useState('General Information');
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');
  const [coverImage, setCoverImage] = useState('https://via.placeholder.com/600x200');
  const [isEditable, setIsEditable] = useState(true);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState<Partial<UserProfile>>({
    tutor: {
      qualifications: [],
      languages: [],
    },
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  // State for video preview
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  // State for educational qualifications
  const [qualifications, setQualifications] = useState<string[]>(['']);
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      fetchUserProfile(parsedUser.id);
    }
  }, []);

  const fetchUserProfile = async (userId: number) => {
    try {
      const response = await axios.get<UserProfile>(
        `https://msidiya.com/api/users/${userId}/update/`
      );
      // Use the response data directly to update state
      const userData = response.data;
      setUser(userData);
      setProfileImage(userData?.Picture || 'https://via.placeholder.com/150');
      setCoverImage(userData.tutor?.Cover || 'https://via.placeholder.com/600x200');
      setVideoPreview(userData.tutor?.Intro_video || null);
      setFormData({
        ...userData,
        tutor: {
          ...userData.tutor,
          qualifications: userData.tutor?.qualifications || [],
          languages: userData.tutor?.languages || [],
        },
      });
      // For qualifications, we use a separate state to manage add/remove
      setQualifications(userData.tutor?.qualifications || []);
    } catch (err) {
      setError('Failed to load user profile');
    } finally {
      setLoading(false);
    }
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      tutor: {
        ...formData.tutor,
        [e.target.name]: e.target.value,
      }, [e.target.name]: e.target.value,

    });
  };



  const handleUpdate = async () => {
    if (!user) return;
    try {
      // Build updatedData from formData using updated text values.
      const updatedData: Partial<UserProfile> = {
        id: user.id,
        username: formData.username ?? user.username,
        email: formData.email ?? user.email,
        Role: user.Role,
        Phone_number: formData.Phone_number ?? user.Phone_number,
        Paypal_Email: formData.Paypal_Email ?? user.Paypal_Email,
        Address: formData.Address ?? user.Address,
        Zip_code: formData.Zip_code ?? user.Zip_code,
        Gender: formData.Gender ?? user.Gender,
        tutor: {
          Description: formData.tutor?.Description ?? user.tutor?.Description,
          Intro_video: formData.tutor?.Intro_video ?? user.tutor?.Intro_video,
          Verification_Id: formData.tutor?.Verification_Id ?? user.tutor?.Verification_Id,
          qualifications: qualifications, // our separate state for qualifications
          languages: formData.tutor?.languages ?? user.tutor?.languages,
        },
      };

      const form = new FormData();

      // Append top-level fields.
      form.append("username", updatedData.username!);
      form.append("email", updatedData.email!);
      form.append("Phone_number", updatedData.Phone_number || "");
      form.append("Paypal_Email", updatedData.Paypal_Email || "");
      form.append("Address", updatedData.Address || "");
      form.append("Zip_code", updatedData.Zip_code ? String(updatedData.Zip_code) : "");
      form.append("Gender", updatedData.Gender || "");

      // Append nested tutor fields individually.
      if (updatedData.tutor) {
        form.append("tutor[Description]", updatedData.tutor.Description || "");
        form.append("tutor[Intro_video]", updatedData.tutor.Intro_video || "");
        form.append("tutor[Verification_Id]", String(updatedData.tutor.Verification_Id || false));

        // Append each qualification
        if (updatedData.tutor.qualifications) {
          updatedData.tutor.qualifications.forEach((qual, index) => {
            form.append(`tutor[qualifications][${index}]`, qual);
          });
        }
        // Append each language
        if (updatedData.tutor.languages) {
          updatedData.tutor.languages.forEach((lang, index) => {
            form.append(`tutor[languages][${index}]`, lang);
          });
        }
      }

      // Append file fields if new files are selected.
      if (profileFile) {
        form.append("Picture", profileFile);
      }
      if (coverFile) {
        form.append("tutor[Cover]", coverFile);
      }

      const response = await axios.patch(
        `https://msidiya.com/api/users/${user.id}/update/`,
        form,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      alert("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      setError("Failed to update profile");
    }
  };




  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setProfileFile(file); // Store file separately for upload
      setProfileImage(URL.createObjectURL(file)); // Preview new image
    }
  };



  const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setcoverFile(file); // Store file separately for upload
      setCoverImage(URL.createObjectURL(file));
    }// Preview new image
  };


  const handleVideoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      // Revoke old video URL if it exists
      if (videoPreview) {
        URL.revokeObjectURL(videoPreview);
      }

      const newVideo = URL.createObjectURL(event.target.files[0]);
      setVideoPreview(newVideo);
    }
  };

  const handleEditClick = () => {
    handleUpdate();
    setIsEditable(!isEditable);
  };
  const handleQualificationChange = (index: number, value: string) => {
    const updatedQualifications = [...qualifications];
    updatedQualifications[index] = value;
    setQualifications(updatedQualifications);
  };

  const handleAddQualification = () => {
    setQualifications([...qualifications, '']);
  };

  const handleRemoveQualification = (index: number) => {
    const updatedQualifications = qualifications.filter((_, i) => i !== index);
    setQualifications(updatedQualifications);
  };
  return (
    <div className="user-profile flex flex-col justify-around ml-8 mt-16">
      <div className="relative w-full flex flex-col lg:flex-row bg-white h-full rounded-lg shadow-md">
        <img
          src={coverImage}
          alt="Cover"
          className="w-full h-48 object-cover rounded-lg"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleCoverImageChange}
          className="hidden"
          id="cover-image-upload"
        />
        <label
          htmlFor="cover-image-upload"
          className="absolute top-2 right-2 bg-blue-500 text-white p-2 rounded-full cursor-pointer"
        >
          <CameraAlt className="h-6 w-6" />
        </label>
      </div>


      <div className="flex flex-col lg:flex-row bg-white p-6 rounded-lg shadow-md mt-5">
        <div className="lg:w-1/3 p-4">
          <div className="relative -mt-16">
            <img
              src={profileImage}
              alt="Profile"
              className="w-48 h-48 rounded-full mx-auto border-4 border-white"
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

        </div>

        <div className="lg:w-2/3 p-4 lg:pl-8">
          <div className="border-b border-gray-200 mb-4">

            <ul className="flex space-x-6">
              <li
                className={`cursor-pointer ${activeTab === 'General Information' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'} pb-2`}
                onClick={() => handleTabClick('General Information')}
              >
                General Information
              </li>
              <li
                className={`cursor-pointer ${activeTab === 'Description & Intro' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'} pb-2`}
                onClick={() => handleTabClick('Description & Intro')}
              >
                Description & Intro
              </li>
              <li
                className={`cursor-pointer ${activeTab === 'Security and Notification' ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-500'} pb-2`}
                onClick={() => handleTabClick('Security and Notification')}
              >
                Security and Notification
              </li>
            </ul>
          </div>

          {/* Render the form based on the active tab */}
          {activeTab === 'General Information' && (
            <Box component="form" noValidate autoComplete="off" sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
              <TextField
                label="Profile Name"
                variant="outlined"
                value={formData.username || ''} onChange={handleChange}
                fullWidth
                name='username'
                InputProps={{ readOnly: !isEditable }}

              />
              <FormControl fullWidth variant="outlined">
                <InputLabel>Gender</InputLabel>
                <Select
                  name='Gender'
                  value={formData.Gender || ''}
                  onChange={(e) => setFormData({ ...formData, Gender: e.target.value })}
                  label="Gender"
                  disabled={!isEditable}
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                </Select>
              </FormControl>

              <TextField
                label="Email"
                name='email'
                variant="outlined"
                fullWidth
                InputProps={{
                  readOnly: !isEditable,
                }}
                value={formData.email || ''} onChange={handleChange}
              />
              <TextField
                label="Phone Number"
                name='Phone_number'
                variant="outlined"
                value={formData.Phone_number || ''} onChange={handleChange}
                fullWidth
                InputProps={{
                  readOnly: !isEditable,
                  startAdornment: <InputAdornment position="start">+213</InputAdornment>,
                }}
              />
              {/* <TextField
                label="City"
                variant="outlined"
                fullWidth
                InputProps={{
                  readOnly: !isEditable,
                }}
                defaultValue="Vienna"
              /> */}
              <TextField
                name='Address'
                label="Address"
                variant="outlined"
                fullWidth
                value={formData.Address || ''} onChange={handleChange}

                InputProps={{
                  readOnly: !isEditable,
                }}
                defaultValue="2707 Pleasantdale Ro..."
              />
              <Box sx={{ gridColumn: 'span 2' }}>
                <Typography variant="h6" gutterBottom>
                  Languages
                </Typography>
                {formData.tutor?.languages?.map((language, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TextField
                      label={`Language ${index + 1}`}
                      variant="outlined"
                      fullWidth
                      value={language}
                      onChange={(e) => {
                        const updatedLanguages = [...(formData.tutor?.languages || [])];
                        updatedLanguages[index] = e.target.value;
                        setFormData({
                          ...formData,
                          tutor: { ...formData.tutor, languages: updatedLanguages },
                        });
                      }}
                      InputProps={{
                        readOnly: !isEditable,
                      }}
                    />
                    <IconButton
                      onClick={() => {
                        const updatedLanguages =
                          formData.tutor?.languages?.filter((_, i) => i !== index) || [];
                        setFormData({
                          ...formData,
                          tutor: { ...formData.tutor, languages: updatedLanguages },
                        });
                      }}
                      color="error"
                      disabled={formData.tutor?.languages?.length === 1}
                    >
                      <Remove />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  onClick={() => {
                    const updatedLanguages = [...(formData.tutor?.languages || []), ''];
                    setFormData({
                      ...formData,
                      tutor: { ...formData.tutor, languages: updatedLanguages },
                    });
                  }}
                >
                  Add Language
                </Button>

                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  onClick={() => {
                    const updatedLanguages = [...(formData.tutor?.languages || []), ''];
                    setFormData({
                      ...formData,
                      tutor: { ...formData.tutor, languages: updatedLanguages },
                    });
                  }}
                >
                  Add Language
                </Button>
              </Box>

              <TextField
                label="Zip Code"
                name='Zip_code'
                variant="outlined"
                fullWidth
                InputProps={{
                  readOnly: !isEditable,
                }}
                value={formData.Zip_code || ''} onChange={handleChange}
              />
              <TextField
                label="Paypal Email ID"
                variant="outlined"
                name='Paypal_Email'
                fullWidth
                InputProps={{
                  readOnly: !isEditable,
                }}
                value={formData.Paypal_Email || ''} onChange={handleChange}
              />

              <Box sx={{ gridColumn: 'span 2' }}>
                <Typography variant="h6" gutterBottom>
                  Educational Qualifications
                </Typography>
                {qualifications.map((qualification, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <TextField
                      label={`Qualification ${index + 1}`}
                      variant="outlined"
                      fullWidth
                      value={qualification}
                      onChange={(e) => handleQualificationChange(index, e.target.value)}
                      InputProps={{
                        readOnly: !isEditable,
                      }}
                    />
                    <IconButton
                      onClick={() => handleRemoveQualification(index)}
                      color="error"
                      disabled={qualifications.length === 1}
                    >
                      <Remove />
                    </IconButton>
                  </Box>
                ))}
                <Button variant="outlined" startIcon={<Add />} onClick={handleAddQualification}>
                  Add Qualification
                </Button>

                <Button variant="outlined" startIcon={<Add />} onClick={handleAddQualification}>
                  Add Qualification
                </Button>
              </Box>

              <Box sx={{ gridColumn: 'span 2', display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEditClick}
                  disabled={!isEditable}
                >
                  {isEditable ? 'Save Changes' : 'Edit'}
                </Button>
              </Box>
            </Box>
          )}

          {activeTab === 'Description & Intro' && (
            <Box component="form" noValidate autoComplete="off" sx={{ display: 'grid', gap: 2 }}>
              <TextField
                name='Description'
                label="Description"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                InputProps={{ readOnly: !isEditable }}

                value={formData.tutor?.Description || ''} onChange={handleChange}
              />
              <div className="video-upload-section bg-white p-6 rounded-lg shadow-md mt-5">
                <Typography variant="h6" gutterBottom>
                  Upload Video
                </Typography>
                <input
                  type="file"
                  accept="video/*"
                  onChange={handleVideoChange}
                  className="hidden"
                  id="video-upload"
                />
                <label htmlFor="video-upload">
                  <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    startIcon={<Add />}
                  >
                    Upload Video
                  </Button>
                </label>
                {videoPreview && (
                  <Box mt={2}>
                    <video
                      src={videoPreview}
                      controls
                      width="100%"
                      style={{ borderRadius: '8px' }}
                    />
                  </Box>
                )}
              </div>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEditClick}
                  disabled={!isEditable}
                >
                  {isEditable ? 'Save Changes' : 'Edit'}
                </Button>
              </Box>
            </Box>
          )}

          {activeTab === 'Security and Notification' && (
            <Box component="form" noValidate autoComplete="off" sx={{ display: 'grid', gap: 2 }}>
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                  // disabled={!isEditable}
                  />
                }
                label="Receive Email Notifications"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    defaultChecked
                  // disabled={!isEditable}
                  />
                }
                label="Two-Factor Authentication"
              />
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleEditClick}
                // disabled={!isEditable}
                >
                  {isEditable ? 'Save Changes' : 'Edit'}
                </Button>
              </Box>
            </Box>
          )}
        </div>
      </div>

      {/* Video Upload Section */}

    </div>
  );
};

export default UserProfile;
