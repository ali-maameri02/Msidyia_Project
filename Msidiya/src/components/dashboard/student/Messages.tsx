import React, { useState, useMemo } from "react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Mock API functions - replace these with your actual API calls
const fetchUsers = async () => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 500));
  return [
    { id: 1, name: "Dr. Hello", avatar: "https://i.pravatar.cc/150?img=1", lastMessage: "Hi, how are you? I wish you...", time: "18:30", unreadCount: 2, lastSeen: "5 mins ago" },
    { id: 2, name: "David Moore", avatar: "https://i.pravatar.cc/150?img=6", lastMessage: "OMG 😂 do you remember what you did...", time: "18:16", unreadCount: 0, lastSeen: "2 mins ago" },
    { id: 3, name: "Sarah Wilson", avatar: "https://i.pravatar.cc/150?img=3", lastMessage: "See you tomorrow!", time: "17:45", unreadCount: 1, lastSeen: "10 mins ago" },
    { id: 4, name: "Mike Johnson", avatar: "https://i.pravatar.cc/150?img=4", lastMessage: "Thanks for the help", time: "16:20", unreadCount: 0, lastSeen: "1 hour ago" },
    { id: 5, name: "Emma Davis", avatar: "https://i.pravatar.cc/150?img=5", lastMessage: "Let's meet for coffee", time: "15:30", unreadCount: 3, lastSeen: "30 mins ago" },
  ];
};

const fetchMessages = async (userId) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 300));

  const mockMessages = {
    2: [
      { id: 1, senderId: 2, receiverId: 'currentUser', content: "OMG 😂 do you remember what you did last night at the work night out?", timestamp: "18:12", isOwn: false },
      { id: 2, senderId: 'currentUser', receiverId: 2, content: "no haha 😂", timestamp: "18:16", isOwn: true },
      { id: 3, senderId: 2, receiverId: 'currentUser', content: "i don't remember anything 😂", timestamp: "18:16", isOwn: false },
    ],
    1: [
      { id: 4, senderId: 1, receiverId: 'currentUser', content: "Hi, how are you? I wish you all the best!", timestamp: "18:30", isOwn: false },
    ],
    3: [
      { id: 5, senderId: 3, receiverId: 'currentUser', content: "See you tomorrow!", timestamp: "17:45", isOwn: false },
    ]
  };

  return mockMessages[userId] || [];
};

const sendMessage = async ({ receiverId, content }) => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 200));

  const newMessage = {
    id: Date.now(),
    senderId: 'currentUser',
    receiverId,
    content,
    timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
    isOwn: true
  };

  return newMessage;
};

export default function Messages() {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(2);
  const [searchQuery, setSearchQuery] = useState("");

  const queryClient = useQueryClient();

  // Fetch users with 3-second refetch interval
  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    refetchInterval: 3000, // 3 seconds
    staleTime: 0,
  });

  // Fetch messages for selected user
  const { data: messages = [], isLoading: messagesLoading } = useQuery({
    queryKey: ['messages', selectedUserId],
    queryFn: () => fetchMessages(selectedUserId),
    enabled: !!selectedUserId,
    refetchInterval: 3000, // 3 seconds for live updates
    staleTime: 0,
  });

  // Send message mutation with optimistic updates
  const sendMessageMutation = useMutation({
    mutationFn: sendMessage,
    onMutate: async ({ receiverId, content }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['messages', receiverId] });

      // Snapshot previous value
      const previousMessages = queryClient.getQueryData(['messages', receiverId]);

      // Optimistically update
      const optimisticMessage = {
        id: Date.now(),
        senderId: 'currentUser',
        receiverId,
        content,
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
        isOptimistic: true
      };

      queryClient.setQueryData(['messages', receiverId], old => [
        ...(old || []),
        optimisticMessage
      ]);

      return { previousMessages };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousMessages) {
        queryClient.setQueryData(['messages', variables.receiverId], context.previousMessages);
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['messages', selectedUserId] });
    },
  });

  // Filter users based on search query
  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;
    return users.filter(user =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [users, searchQuery]);

  // Get selected user info
  const selectedUser = users.find(user => user.id === selectedUserId);

  // Handle sending the message
  const handleSend = () => {
    if (message.trim() && selectedUserId) {
      sendMessageMutation.mutate({
        receiverId: selectedUserId,
        content: message.trim()
      });
      setMessage(""); // Clear the input field
    }
  };

  // Handle emoji selection
  const handleEmojiClick = (emojiData) => {
    setMessage((prevMessage) => prevMessage + emojiData.emoji);
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <main className="flex h-screen mt-16 px-10">
      {/* Sidebar: Chat List */}
      <div className="w-1/3 ml-5 bg-white border-r border-gray-200 overflow-y-auto">
        <div className="p-4 flex items-center space-x-2">
          <input
            type="text"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Loading state */}
        {usersLoading && (
          <div className="p-4 text-center text-gray-500">Loading users...</div>
        )}

        {/* Chat Items */}
        <div className="space-y-2">
          {filteredUsers.map((user) => (
            <div
              key={user.id}
              onClick={() => setSelectedUserId(user.id)}
              className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors ${selectedUserId === user.id ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                }`}
            >
              <img
                alt="User Avatar"
                src={user.avatar}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div className="flex-1">
                <p className="font-bold text-sm">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">
                  {user.lastMessage}
                </p>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <p className="text-xs text-gray-500">{user.time}</p>
                {user.unreadCount > 0 && (
                  <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
                    {user.unreadCount}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {!usersLoading && filteredUsers.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            {searchQuery ? 'No users found' : 'No users available'}
          </div>
        )}
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-cover bg-center" style={{ backgroundImage: 'url("https://i.imgur.com/9ZvQzqf.png")' }}>
        {selectedUser ? (
          <>
            {/* Header */}
            <div className="flex items-center p-4 border-b border-gray-200 bg-white">
              <img
                alt="Chat User"
                src={selectedUser.avatar}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="font-bold">{selectedUser.name}</p>
                <p className="text-xs text-gray-500">Last seen {selectedUser.lastSeen}</p>
              </div>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-white">
              {messagesLoading && messages.length === 0 ? (
                <div className="flex justify-center items-center h-full">
                  <div className="text-gray-500">Loading messages...</div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'} items-end`}>
                      {!msg.isOwn && (
                        <img
                          alt="User Avatar"
                          src={selectedUser.avatar}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                      )}
                      <div className={`p-3 rounded-lg max-w-xs ${msg.isOwn
                        ? `bg-blue-500 text-white ${msg.isOptimistic ? 'opacity-70' : ''}`
                        : 'bg-gray-100'
                        }`}>
                        <p className="text-sm">{msg.content}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`text-xs ${msg.isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                            {msg.timestamp}
                          </span>
                          {msg.isOwn && (
                            <div className="flex space-x-1">
                              <svg className={`h-4 w-4 ${msg.isOptimistic ? 'text-blue-200' : 'text-blue-100'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              {!msg.isOptimistic && (
                                <svg className="h-4 w-4 text-blue-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
                          src="https://i.pravatar.cc/150?img=7"
                          className="w-8 h-8 rounded-full ml-2"
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
                  className="p-3 bg-gray-200 rounded-full hover:bg-gray-300 transition"
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
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Simple Emoji Picker */}
              {showEmojiPicker && (
                <div className="absolute bottom-14 left-0 bg-white border border-gray-200 rounded-lg p-4 shadow-lg z-10">
                  <div className="grid grid-cols-8 gap-2">
                    {['😀', '😂', '😍', '🥰', '😊', '😎', '🤔', '😮', '😢', '😡', '👍', '👎', '❤️', '🔥', '💯', '🎉'].map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => handleEmojiClick({ emoji })}
                        className="p-2 hover:bg-gray-100 rounded text-xl"
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
          <div className="flex-1 flex items-center justify-center bg-white">
            <div className="text-center text-gray-500">
              <div className="text-6xl mb-4">💬</div>
              <p className="text-xl">Select a user to start messaging</p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
