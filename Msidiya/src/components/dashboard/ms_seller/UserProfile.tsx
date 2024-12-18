import React, { useState } from 'react';
import { CameraAlt, Edit } from '@mui/icons-material';
import { TextField, Button, Box, FormControlLabel, Checkbox, Typography, InputAdornment, IconButton } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';

const UserProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('General Information');
  const [profileImage, setProfileImage] = useState('https://via.placeholder.com/150');
  const [coverImage, setCoverImage] = useState('https://via.placeholder.com/600x200');
  const [isEditable, setIsEditable] = useState(true);

  // State for video preview
  const [videoPreview, setVideoPreview] = useState<string | null>(null);

  // State for educational qualifications
  const [qualifications, setQualifications] = useState<string[]>(['']);

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  const handleProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const newProfileImage = URL.createObjectURL(event.target.files[0]);
      setProfileImage(newProfileImage);
    }
  };

  const handleCoverImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const newCoverImage = URL.createObjectURL(event.target.files[0]);
      setCoverImage(newCoverImage);
    }
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
    setIsEditable(!isEditable);
  };

  const handleAddQualification = () => {
    setQualifications([...qualifications, '']);
  };

  const handleRemoveQualification = (index: number) => {
    setQualifications(qualifications.filter((_, i) => i !== index));
  };

  const handleQualificationChange = (index: number, value: string) => {
    const newQualifications = [...qualifications];
    newQualifications[index] = value;
    setQualifications(newQualifications);
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
                fullWidth
                InputProps={{
                  readOnly: !isEditable,
                }}
                defaultValue="Jonas"
              />
              <TextField
                label="Gender"
                variant="outlined"
                fullWidth
                InputProps={{
                  readOnly: !isEditable,
                }}
                defaultValue="Male"
              />
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                InputProps={{
                  readOnly: !isEditable,
                }}
                defaultValue="jonas2411@yahoo.com"
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                fullWidth
                InputProps={{
                  readOnly: !isEditable,
                  startAdornment: <InputAdornment position="start">+213</InputAdornment>,
                }}
              />
              <TextField
                label="City"
                variant="outlined"
                fullWidth
                InputProps={{
                  readOnly: !isEditable,
                }}
                defaultValue="Vienna"
              />
              <TextField
                label="Address"
                variant="outlined"
                fullWidth
                InputProps={{
                  readOnly: !isEditable,
                }}
                defaultValue="2707 Pleasantdale Ro..."
              />
              <TextField
                label="Language"
                variant="outlined"
                fullWidth
                InputProps={{
                  readOnly: !isEditable,
                }}
                defaultValue="Ainu, Akoose, Aleut"
              />
              <TextField
                label="Zip Code"
                variant="outlined"
                fullWidth
                InputProps={{
                  readOnly: !isEditable,
                }}
                defaultValue="22180"
              />
              <TextField
                label="Paypal Email ID"
                variant="outlined"
                fullWidth
                InputProps={{
                  readOnly: !isEditable,
                }}
                defaultValue="email@paypal.com"
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
                    <IconButton onClick={() => handleRemoveQualification(index)} color="error" disabled={qualifications.length === 1}>
                      <Remove />
                    </IconButton>
                  </Box>
                ))}
                <Button
                  variant="outlined"
                  startIcon={<Add />}
                  onClick={handleAddQualification}
                >
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
                label="Description"
                multiline
                rows={4}
                variant="outlined"
                fullWidth
                InputProps={{
                  readOnly: !isEditable,
                }}
                defaultValue="Your description here..."
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
