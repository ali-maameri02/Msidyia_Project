import React, { useState, useEffect } from "react";
import axios from "axios";
import Scheduler from "react-mui-scheduler";
import { Box, Modal, TextField } from "@mui/material";
// import { SchedulerEvent } from "react-mui-scheduler"; // Import event type if available

import { Button } from "@mui/material";
type SchedulerEvent = {
  row?: { date?: string };
  value?: string;
};

const AddGroupClass: React.FC = () => {
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [duration, setDuration] = useState<string>("");
  const [open, setOpen] = useState(false);
  const tutorId = localStorage.getItem("user");
  const user = tutorId ? JSON.parse(tutorId) : null;

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/categories/")
      .then(response => setCategories(response.data))
      .catch(error => console.error("Error fetching categories:", error));
  }, []);

  const [formData, setFormData] = useState({
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

  const [scheduleDetails, setScheduleDetails] = useState<{ date: string; duration: string }[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.files ? e.target.files[0] : null });
  };

  const [groupClassId, setGroupClassId] = useState<number | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    if (!tutorId) {
      alert("Tutor ID is missing.");
      return;
    }
  
    if (!formData.title  || !formData.grade || !formData.class_type || !formData.status || !formData.last_time) {
      alert("Please fill all required fields.");
      return;
    }
  
    try {
      const formDataObj = new FormData();
      formDataObj.append("tutor", JSON.parse(tutorId).id.toString());
  
      Object.entries(formData).forEach(([key, value]) => {
        if (value !== null && value !== "") {
          formDataObj.append(key, value);
        }
      });
  
      if (formData.category) {
        formDataObj.append("category", String(formData.category));
      }
  
      // Step 1: Create Group Class
      const groupClassResponse = await axios.post(
        "http://127.0.0.1:8000/api/group-classes/",
        formDataObj,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
  
      const createdGroupClassId = groupClassResponse.data.id;
      setGroupClassId(createdGroupClassId);
  
      console.log("Group Class Created:", createdGroupClassId);
      alert("Group class created successfully!");
  
      // **Step 2: Automatically Create Schedule if Date Selected**
      if (selectedDate) {
        sendScheduleDetails(createdGroupClassId);
      }
    } catch (error: any) {
      console.error("Error creating group class:", error.response?.data || error.message);
      alert("An error occurred while creating the group class.");
    }
  };
  
  const sendScheduleDetails = async (createdGroupClassId: number) => {
    if (!selectedDate) {
      alert("Please select a date.");
      return;
    }
  
    if (!tutorId) {
      alert("Tutor ID is missing.");
      return;
    }
  
    if (!createdGroupClassId) {
      alert("Group class ID is missing. Please create the group class first.");
      return;
    }
  
    try {
      const newSchedule = {
        group_class: createdGroupClassId, // ✅ Send only the ID
        date: selectedDate,
        duration: "01:00:00",
      };
  
      const response = await axios.post(
        "http://127.0.0.1:8000/api/schedulescreate/",
        newSchedule
      );
  
      console.log("Schedule Created:", response.data);
  
      setScheduleDetails([...scheduleDetails, { 
        date: selectedDate, 
        duration: "1 hour" 
      }]);
  
      setOpen(false); // Close modal
      alert("Schedule added successfully!");
    } catch (error: any) {
      console.error("Error creating schedule:", error.response?.data || error.message);
      alert("Failed to add schedule.");
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
  //       "http://127.0.0.1:8000/api/schedules/",
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
      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label htmlFor="title" className="font-medium mb-2">Group Class Title *</label>
          <input id="title" type="text" placeholder="Enter title" className="border p-2 rounded-lg" onChange={handleChange} />
        </div>

        {/* <div className="flex flex-col">
          <label htmlFor="age_range" className="font-medium mb-2">Age Range *</label>
          <input id="age_range" type="text" placeholder="Enter age range" className="border p-2 rounded-lg" onChange={handleChange} />
        </div> */}

        <div className="flex flex-col">
          <label htmlFor="grade" className="font-medium mb-2">Grade *</label>
          <input id="grade" type="text" placeholder="Enter grade" className="border p-2 rounded-lg" onChange={handleChange} />
        </div>

        <div className="flex flex-col">
          <label htmlFor="price" className="font-medium mb-2">Price ($)</label>
          <input id="price" type="number" placeholder="0" className="border p-2 rounded-lg" onChange={handleChange} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="max_book" className="font-medium mb-2">max_book </label>
          <input id="max_book" type="number" placeholder="0" className="border p-2 rounded-lg" onChange={handleChange} />
        </div>

        <div className="flex flex-col">
          <label htmlFor="category" className="font-medium mb-2">Category</label>
          <select id="category" className="border p-2 rounded-lg" onChange={handleChange}>
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="class_type" className="font-medium mb-2">Class Type *</label>
          <select id="class_type" className="border p-2 rounded-lg" onChange={handleChange} defaultValue="Online">
            <option value="Paid">Paid</option>
            <option value="Free">Free</option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="status" className="font-medium mb-2">Status *</label>
          <select id="status" className="border p-2 rounded-lg" onChange={handleChange} defaultValue="Active">
            <option value="Visible">Visible</option>
            <option value="Hidden">Hidden </option>
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="last_time" className="font-medium mb-2">Last Time *</label>
          <input id="last_time" type="datetime-local" className="border p-2 rounded-lg" onChange={handleChange} />
        </div>

        <div className="flex flex-col">
          <label htmlFor="main_image" className="font-medium mb-2">Upload Image</label>
          <input id="main_image" type="file" className="border p-2 rounded-lg" onChange={handleFileChange} />
        </div>

        <button type="submit" className="col-span-3 bg-blue-500 text-white py-2 rounded-lg">Submit</button>
      </form>

      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  <h1 className="col-span-full text-lg font-semibold">Sessions Times</h1>
  
 
  
  {/* Date Selection */}
  <div className="flex flex-col">
    <label htmlFor="date" className="font-medium mb-2">Session Date *</label>
    <input type="datetime-local" onChange={(e) => setSelectedDate(e.target.value)}/>  </div>
  
  {/* Duration Selection */}
  <div className="flex flex-col">
    <label htmlFor="duration" className="font-medium mb-2">Duration (HH:MM:SS) *</label>
    <input id="duration" type="time" step="1" className="border p-2 rounded-lg" onChange={handleChange} />
  </div>
  
 
  {/* Submit Button */}
  <Button variant="contained" className="p-0 h-16" onClick={() => groupClassId && sendScheduleDetails(groupClassId)}>
  Add Schedule
</Button>
</form>

    </div>
  );
};

export default AddGroupClass;
