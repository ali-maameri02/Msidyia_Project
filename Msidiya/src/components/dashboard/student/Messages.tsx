import React, { useState, useMemo } from "react";
import { useAuth } from "../../../hooks/useAuth";
import { useLatestMessagesQuery, useMessagesBetweenUsQuery, useSearchMessagesUsersQuery, useSendMessageMutatoin } from "../../../services/chat/chat.queries";
import { IExtendedMessage } from "../../../interfaces/IExtendedMessage";
import { IChatUser } from "../../../interfaces/IChatUser";
import { IUserWithChat } from "../../../interfaces/IUserWithChat";


export default function Messages() {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { user: currentUser, isLoading: isUserLoading } = useAuth();

  // Fetch latest messages (users with recent conversations) - now returns IUserWithChat[]
  const { data: latestChats = [], isLoading: latestChatsLoading } = useLatestMessagesQuery(currentUser)

  // Search users when search query exists
  const { data: searchResults = [], isLoading: searchLoading } = useSearchMessagesUsersQuery(searchQuery)

  // Fetch messages between current user and selected user
  const { data: rawMessages = [], isLoading: messagesLoading } = useMessagesBetweenUsQuery(selectedUserId, currentUser)

  const messages: IExtendedMessage[] = useMemo(() => {
    if (!currentUser) return [];
    return rawMessages.map(msg => ({
      ...msg,
      isOwn: msg.Sender === currentUser.id
    }));
  }, [rawMessages, currentUser]);


  const chatUsers: IChatUser[] = useMemo(() => {
    return latestChats.map((chat: IUserWithChat) => ({
      id: chat.user.id,
      username: chat.user.username,
      avatar: chat.user.Picture,
      lastMessage: chat.last_message,
      lastMessageTime: chat.last_message_time,
      displayName: chat.user.first_name && chat.user.last_name
        ? `${chat.user.first_name} ${chat.user.last_name}`
        : chat.user.username
    }));
  }, [latestChats]);

  // Transform search results to IChatUser format
  const searchChatUsers: IChatUser[] = useMemo(() => {
    return searchResults.map((result: IUserWithChat) => ({
      id: result.user.id,
      username: result.user.username,
      avatar: result.user.Picture,
      lastMessage: result.last_message,
      lastMessageTime: result.last_message_time,
      displayName: result.user.first_name && result.user.last_name
        ? `${result.user.first_name} ${result.user.last_name}`
        : result.user.username
    }));
  }, [searchResults]);

  // Determine which users to display
  const displayUsers = searchQuery.trim() ? searchChatUsers : chatUsers;
  const isLoadingUsers = searchQuery.trim() ? searchLoading : latestChatsLoading;

  // Get selected user info
  const selectedUser = displayUsers.find(user => user.id === selectedUserId);

  // Send message mutation with optimistic updates
  const sendMessageMutation = useSendMessageMutatoin(currentUser, selectedUser, selectedUserId)
  // Handle sending message
  const handleSend = () => {
    if (message.trim() && selectedUserId && currentUser) {
      sendMessageMutation.mutate({
        Receiver: selectedUserId,
        Content: message.trim()
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
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Format time helper
  const formatTime = (timeString: string) => {
    try {
      const date = new Date(timeString);
      return date.toLocaleTimeString('en-US', {
        hour12: true,
        hour: 'numeric',
        minute: '2-digit'
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
            <svg className="w-4 h-4 absolute left-2 top-3 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-2 text-gray-400 hover:text-gray-600"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Loading state */}
        {isLoadingUsers && (
          <div className="p-4 text-center text-gray-500">
            <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
            {searchQuery ? 'Searching users...' : 'Loading chats...'}
          </div>
        )}

        {/* Chat Items */}
        <div className="space-y-1">
          {displayUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedUserId(user.id)}
              className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors ${selectedUserId === user.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                }`}
            >
              <div className="relative">
                <img
                  alt="User Avatar"
                  src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName)}&background=3b82f6&color=fff`}
                  className="w-12 h-12 rounded-full mr-4 object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-gray-900 truncate">
                  {user.displayName}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.lastMessage || (searchQuery ? 'Start a conversation' : 'No messages yet')}
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
                : 'No conversations yet'
              }
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
      <div className="flex-1 flex flex-col bg-cover bg-center" style={{ backgroundImage: 'url("https://i.imgur.com/9ZvQzqf.png")' }}>
        {selectedUser ? (
          <>
            {/* Header */}
            <div className="flex items-center p-4 border-b border-gray-200 bg-white shadow-sm">
              <img
                alt="Chat User"
                src={selectedUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser.displayName)}&background=3b82f6&color=fff`}
                className="w-12 h-12 rounded-full mr-4 object-cover"
              />
              <div>
                <p className="font-semibold text-gray-900">{selectedUser.displayName}</p>
                <p className="text-xs text-gray-500">@{selectedUser.username}</p>
              </div>
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
                    <div key={`${msg.id}-${index}`} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'} items-end`}>
                      {!msg.isOwn && (
                        <img
                          alt="User Avatar"
                          src={selectedUser.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedUser.displayName)}&background=3b82f6&color=fff`}
                          className="w-8 h-8 rounded-full mr-2 object-cover"
                        />
                      )}
                      <div className={`p-3 rounded-lg max-w-xs break-words ${msg.isOwn
                        ? `bg-blue-500 text-white ${msg.isOptimistic ? 'opacity-70' : ''}`
                        : 'bg-gray-100 text-gray-900'
                        }`}>
                        <p className="text-sm">{msg.Content}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`text-xs ${msg.isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                            {formatTime(msg.Time)}
                          </span>
                          {msg.isOwn && (
                            <div className="flex space-x-1">
                              <svg className={`h-3 w-3 ${msg.isOptimistic ? 'text-blue-200' : 'text-blue-100'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {!msg.isOptimistic && (
                                <svg className="h-3 w-3 text-blue-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                      {msg.isOwn && (
                        <img
                          alt="Your Avatar"
                          src={currentUser.Picture || `https://ui-avatars.com/api/?name=${encodeURIComponent(currentUser.username)}&background=059669&color=fff`}
                          className="w-8 h-8 rounded-full ml-2 object-cover"
                        />
                      )}
                    </div>
                  ))}
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
                  disabled={sendMessageMutation.isPending}
                  className="flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500 disabled:opacity-50"
                />
                <button
                  className="p-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition disabled:opacity-50"
                  onClick={handleSend}
                  disabled={sendMessageMutation.isPending || !message.trim()}
                >
                  {sendMessageMutation.isPending ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Simple Emoji Picker */}
              {showEmojiPicker && (
                <div className="absolute bottom-16 left-4 bg-white border border-gray-200 rounded-lg p-4 shadow-lg z-10">
                  <div className="grid grid-cols-8 gap-2">
                    {['😀', '😂', '😍', '🥰', '😊', '😎', '🤔', '😮', '😢', '😡', '👍', '👎', '❤️', '🔥', '💯', '🎉'].map((emoji) => (
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
                {searchQuery ? 'Choose from search results' : 'Pick from your recent conversations'}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
