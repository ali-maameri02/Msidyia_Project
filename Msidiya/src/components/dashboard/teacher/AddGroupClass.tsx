import React, { useState } from "react";
import ReactDOM from 'react-dom'
import Scheduler from "react-mui-scheduler"
const AddGroupClass: React.FC = () => {
  const [paymentType, setPaymentType] = useState<"FREE" | "PAID">("FREE");
  const [state] = useState({
    options: {
      transitionMode: "zoom", // or fade
      startWeekOn: "mon",     // or sun
      defaultMode: "month",    // or week | day | timeline
      minWidth: 540,
      maxWidth: 540,
      minHeight: 540,
      maxHeight: 540
    },
    alertProps: {
      open: true,
      color: "info",          // info | success | warning | error
      severity: "info",       // info | success | warning | error
      message: "🚀 Let's start with awesome Group classes 🔥 🔥 🔥" ,
      showActionButton: true,
      showNotification: true,
      delay: 1500
    },
    toolbarProps: {
      showSearchBar: true,
      showSwitchModeButtons: true,
      showDatePicker: true
    }
  })
  
  const events = [
    {
      id: "event-1",
      label: "Medical consultation",
      groupLabel: "Dr Shaun Murphy",
      user: "Dr Shaun Murphy",
      color: "#f28f6a",
      startHour: "04:00 AM",
      endHour: "05:00 AM",
      date: "2022-05-05",
      createdAt: new Date(),
      createdBy: "Kristina Mayer"
    },
    {
      id: "event-2",
      label: "Medical consultation",
      groupLabel: "Dr Claire Brown",
      user: "Dr Claire Brown",
      color: "#099ce5",
      startHour: "09:00 AM",
      endHour: "10:00 AM",
      date: "2022-05-09",
      createdAt: new Date(),
      createdBy: "Kristina Mayer"
    },
    {
      id: "event-3",
      label: "Medical consultation",
      groupLabel: "Dr Menlendez Hary",
      user: "Dr Menlendez Hary",
      color: "#263686",
      startHour: "13 PM",
      endHour: "14 PM",
      date: "2022-05-10",
      createdAt: new Date(),
      createdBy: "Kristina Mayer"
    },
    {
      id: "event-4",
      label: "Consultation prénatale",
      groupLabel: "Dr Shaun Murphy",
      user: "Dr Shaun Murphy",
      color: "#f28f6a",
      startHour: "08:00 AM",
      endHour: "09:00 AM",
      date: "2022-05-11",
      createdAt: new Date(),
      createdBy: "Kristina Mayer"
    }
  ]
  
  // const handleCellClick = (event, row, day) => {
  //   // Do something...
  // }
  
  // const handleEventClick = (event, item) => {
  //   // Do something...
  // }
  // const handleEventsChange = (item) => {
  //   // Do something...
  // }
  
  // const handleAlertCloseButtonClicked = (item) => {
  //   // Do something...
  // }
  
  return (
    <div className="ml-20 mt-16">
      <h1 className="text-2xl font-semibold mb-6">Create new group class</h1>

      {/* Payment Type */}
      <div className="mb-6">
        <label className="text-lg font-medium mr-4">Payment Type:</label>
        <div className="inline-flex items-center">
          <label className="mr-6 flex items-center">
            <input
              type="radio"
              name="payment"
              value="FREE"
              checked={paymentType === "FREE"}
              onChange={() => setPaymentType("FREE")}
              className="mr-2"
            />
            Free
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="payment"
              value="PAID"
              checked={paymentType === "PAID"}
              onChange={() => setPaymentType("PAID")}
              className="mr-2"
            />
            Paid
          </label>
        </div>
      </div>

      {/* Form */}
      <form className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Group Class Title */}
        <div className="flex flex-col">
          <label htmlFor="title" className="font-medium mb-2">
            Group Class Title <span className="text-red-500">*</span>
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter title"
            className="border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Alias */}
        <div className="flex flex-col">
          <label htmlFor="alias" className="font-medium mb-2">
            Alias
          </label>
          <input
            id="alias"
            type="text"
            placeholder="Enter alias"
            className="border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Age */}
        <div className="flex flex-col">
          <label htmlFor="age" className="font-medium mb-2">
            Age <span className="text-red-500">*</span>
          </label>
          <select
            id="age"
            className="border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Choose age</option>
            <option value="6-10">6-10</option>
            <option value="11-15">11-15</option>
            <option value="16-20">16-20</option>
          </select>
        </div>

        {/* Grade */}
        <div className="flex flex-col">
          <label htmlFor="grade" className="font-medium mb-2">
            Grade <span className="text-red-500">*</span>
          </label>
          <select
            id="grade"
            className="border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option>Choose grade</option>
            <option value="1">Grade 1</option>
            <option value="2">Grade 2</option>
          </select>
        </div>

        {/* Other Fields */}
        <div className="flex flex-col">
          <label htmlFor="price" className="font-medium mb-2">
            Price ($)
          </label>
          <input
            id="price"
            type="number"
            placeholder="0"
            className="border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="Coupon" className="font-medium mb-2">
           Coupon
          </label>
          <input
            id="Coupon"
            type="text"
            className="border border-gray-300 rounded-lg p-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Main Image */}
        <div className="col-span-2 flex flex-col items-center justify-center border-dashed border-2 border-gray-400 rounded-lg p-4">
          <p className="font-medium mb-2">Main Image</p>
          <span className="text-sm text-gray-500">
            Expected size: 200 x 225 px. Max: 1024 KB
          </span>
          <input
            type="file"
            className="mt-2"
          />
        </div>

        {/* Course Material */}
        <div className="col-span-2 flex flex-col items-center justify-center border-dashed border-2 border-gray-400 rounded-lg p-4">
          <p className="font-medium mb-2">Course Material</p>
          <span className="text-sm text-gray-500">Maximum size: 1024 KB</span>
          <input
            type="file"
            className="mt-2"
          />
        </div>
      </form>

      {/* Calendar */}
      <div className="mt-10">
        <h2 className="text-lg font-medium mb-4">Update slot for group class</h2>
        <div className="flex items-center mb-2">
          <div className="flex items-center mr-4">
            <span className="w-4 h-4 bg-red-500 block rounded-full mr-2"></span>
            <span>This group class slots</span>
          </div>
          <div className="flex items-center mr-4">
            <span className="w-4 h-4 bg-green-500 block rounded-full mr-2"></span>
            <span>Other group class slots</span>
          </div>
          <div className="flex items-center">
            <span className="w-4 h-4 bg-yellow-500 block rounded-full mr-2"></span>
            <span>1 on 1 classes</span>
          </div>
        </div>
        <div className="border border-gray-300 rounded-lg p-4">
          {/* Placeholder for the calendar */}
          <p className="text-gray-500">Calendar UI (integrate calendar library here)</p>
          <Scheduler
      locale="en"
      events={events}
      legacyStyle={false}
      options={state?.options}
      alertProps={state?.alertProps}
      toolbarProps={state?.toolbarProps}
      // onEventsChange={handleEventsChange}
      // onCellClick={handleCellClick}
      // onTaskClick={handleEventClick}
      // onAlertCloseButtonClicked={handleAlertCloseButtonClicked}
    />
        </div>
      </div>
    </div>
  );
};

export default AddGroupClass;
