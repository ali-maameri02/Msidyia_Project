import React, { useState } from "react";
import {
  createGroupClass,
  createGroupClassSession,
} from "../../../services/group_classes/group_classes.api";
import { axiosClient } from "../../../assets/lib/axiosClient";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormHelperText,
  Alert,
  CircularProgress,
  SelectChangeEvent,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../../../hooks/useAuth";
import { CreateGroupClassSessionData } from "../../../services/group_classes/group_classes.types";
// import Scheduler from "react-mui-scheduler";
// import { Box, Modal, TextField } from "@mui/material";
// import { SchedulerEvent } from "react-mui-scheduler"; // Import event type if available

// type SchedulerEvent = {
//   row?: { date?: string };
//   value?: string;
// };

interface Category {
  id: number;
  name: string;
}

interface FormData {
  title: string;
  grade: string;
  price: string;
  category: string;
  max_book: string;
  class_type: string;
  status: string;
  last_time: string;
  main_image: File | null;
}

const AddGroupClass: React.FC = () => {
  const { user, isTeacher } = useAuth();
  const { data: categories = [], isLoading: isLoadingCategories } = useQuery<
    Category[]
  >({
    queryKey: ["categories"],
    queryFn: async () => {
      const response = await axiosClient.get("/api/categories/");
      return response.data;
    },
  });

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  // const [duration, setDuration] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  console.log(open, user);

  // Form validation state
  const [formErrors, setFormErrors] = useState<Record<keyof FormData, string>>({
    title: "",
    grade: "",
    price: "",
    category: "",
    max_book: "",
    class_type: "",
    status: "",
    last_time: "",
    main_image: "",
  });

  const [formData, setFormData] = useState<FormData>({
    title: "",
    // age_range: "",
    grade: "",
    price: "",
    category: "",
    max_book: "",
    class_type: "Free", // Default value
    status: "Visible", // Default value
    last_time: "",
    main_image: null,
  });

  const [scheduleDetails, setScheduleDetails] = useState<
    { date: string; duration: string }[]
  >([]);

  const handleTextChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof FormData]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (e: SelectChangeEvent) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name as keyof FormData]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setFormErrors((prev) => ({
          ...prev,
          main_image: "File size should be less than 5MB",
        }));
        return;
      }
      setFormData((prev) => ({ ...prev, main_image: file }));
      setFormErrors((prev) => ({ ...prev, main_image: "" }));
    }
  };

  const [groupClassId, setGroupClassId] = useState<number | null>(null);

  const validateForm = () => {
    const errors = {
      title: "",
      grade: "",
      price: "",
      category: "",
      max_book: "",
      class_type: "",
      status: "",
      last_time: "",
      main_image: "",
    };

    if (!formData.title.trim()) {
      errors.title = "Title is required";
    }

    if (!formData.grade.trim()) {
      errors.grade = "Grade is required";
    }

    if (formData.price && isNaN(Number(formData.price))) {
      errors.price = "Price must be a valid number";
    }

    if (formData.max_book && isNaN(Number(formData.max_book))) {
      errors.max_book = "Maximum bookings must be a valid number";
    }

    if (!formData.class_type) {
      errors.class_type = "Class type is required";
    }

    if (!formData.status) {
      errors.status = "Status is required";
    }

    if (!formData.last_time) {
      errors.last_time = "Last time is required";
    }

    setFormErrors(errors);
    return !Object.values(errors).some((error) => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!user || !isTeacher()) {
      setError("Please log in as a tutor to create a group class.");
      return;
    }

    if (!validateForm()) {
      setError("Please fix the errors in the form before submitting.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formDataObj = new FormData();

      // Add tutor ID first
      formDataObj.append("tutor", user.id.toString());

      // Add all form fields
      formDataObj.append("title", formData.title);
      formDataObj.append("grade", formData.grade);
      formDataObj.append("price", formData.price);
      formDataObj.append("category", formData.category);
      formDataObj.append("max_book", formData.max_book);
      formDataObj.append("class_type", formData.class_type);
      formDataObj.append("status", formData.status);
      formDataObj.append("last_time", formData.last_time);

      // Add image if it exists
      if (formData.main_image) {
        formDataObj.append("main_image", formData.main_image);
      }

      // Log the FormData contents for debugging
      for (const pair of formDataObj.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      const response = await createGroupClass(formDataObj);
      const createdGroupClassId = response.id;

      setSuccess("Group class created successfully!");

      if (selectedDate) {
        await sendScheduleDetails(createdGroupClassId);
      }

      // Reset form
      setFormData({
        title: "",
        grade: "",
        price: "",
        category: "",
        max_book: "",
        class_type: "Free",
        status: "Visible",
        last_time: "",
        main_image: null,
      });
      setSelectedDate(null);
      setScheduleDetails([]);
    } catch (error: any) {
      console.error("Error creating group class:", error);
      setError(
        error.response?.data?.message ||
          "Failed to create group class. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const sendScheduleDetails = async (createdGroupClassId: number) => {
    if (!selectedDate) {
      setError("Please select a date for the session.");
      return;
    }

    try {
      const sessionData: CreateGroupClassSessionData = {
        group_class: createdGroupClassId,
        date: selectedDate,
        duration: "01:00:00",
        topic: "Initial Session",
      };

      await createGroupClassSession(sessionData);
    } catch (error: any) {
      console.error("Error creating session:", error);
      setError(
        error.response?.data?.message ||
          "Failed to create session. Please try again."
      );
    }
  };

  // Capture date when user clicks on scheduler
  // const handleDateClick = (date: any) => {
  //   if (date instanceof Date) {
  //     setSelectedDate(date.toISOString().split(".")[0]);
  //     console.log("Selected date:", selectedDate);

  //     setOpen(true);
  //   } else {
  //     console.error("Unexpected format:", date);
  //   }
  // };

  // const sendScheduleDetails = async () => {
  //   if (!selectedDate) {
  //     alert("Please select a date.");
  //     return;
  //   }

  //   if (!tutorId) {
  //     alert("Tutor ID is missing.");
  //     return;
  //   }

  //   if (!groupClassId) {
  //     alert("Group class ID is missing. Please create the group class first.");
  //     return;
  //   }

  //   try {
  //     const newSchedule = {
  //       group_class: groupClassId, // Use the stored Group Class ID
  //       date: selectedDate, // Use the selected date
  //       duration: "01:00:00", // Fixed 1-hour duration
  //       created_by: JSON.parse(tutorId).id, // User ID from local storage
  //     };

  //     const response = await axios.post(
  //       "${import.meta.env.VITE_API_BASE_URL}/api/schedules/",
  //       newSchedule
  //     );

  //     console.log("Schedule created:", response.data);

  //     setScheduleDetails([...scheduleDetails, {
  //       date: selectedDate,
  //       duration: "1 hour"
  //     }]);

  //     setOpen(false); // Close modal
  //     alert("Schedule added successfully!");
  //   } catch (error: any) {
  //     console.error("Error creating schedule:", error.response?.data || error.message);
  //     alert("Failed to add schedule.");
  //   }
  // };

  // const handleCellClick = (event: any) => {
  //   console.log("Event received:", event);

  //   if (!event || !event.nativeEvent) {
  //     console.error("Invalid event format:", event);
  //     return;
  //   }

  //   let targetElement = event.nativeEvent.target as HTMLElement;
  //   console.log("Clicked element:", targetElement);

  //   // Traverse up if necessary to find the element with a valid `data-date`
  //   while (targetElement && !targetElement.getAttribute("data-date")) {
  //     targetElement = targetElement.parentElement as HTMLElement;
  //   }

  //   const dateAttribute = targetElement?.getAttribute("data-date");

  //   if (dateAttribute) {
  //     console.log("Valid date found:", dateAttribute);
  //     setSelectedDate(dateAttribute);
  //     setOpen(true);
  //     return;
  //   }

  //   console.error("No valid date found in event.");
  // };

  return (
    <div className="ml-20 mt-16">
      <h1 className="text-2xl font-semibold mb-6">Create new group class</h1>

      {error && (
        <Alert severity="error" className="mb-4">
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" className="mb-4">
          {success}
        </Alert>
      )}

      <form
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        onSubmit={handleSubmit}
      >
        <FormControl fullWidth error={!!formErrors.title}>
          <TextField
            name="title"
            label="Group Class Title *"
            value={formData.title}
            onChange={handleTextChange}
            error={!!formErrors.title}
            helperText={formErrors.title}
            required
          />
        </FormControl>

        {/* <div className="flex flex-col">
          <label htmlFor="age_range" className="font-medium mb-2">Age Range *</label>
          <input id="age_range" type="text" placeholder="Enter age range" className="border p-2 rounded-lg" onChange={handleChange} />
        </div> */}

        <FormControl fullWidth error={!!formErrors.grade}>
          <TextField
            name="grade"
            label="Grade *"
            value={formData.grade}
            onChange={handleTextChange}
            error={!!formErrors.grade}
            helperText={formErrors.grade}
            required
          />
        </FormControl>

        <FormControl fullWidth error={!!formErrors.price}>
          <TextField
            name="price"
            label="Price ($)"
            type="number"
            value={formData.price}
            onChange={handleTextChange}
            error={!!formErrors.price}
            helperText={formErrors.price}
          />
        </FormControl>

        <FormControl fullWidth error={!!formErrors.max_book}>
          <TextField
            name="max_book"
            label="Maximum Bookings"
            type="number"
            value={formData.max_book}
            onChange={handleTextChange}
            error={!!formErrors.max_book}
            helperText={formErrors.max_book}
          />
        </FormControl>

        <FormControl fullWidth>
          <InputLabel>Category</InputLabel>
          <Select
            name="category"
            value={formData.category}
            onChange={handleSelectChange}
            label="Category"
            disabled={isLoadingCategories}
          >
            <MenuItem value="">Select a category</MenuItem>
            {categories.map((cat) => (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            ))}
          </Select>
          {isLoadingCategories && (
            <FormHelperText>Loading categories...</FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth error={!!formErrors.class_type}>
          <InputLabel>Class Type *</InputLabel>
          <Select
            name="class_type"
            value={formData.class_type}
            onChange={handleSelectChange}
            label="Class Type *"
            required
          >
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Free">Free</MenuItem>
          </Select>
          {formErrors.class_type && (
            <FormHelperText>{formErrors.class_type}</FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth error={!!formErrors.status}>
          <InputLabel>Status *</InputLabel>
          <Select
            name="status"
            value={formData.status}
            onChange={handleSelectChange}
            label="Status *"
            required
          >
            <MenuItem value="Visible">Visible</MenuItem>
            <MenuItem value="Hidden">Hidden</MenuItem>
          </Select>
          {formErrors.status && (
            <FormHelperText>{formErrors.status}</FormHelperText>
          )}
        </FormControl>

        <FormControl fullWidth error={!!formErrors.last_time}>
          <TextField
            name="last_time"
            label="Last Time *"
            type="datetime-local"
            value={formData.last_time}
            onChange={handleTextChange}
            error={!!formErrors.last_time}
            helperText={formErrors.last_time}
            required
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>

        <FormControl fullWidth error={!!formErrors.main_image}>
          <TextField
            name="main_image"
            type="file"
            onChange={handleFileChange}
            error={!!formErrors.main_image}
            helperText={formErrors.main_image || "Maximum file size: 5MB"}
            InputLabelProps={{ shrink: true }}
          />
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="col-span-3"
          disabled={isSubmitting}
          startIcon={isSubmitting ? <CircularProgress size={20} /> : null}
        >
          {isSubmitting ? "Creating..." : "Create Group Class"}
        </Button>
      </form>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Sessions Times</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FormControl fullWidth>
            <TextField
              label="Session Date"
              type="datetime-local"
              value={selectedDate || ""}
              onChange={(e) => setSelectedDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
            />
          </FormControl>

          <Button
            variant="contained"
            color="secondary"
            onClick={() => selectedDate && sendScheduleDetails(groupClassId!)}
            disabled={!selectedDate || !groupClassId}
          >
            Add Schedule
          </Button>
        </div>

        {scheduleDetails.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Added Sessions:</h3>
            <ul className="list-disc pl-5">
              {scheduleDetails.map((schedule, index) => (
                <li key={index}>
                  Date: {new Date(schedule.date).toLocaleString()}, Duration:{" "}
                  {schedule.duration}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddGroupClass;
