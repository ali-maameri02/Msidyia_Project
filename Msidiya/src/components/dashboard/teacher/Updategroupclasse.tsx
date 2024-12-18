import React from "react";
import { useParams } from "react-router-dom";
import { Typography, Box, TextField, Button } from "@mui/material";

const Updategroupclasse: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const handleUpdate = () => {
    console.log(`Updating group class with ID: ${id}`);
    // Add your update logic here
  };

  return (
    <div className="ml-16 mt-16">

    <Box sx={{ padding: "20px" }}>
      <Typography variant="h4">Update Group Class</Typography>
      <Box sx={{ marginTop: "20px" }}>
        <TextField
          label="Class Name"
          fullWidth
          sx={{ marginBottom: 2 }}
          // Add default values or handlers here
        />
        <TextField
          label="Maximum Learners"
          type="number"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <TextField
          label="Category"
          fullWidth
          sx={{ marginBottom: 2 }}
        />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="outlined" sx={{ marginRight: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update
          </Button>
        </Box>
      </Box>
    </Box></div>
  );
};

export default Updategroupclasse;
