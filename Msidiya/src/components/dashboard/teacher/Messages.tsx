import React, { useState, useMemo, useEffect, useRef } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import {
  getLatestMessages,
  getMessagesBetweenus,
  sendMessageToUser,
  searchUsers,
} from "../../../services/chat.service";
import { useAuth } from "../../../hooks/useAuth";
import { queryClient } from "../../../main";
import { useGetUserByIdQuery } from "../../../services/chat/chat.queries";

// Interfaces
interface IMessage {
  id: number;
  Content: string;
  Sender: number;
  Receiver: number;
  sender_username: string;
  receiver_username: string;
  receiver_avatar: string | null;
  Time: string;
}

interface ICreateMessageDTO {
  Content: string;
  Receiver: number;
}

interface IExtendedMessage extends IMessage {
  isOwn?: boolean;
  isOptimistic?: boolean;
}

interface IUserWithChat {
  user: {
    id: number;
    username: string;
    email?: string;
    first_name?: string;
    last_name?: string;
    Picture: string | null;
    Phone_number?: string;
    Role?: string;
  };
  last_message: string | null;
  last_message_time: string | null;
}

interface IChatUser {
  id: number;
  username: string;
  avatar: string | null;
  lastMessage: string | null;
  lastMessageTime: string | null;
  displayName: string;
}

export default function Messages() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { user: currentUser, isLoading: isUserLoading } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Enhanced effect to handle URL parameter with better error handling
  useEffect(() => {
    const withUser =
      searchParams.get("with_user") || searchParams.get("chat_with");
    console.log("URL parameter value:", withUser);

    if (withUser) {
      const userId = parseInt(withUser, 10);
      console.log("Parsed user ID:", userId);

      if (!isNaN(userId) && userId > 0) {
        setSelectedUserId(userId);
        console.log("Selected user ID set to:", userId);

        // Clear search query when selecting from URL
        setSearchQuery("");
      } else {
        console.warn("Invalid user ID in URL parameter:", withUser);
        // Optionally remove invalid parameter
        const newSearchParams = new URLSearchParams(searchParams);
        newSearchParams.delete("with_user");
        newSearchParams.delete("chat_with");
        setSearchParams(newSearchParams, { replace: true });
      }
    }
  }, [searchParams, setSearchParams]);

  // Fetch latest messages (users with recent conversations)
  const { data: latestChats = [], isLoading: latestChatsLoading } = useQuery({
    queryKey: ["latestChats"],
    queryFn: getLatestMessages,
    refetchInterval: 3000,
    staleTime: 0,
    enabled: !!currentUser,
  });

  // Search users when search query exists
  const { data: searchResults = [], isLoading: searchLoading } = useQuery({
    queryKey: ["searchUsers", searchQuery],
    queryFn: () => searchUsers(searchQuery),
    enabled: !!searchQuery.trim() && searchQuery.length > 2,
    staleTime: 1000 * 30, // 30 seconds
  });

  // Fetch messages between current user and selected user
  const { data: rawMessages = [], isLoading: messagesLoading } = useQuery({
    queryKey: ["messages", selectedUserId],
    queryFn: () => getMessagesBetweenus(selectedUserId!),
    enabled: !!selectedUserId && !!currentUser,
    refetchInterval: 3000,
    staleTime: 0,
  });

  // Transform raw messages to include isOwn property
  const messages: IExtendedMessage[] = useMemo(() => {
    if (!currentUser) return [];
    return rawMessages.map((msg) => ({
      ...msg,
      isOwn: msg.Sender === currentUser.id,
    }));
  }, [rawMessages, currentUser]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // Fetch selected user's information if not in displayUsers
  const {
    data: selectedUserInfo,
    isLoading: selectedUserLoading,
    error: selectedUserError,
  } = useGetUserByIdQuery(selectedUserId);

  // Transform latest chats to IChatUser format
  const chatUsers: IChatUser[] = useMemo(() => {
    const users = latestChats.map((chat: IUserWithChat) => ({
      id: chat.user.id,
      username: chat.user.username,
      avatar: chat.user.Picture,
      lastMessage: chat.last_message,
      lastMessageTime: chat.last_message_time,
      displayName:
        chat.user.first_name && chat.user.last_name
          ? `${chat.user.first_name} ${chat.user.last_name}`
          : chat.user.username,
    }));

    // If we have selectedUserInfo and the user is not in the list, add them
    if (
      selectedUserInfo &&
      !users.some((u) => u.id === selectedUserInfo.user.id)
    ) {
      users.push({
        id: selectedUserInfo.user.id,
        username: selectedUserInfo.user.username,
        avatar: selectedUserInfo.user.Picture,
        lastMessage: selectedUserInfo.last_message || null,
        lastMessageTime: selectedUserInfo.last_message_time || null,
        displayName:
          selectedUserInfo.user.first_name && selectedUserInfo.user.last_name
            ? `${selectedUserInfo.user.first_name} ${selectedUserInfo.user.last_name}`
            : selectedUserInfo.user.username,
      });
    }

    return users;
  }, [latestChats, selectedUserInfo]);

  // Transform search results to IChatUser format
  const searchChatUsers: IChatUser[] = useMemo(() => {
    return searchResults.map((result: IUserWithChat) => ({
      id: result.user.id,
      username: result.user.username,
      avatar: result.user.Picture,
      lastMessage: result.last_message,
      lastMessageTime: result.last_message_time,
      displayName:
        result.user.first_name && result.user.last_name
          ? `${result.user.first_name} ${result.user.last_name}`
          : result.user.username,
    }));
  }, [searchResults]);

  // Determine which users to display
  const displayUsers = searchQuery.trim() ? searchChatUsers : chatUsers;
  const isLoadingUsers = searchQuery.trim()
    ? searchLoading
    : latestChatsLoading;

  // Get selected user info with enhanced logic
  const selectedUser = useMemo(() => {
    // First try to find the user in displayUsers
    const userFromList = displayUsers.find(
      (user) => user.id === selectedUserId
    );
    if (userFromList) return userFromList;

    // If not found in displayUsers but we have selectedUserInfo, use that
    if (selectedUserInfo?.user) {
      return {
        id: selectedUserInfo.user.id,
        username: selectedUserInfo.user.username,
        avatar: selectedUserInfo.user.Picture,
        lastMessage: selectedUserInfo.last_message || null,
        lastMessageTime: selectedUserInfo.last_message_time || null,
        displayName:
          selectedUserInfo.user.first_name && selectedUserInfo.user.last_name
            ? `${selectedUserInfo.user.first_name} ${selectedUserInfo.user.last_name}`
            : selectedUserInfo.user.username,
      };
    }

    return null;
  }, [displayUsers, selectedUserId, selectedUserInfo]);

  // Enhanced send message mutation with better error handling
  const sendMessageMutation = useMutation({
    mutationFn: (data: ICreateMessageDTO) => sendMessageToUser(data),
    onMutate: async ({ Receiver, Content }) => {
      if (!currentUser) return;

      await queryClient.cancelQueries({ queryKey: ["messages", Receiver] });
      const previousMessages = queryClient.getQueryData(["messages", Receiver]);

      const optimisticMessage: IExtendedMessage = {
        id: Math.random() * 1000,
        sender_username: currentUser.username,
        receiver_username: selectedUser?.username || "",
        receiver_avatar: selectedUser?.avatar || null,
        Sender: currentUser.id,
        Receiver,
        Content,
        Time: new Date().toISOString(),
        isOwn: true,
        isOptimistic: true,
      };

      queryClient.setQueryData(
        ["messages", Receiver],
        (old: IMessage[] = []) => [...old, optimisticMessage]
      );

      return { previousMessages };
    },
    onError: (err, variables, context) => {
      console.error("Failed to send message:", err);
      if (context?.previousMessages) {
        queryClient.setQueryData(
          ["messages", variables.Receiver],
          context.previousMessages
        );
      }
      // You could show a toast notification here
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["messages", selectedUserId] });
      queryClient.invalidateQueries({ queryKey: ["latestChats"] });
    },
  });

  // Enhanced user selection handler
  const handleUserSelect = (userId: number) => {
    setSelectedUserId(userId);
    setSearchQuery(""); // Clear search when selecting a user

    // Update URL to reflect the selected user
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("with_user", userId.toString());
    setSearchParams(newSearchParams, { replace: true });
  };

  // Handle sending message
  const handleSend = () => {
    if (message.trim() && selectedUserId && currentUser) {
      sendMessageMutation.mutate({
        Receiver: selectedUserId,
        Content: message.trim(),
      });
      setMessage("");
    }
  };

  // Handle emoji selection
  const handleEmojiClick = (emojiData: { emoji: string }) => {
    setMessage((prevMessage) => prevMessage + emojiData.emoji);
  };

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Format time helper
  const formatTime = (timeString: string) => {
    try {
      const date = new Date(timeString);
      return date.toLocaleTimeString("en-US", {
        hour12: true,
        hour: "numeric",
        minute: "2-digit",
      });
    } catch {
      return timeString;
    }
  };

  // Show loading state if user is loading
  if (isUserLoading) {
    return (
      <div className="flex h-screen mt-16 px-10 items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-500">Loading...</p>
        </div>
      </div>
    );
  }

  // Show error if no current user
  if (!currentUser) {
    return (
      <div className="flex h-screen mt-16 px-10 items-center justify-center">
        <div className="text-center text-red-500">
          <p>Please log in to access messages</p>
        </div>
      </div>
    );
  }

  return (
    <main className="flex h-screen mt-16 px-10">
      {/* Sidebar: Chat List */}
      <div className="w-1/3 ml-5 bg-white border-r border-gray-200 overflow-y-auto">
        {/* Search Input */}
        <div className="p-4 flex items-center space-x-2 border-b border-gray-100">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 pl-8 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
            />
            <svg
              className="w-4 h-4 absolute left-2 top-3 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Loading state */}
        {isLoadingUsers && (
          <div className="p-4 text-center text-gray-500">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            {searchQuery ? "Searching users..." : "Loading chats..."}
          </div>
        )}

        {/* Chat Items */}
        <div className="space-y-1">
          {displayUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => handleUserSelect(user.id)}
              className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                selectedUserId === user.id
                  ? "bg-blue-50 border-r-4 border-blue-500"
                  : ""
              }`}
            >
              <div className="relative">
                <img
                  alt="User Avatar"
                  src={
                    user.avatar ||
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.displayName
                    )}&background=3b82f6&color=fff`
                  }
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-900 truncate">
                  {user.displayName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.lastMessage ||
                    (searchQuery ? "Start a conversation" : "No messages yet")}
                </p>
              </div>
              <div className="flex flex-col items-end space-y-1">
                {user.lastMessageTime && (
                  <p className="text-xs text-gray-400">
                    {formatTime(user.lastMessageTime)}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {!isLoadingUsers && displayUsers.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            <div className="text-4xl mb-2">💬</div>
            <p className="text-sm">
              {searchQuery
                ? `No users found for "${searchQuery}"`
                : "No conversations yet"}
            </p>
            {!searchQuery && (
              <p className="text-xs text-gray-400 mt-1">
                Search for users to start chatting
              </p>
            )}
          </div>
        )}
      </div>

      {/* Main Chat Area */}
      <div
        className="flex-1 flex flex-col bg-cover bg-center"
        style={{ backgroundImage: 'url("https://i.imgur.com/9ZvQzqf.png")' }}
      >
        {selectedUser ? (
          <>
            {/* Header with loading state for user info */}
            <div className="flex items-center p-4 border-b border-gray-200 bg-white shadow-sm">
              {selectedUserLoading ? (
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-200 rounded-full mr-4 animate-pulse"></div>
                  <div>
                    <div className="w-24 h-4 bg-gray-200 rounded animate-pulse mb-1"></div>
                    <div className="w-16 h-3 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </div>
              ) : selectedUserError ? (
                <div className="flex items-center text-red-500">
                  <div className="w-12 h-12 bg-red-100 rounded-full mr-4 flex items-center justify-center">
                    <span className="text-red-500">!</span>
                  </div>
                  <div>
                    <p className="font-semibold">User not found</p>
                    <p className="text-xs">Failed to load user information</p>
                  </div>
                </div>
              ) : (
                <>
                  <img
                    alt="Chat User"
                    src={
                      selectedUser.avatar ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        selectedUser.displayName
                      )}&background=3b82f6&color=fff`
                    }
                    className="w-12 h-12 rounded-full mr-4 object-cover"
                  />
                  <div>
                    <p className="font-semibold text-gray-900">
                      {selectedUser.displayName}
                    </p>
                    <p className="text-xs text-gray-500">
                      @{selectedUser.username}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-white bg-opacity-95">
              {messagesLoading && messages.length === 0 ? (
                <div className="flex justify-center items-center h-full">
                  <div className="text-center text-gray-500">
                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
                    Loading messages...
                  </div>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex justify-center items-center h-full">
                  <div className="text-center text-gray-500">
                    <div className="text-4xl mb-2">👋</div>
                    <p>No messages yet. Start the conversation!</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg, index) => (
                    <div
                      key={`${msg.id}-${index}`}
                      className={`flex ${
                        msg.isOwn ? "justify-end" : "justify-start"
                      } items-end`}
                    >
                      {!msg.isOwn && (
                        <img
                          alt="User Avatar"
                          src={
                            selectedUser.avatar ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              selectedUser.displayName
                            )}&background=3b82f6&color=fff`
                          }
                          className="w-8 h-8 rounded-full mr-2 object-cover"
                        />
                      )}
                      <div
                        className={`p-3 rounded-lg max-w-xs break-words ${
                          msg.isOwn
                            ? `bg-blue-500 text-white ${
                                msg.isOptimistic ? "opacity-70" : ""
                              }`
                            : "bg-gray-100 text-gray-900"
                        }`}
                      >
                        <p className="text-sm">{msg.Content}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span
                            className={`text-xs ${
                              msg.isOwn ? "text-blue-100" : "text-gray-500"
                            }`}
                          >
                            {formatTime(msg.Time)}
                          </span>
                          {msg.isOwn && (
                            <div className="flex space-x-1">
                              <svg
                                className={`h-3 w-3 ${
                                  msg.isOptimistic
                                    ? "text-blue-200"
                                    : "text-blue-100"
                                }`}
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                              {!msg.isOptimistic && (
                                <svg
                                  className="h-3 w-3 text-blue-100"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke="currentColor"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M5 13l4 4L19 7"
                                  />
                                </svg>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      {msg.isOwn && (
                        <img
                          alt="Your Avatar"
                          src={
                            currentUser.Picture ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              currentUser.username
                            )}&background=059669&color=fff`
                          }
                          className="w-8 h-8 rounded-full ml-2 object-cover"
                        />
                      )}
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              )}
            </div>

            {/* Message Input */}
            <div className="p-4 bg-white border-t border-gray-200 relative">
              <div className="relative flex items-center space-x-2">
                <button
                  className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                  😊
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Type a message..."
                  disabled={
                    sendMessageMutation.isPending || !!selectedUserError
                  }
                  className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 disabled:opacity-50"
                />
                <button
                  className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition disabled:opacity-50"
                  onClick={handleSend}
                  disabled={
                    sendMessageMutation.isPending ||
                    !message.trim() ||
                    !!selectedUserError
                  }
                >
                  {sendMessageMutation.isPending ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  )}
                </button>
              </div>

              {/* Simple Emoji Picker */}
              {showEmojiPicker && (
                <div className="absolute bottom-16 left-4 bg-white border border-gray-200 rounded-lg p-4 shadow-lg z-10">
                  <div className="grid grid-cols-8 gap-2">
                    {[
                      "😀",
                      "😂",
                      "😍",
                      "🥰",
                      "😊",
                      "😎",
                      "🤔",
                      "😮",
                      "😢",
                      "😡",
                      "👍",
                      "👎",
                      "❤️",
                      "🔥",
                      "💯",
                      "🎉",
                    ].map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => {
                          handleEmojiClick({ emoji });
                          setShowEmojiPicker(false);
                        }}
                        className="p-2 hover:bg-gray-100 rounded text-lg transition"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-white bg-opacity-95">
            <div className="text-center text-gray-500">
              <div className="text-6xl mb-4">💬</div>
              <p className="text-xl mb-2">Select a user to start messaging</p>
              <p className="text-sm text-gray-400">
                {searchQuery
                  ? "Choose from search results"
                  : "Pick from your recent conversations or search for users"}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
