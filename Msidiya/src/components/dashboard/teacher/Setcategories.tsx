import * as React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import {
  Paper,
  IconButton,
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Avatar,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ListIcon from "@mui/icons-material/List";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { useState } from "react";
import {
  useCreateCategory,
  useGetCategories,
} from "../../../services/categories/categories.queries";
import { useQueryClient } from "@tanstack/react-query";

interface Topic {
  id: number;
  name: string;
}
// Define interfaces for row data
interface Subject {
  id: number;
  name: string;
  topics: Topic[]; // Change from string[] to Topic[]
}

interface CategoryRow {
  id: number;
  tutor: number;
  name: string;
  logo: string;
  status: boolean;
  subjects?: Subject[];
}

export default function Setcategories() {
  const [open, setOpen] = React.useState(false);
  const [addModalOpen, setAddModalOpen] = React.useState(false);
  const [isAddingSubject, setIsAddingSubject] = React.useState(false);
  const [newValue, setNewValue] = React.useState("");
  const [selectedSubjects, setSelectedSubjects] = React.useState<Subject[]>([]);
  const [selectedTopics, setSelectedTopics] = React.useState<Topic[]>([]);
  const [selectedSubject, setSelectedSubject] = React.useState<Subject | null>(
    null
  );
  const [openAddCategoryModal, setOpenAddCategoryModal] = React.useState(false);
  const [newCategory, setNewCategory] = React.useState("");
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<
    number | null
  >(null);
  // const [editValue, setEditValue] = useState('');
  const [logoFile, setLogoFile] = useState<File | null>(null); // State for storing the logo file

  const createCategoryMutation = useCreateCategory();
  const queryClient = useQueryClient();

  const storedUser = localStorage.getItem("user");
  const loggedInUser = storedUser ? JSON.parse(storedUser) : null;
  const tutorId = loggedInUser?.id;

  const { data: categories = [], isLoading } = useGetCategories(tutorId);

  const handleOpen = (row: CategoryRow) => {
    setSelectedCategoryId(row.id); // Store the category ID
    axios
      .get(
        `${import.meta.env.VITE_API_BASE_URL}/api/categories/${
          row.id
        }/subjects/`
      )
      .then((response) => {
        setSelectedSubjects(response.data);
        setOpen(true);
      })
      .catch((error) => console.error("Error fetching subjects:", error));
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSubjects([]);
    setSelectedTopics([]);
    setSelectedSubject(null);
  };

  const handleSubjectClick = (subject: Subject) => {
    setSelectedSubject(subject);
    setSelectedTopics(subject.topics);
  };

  const handleAddModalOpen = (isSubject: boolean) => {
    setIsAddingSubject(isSubject);
    setAddModalOpen(true);
    setNewValue("");
  };

  // Add a new subject to the selected category
  const handleAddSubject = async () => {
    if (!selectedCategoryId || !newValue.trim()) {
      alert("Please select a category and enter a subject name.");
      return;
    }

    try {
      await axios.post(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/categories/${selectedCategoryId}/create_subject/`,
        { name: newValue, category_id: selectedCategoryId },
        { headers: { "Content-Type": "application/json" } }
      );

      // Fetch the updated subjects list immediately
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/categories/${selectedCategoryId}/subjects/`
      );
      setSelectedSubjects(response.data);

      setNewValue("");
      setAddModalOpen(false);
    } catch (error) {
      console.error("Error adding subject:", error);
    }
  };
  // Update a subject (for example, update its name)
  const handleUpdateSubject = async (
    subjectId: number,
    updatedName: string
  ) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/subjects/${subjectId}/`,
        { name: updatedName },
        { headers: { "Content-Type": "application/json" } }
      );
      // Re-fetch updated subjects list
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/categories/${selectedCategoryId}/subjects/`
      );
      setSelectedSubjects(response.data);
    } catch (error) {
      console.error("Error updating subject:", error);
    }
  };

  // Delete a subject
  const handleDeleteSubject = async (subjectId: number) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/subjects/${subjectId}/`
      );
      // Re-fetch updated subjects list
      const response = await axios.get(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/categories/${selectedCategoryId}/subjects/`
      );
      setSelectedSubjects(response.data);
    } catch (error) {
      console.error("Error deleting subject:", error);
    }
  };

  // Update category (e.g. update its name)
  const handleAddCategory = async () => {
    if (!newCategory.trim()) {
      alert("Please enter a category name.");
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;
    const loggedInUser = JSON.parse(storedUser);
    const tutorId = loggedInUser?.id;

    try {
      await createCategoryMutation.mutateAsync({
        name: newCategory.trim(),
        logo: logoFile || undefined,
        tutor: tutorId,
      });

      setNewCategory("");
      setLogoFile(null);
      setOpenAddCategoryModal(false);
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  // Delete a category
  const handleDeleteCategory = async (categoryId: number) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/categories/${categoryId}/`
      );
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const handleAddTopic = async () => {
    if (!selectedSubject?.id || !newValue.trim()) {
      alert("Please select a subject and enter a topic name.");
      return;
    }

    try {
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/subjects/${
          selectedSubject.id
        }/add_topic/`,
        { name: newValue },
        { headers: { "Content-Type": "application/json" } }
      );

      // Fetch updated topics immediately
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/subjects/${
          selectedSubject.id
        }/`
      );
      setSelectedTopics(response.data.topics);

      setNewValue("");
      setAddModalOpen(false);
    } catch (error) {
      console.error("Error adding topic:", error);
    }
  };
  // Update a topic
  const handleUpdateTopic = async (topicId: number, updatedName: string) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/topics/${topicId}/`,
        { name: updatedName },
        { headers: { "Content-Type": "application/json" } }
      );
      // Re-fetch updated topics for the selected subject
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/subjects/${
          selectedSubject?.id
        }/`
      );
      setSelectedTopics(response.data.topics);
    } catch (error) {
      console.error("Error updating topic:", error);
    }
  };
  const handleUpdateCategory = async (
    categoryId: number,
    updatedName: string
  ) => {
    try {
      const formData = new FormData();
      formData.append("name", updatedName);
      if (logoFile) {
        formData.append("logo", logoFile);
      }

      await axios.patch(
        `${import.meta.env.VITE_API_BASE_URL}/api/categories/${categoryId}/`,
        formData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      queryClient.invalidateQueries({ queryKey: ["categories"] });
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };
  // Delete a topic
  const handleDeleteTopic = async (topicId: number) => {
    try {
      await axios.delete(
        `${import.meta.env.VITE_API_BASE_URL}/api/topics/${topicId}/`
      );
      // Re-fetch updated topics for the selected subject
      const response = await axios.get(
        `${import.meta.env.VITE_API_BASE_URL}/api/subjects/${
          selectedSubject?.id
        }/`
      );
      setSelectedTopics(response.data.topics);
    } catch (error) {
      console.error("Error deleting topic:", error);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "logo",
      headerName: "Logo",
      width: 100,
      renderCell: (params) => (
        <Avatar
          src={params.value}
          alt={params.row.name}
          sx={{ width: 40, height: 40 }}
        />
      ),
    },
    { field: "name", headerName: "Category Name", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 150,
      renderCell: (params) => {
        let color = "black"; // Default color
        const statusText = params.value; // Status from API

        if (statusText === "in progress") {
          color = "blue";
        } else if (statusText === "accepted") {
          color = "green";
        } else if (statusText === "refused") {
          color = "red";
        }

        return <span style={{ color, fontWeight: "bold" }}>{statusText}</span>;
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      sortable: false,
      renderCell: (params) => (
        <div>
          <IconButton
            color="primary"
            title="List Subjects"
            onClick={() => params.row.onListSubjects?.(params.row)}
          >
            <ListIcon />
          </IconButton>
          <IconButton
            color="secondary"
            title="Modify"
            onClick={() => {
              const updatedName = prompt(
                "Enter new category name",
                params.row.name
              );
              if (updatedName) {
                handleUpdateCategory(params.row.id, updatedName);
              }
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            color="error"
            title="Delete"
            onClick={() => handleDeleteCategory(params.row.id)}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
  ];

  return (
    <div className="ml-16 mt-16">
      <div className="buttons flex flex-row justify-end px-16 pb-5">
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => setOpenAddCategoryModal(true)}
        >
          ADD CATEGORY
        </Button>
      </div>
      <Paper sx={{ height: 400, width: "95%" }}>
        <DataGrid
          rows={categories.map((row: Category) => ({
            id: row.id,
            name: row.name,
            status: row.status,
            logo: row.logo,
            onListSubjects: () => handleOpen(row),
          }))}
          columns={columns}
          pageSizeOptions={[5, 10]}
          checkboxSelection
          sx={{ border: 0 }}
        />
      </Paper>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 800,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
          }}
        >
          <div className="flex space-x-6">
            {/* Subjects Table */}
            <TableContainer component={Paper} sx={{ flex: 1 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Subjects
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        onClick={() => {
                          setIsAddingSubject(true);
                          setAddModalOpen(true);
                          selectedCategoryId;
                        }}
                      >
                        Add Subject
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedSubjects.map((subject, index) => (
                    <TableRow
                      key={subject.id || `subject-${index}`} // Fallback to index if id is missing
                      hover
                      selected={subject.id === selectedSubject?.id}
                      onClick={() => handleSubjectClick(subject)}
                      sx={{ cursor: "pointer" }}
                    >
                      <TableCell>{subject.name}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="secondary"
                          title="Modify"
                          onClick={() => {
                            const updatedName = prompt(
                              "Enter new subject name",
                              subject.name
                            );
                            if (updatedName) {
                              handleUpdateSubject(subject.id, updatedName);
                            }
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          title="Delete"
                          onClick={() => handleDeleteSubject(subject.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            {/* Topics Table */}
            <TableContainer component={Paper} sx={{ flex: 1 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <Typography variant="subtitle1" fontWeight="bold">
                        Topics
                      </Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={() => handleAddModalOpen(false)}
                      >
                        Add Topic
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {selectedTopics.map((topic) => (
                    <TableRow key={topic.id}>
                      <TableCell>{topic.name}</TableCell>
                      <TableCell align="right">
                        <IconButton
                          color="secondary"
                          title="Modify"
                          onClick={() => {
                            const updatedName = prompt(
                              "Enter new topic name",
                              topic.name
                            );
                            if (updatedName) {
                              handleUpdateTopic(topic.id, updatedName);
                            }
                          }}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          color="error"
                          title="Delete"
                          onClick={() => handleDeleteTopic(topic.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="flex justify-end mt-4">
            <Button variant="contained" color="primary" onClick={handleClose}>
              Close
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Add Subject/Topic Modal */}
      <Modal open={addModalOpen} onClose={() => setAddModalOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add {isAddingSubject ? "Subject" : "Topic"}
          </Typography>
          <TextField
            label={`New ${isAddingSubject ? "Subject" : "Topic"} Name`}
            value={newValue}
            onChange={(e) => setNewValue(e.target.value)}
            fullWidth
          />
          <div className="flex justify-end mt-4 space-x-4">
            <Button variant="outlined" onClick={() => setAddModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={isAddingSubject ? handleAddSubject : handleAddTopic}
            >
              {isAddingSubject ? "Add Subject" : "Add Topic"}
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Add Category Modal */}
      <Modal
        open={openAddCategoryModal}
        onClose={() => setOpenAddCategoryModal(false)}
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: "10px",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Add Category
          </Typography>
          <TextField
            label="New Category Name"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            fullWidth
            margin="normal"
          />
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setLogoFile(e.target.files ? e.target.files[0] : null)
            }
            style={{ marginBottom: "1rem" }}
          />
          <div className="flex justify-end mt-4 space-x-4">
            <Button
              variant="outlined"
              onClick={() => setOpenAddCategoryModal(false)}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddCategory}
            >
              Add
            </Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
