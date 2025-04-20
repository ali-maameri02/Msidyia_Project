import React, { useState } from "react";
import TelegramIcon from "@mui/icons-material/Telegram";
import { Avatar } from "@mui/material";
import EmojiPicker from "emoji-picker-react"; // Corrected import

export default function Messages() {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  // Handle sending the message
  const handleSend = () => {
    if (message.trim()) {
      console.log("Message sent:", message);
      setMessage(""); // Clear the input field
    }
  };

  // Handle emoji selection
  const handleEmojiClick = (emojiObject: { emoji: string }) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
  };

  return (
    <main className="flex h-screen  mt-16 px-10">
      {/* Sidebar: Chat List */}
      <div className="w-1/3 ml-5 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 flex items-center space-x-2">
       
          <input
            type="text"
            placeholder="Search..."
            className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>
        {/* Chat Items */}
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center p-4 hover:bg-gray-50 cursor-pointer"
            >
              <Avatar
                alt="User Avatar"
                src={`https://i.pravatar.cc/150?img=${index + 1}`}
                className="mr-4"
              />
              <div className="flex-1">
                <p className="font-bold text-sm">Dr. Hello</p>
                <p className="text-xs text-gray-500 truncate">
                  Hi, how are you? I wish you...
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-xs text-gray-500">18:30</p>
                <span className="bg-color1 text-white text-xs px-2 py-1 rounded-full">
                  2
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-cover bg-center" style={{ backgroundImage: 'url("https://i.imgur.com/9ZvQzqf.png")' }}>
        {/* Header */}
        <div className="flex items-center p-4 border-b border-gray-200 bg-white">
          <Avatar
            alt="Chat User"
            src="https://i.pravatar.cc/150?img=6"
            className="mr-4"
          />
          <div>
            <p className="font-bold">David Moore</p>
            <p className="text-xs text-gray-500">Last seen 5 mins ago</p>
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-white">
          <div className="space-y-4">
            {/* Incoming Message */}
            <div className="flex items-end">
              <Avatar
                alt="User Avatar"
                src="https://i.pravatar.cc/150?img=6"
                className="mr-2"
              />
              <div className="bg-blue-100 p-3 rounded-lg max-w-xs">
                <p className="text-sm">OMG 😂 do you remember what you did last night at the work night out?</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-500">18:12</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Outgoing Message */}
            <div className="flex justify-end items-end">
              <div className="bg-color1 text-white p-3 rounded-lg max-w-xs">
                <p className="text-sm">no haha 😂</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-white">18:16</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
              <Avatar
                alt="User Avatar"
                src="https://i.pravatar.cc/150?img=7"
                className="ml-2"
              />
            </div>

            {/* Incoming Message */}
            <div className="flex items-end">
              <Avatar
                alt="User Avatar"
                src="https://i.pravatar.cc/150?img=6"
                className="mr-2"
              />
              <div className="bg-blue-100 p-3 rounded-lg max-w-xs">
                <p className="text-sm">i don't remember anything 😂</p>
                <div className="flex items-center space-x-2 mt-1">
                  <span className="text-xs text-gray-500">18:16</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-red-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Message Input */}
        <div className="p-4 bg-white  border-t border-gray-200 relative">
          <div className="relative flex items-center space-x-2">
            <button
              className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M14.828 14L9 19.697a2 2 0 01-3.172 0L4 14m7 7h8m-1-1h-6"
                />
              </svg>
            </button>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1   p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <button
              className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition"
              onClick={handleSend}
            >
              <TelegramIcon />
            </button>
          </div>

          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="absolute bottom-14 left-0 right-0 z-10">
              <EmojiPicker onEmojiClick={handleEmojiClick} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}