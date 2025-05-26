import React, { useState, useMemo, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getLatestMessages, getMessagesBetweenus, sendMessageToUser, IMessage } from '../../../services/chat.service'; // Update this import path

// Interface for your API
interface ICreateMessageDTO {
  Content: string;
  Receiver: number;
}

// Extended message interface for UI state
interface IExtendedMessage extends IMessage {
  isOwn?: boolean;
  isOptimistic?: boolean;
}

interface IUser {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  lastSeen: string;
  unreadCount: number;
}

// Mock function for users - replace with your actual user fetching service
const fetchUsers = async (): Promise<IUser[]> => {
  // This should be replaced with your actual user fetching API call
  await new Promise(resolve => setTimeout(resolve, 300));

  return [
    {
      id: 1,
      name: "Alice Johnson",
      avatar: "https://i.pravatar.cc/150?img=1",
      lastMessage: "Hi, how are you? I wish you all the best!",
      time: "18:30",
      lastSeen: "2 hours ago",
      unreadCount: 1
    },
    {
      id: 2,
      name: "Bob Smith",
      avatar: "https://i.pravatar.cc/150?img=2",
      lastMessage: "i don't remember anything 😂",
      time: "18:16",
      lastSeen: "30 minutes ago",
      unreadCount: 2
    },
    {
      id: 3,
      name: "Carol Davis",
      avatar: "https://i.pravatar.cc/150?img=3",
      lastMessage: "See you tomorrow!",
      time: "17:45",
      lastSeen: "1 hour ago",
      unreadCount: 0
    }
  ];
};

export default function Messages() {
  const [message, setMessage] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentUserId, setCurrentUserId] = useState<number>(1); // You should get this from your auth context

  const queryClient = useQueryClient();

  // Fetch users with 3-second refetch interval
  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    refetchInterval: 3000, // 3 seconds
    staleTime: 0,
  });

  // Fetch latest messages (for sidebar preview)
  const { data: latestMessages = [], isLoading: latestMessagesLoading } = useQuery({
    queryKey: ['latestMessages'],
    queryFn: getLatestMessages,
    refetchInterval: 3000 * 20, // 3 seconds for live updates
    staleTime: 0,
  });

  // Fetch messages between current user and selected user
  const { data: rawMessages = [], isLoading: messagesLoading } = useQuery({
    queryKey: ['messages', selectedUserId],
    queryFn: () => getMessagesBetweenus(selectedUserId!),
    enabled: !!selectedUserId,
    refetchInterval: 3000, // 3 seconds for live updates
    staleTime: 0,
  });
  console.log("raw messages ======== ", rawMessages)

  // Transform messages to include isOwn property
  const messages: IExtendedMessage[] = useMemo(() => {
    return rawMessages.map(msg => ({
      ...msg,
      isOwn: msg.Sender === currentUserId
    }));
  }, [rawMessages, currentUserId]);
  console.log("the messages =======", messages)

  useEffect(() => {
    if (latestMessages && latestMessages.length > 0)
      setCurrentUserId(latestMessages[0].Sender)

  }, [latestMessages])


  // Send message mutation with optimistic updates
  const sendMessageMutation = useMutation({
    mutationFn: (data: ICreateMessageDTO) => sendMessageToUser(data),
    onMutate: async ({ Receiver, Content }) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['messages', Receiver] });

      // Snapshot previous value
      const previousMessages = queryClient.getQueryData(['messages', Receiver]);

      // Optimistically update
      const optimisticMessage: IExtendedMessage = {
        id: Math.random() * 1000,
        sender_username: "You", // You should get this from your auth context
        receiver_username: selectedUser?.name || "",
        receiver_avatar: selectedUser?.avatar || null,
        Sender: currentUserId,
        Receiver,
        Content,
        Time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
        isOptimistic: true
      };

      queryClient.setQueryData(['messages', Receiver], (old: IMessage[] = []) => [
        ...old,
        optimisticMessage
      ]);

      return { previousMessages };
    },
    onError: (err, variables, context) => {
      // Rollback on error
      if (context?.previousMessages) {
        queryClient.setQueryData(['messages', variables.Receiver], context.previousMessages);
      }
    },
    onSettled: () => {
      // Always refetch after error or success
      queryClient.invalidateQueries({ queryKey: ['messages', selectedUserId] });
      queryClient.invalidateQueries({ queryKey: ['latestMessages'] });
    },
  });

  // Filter users based on search query

  // Get selected user info
  const selectedUser = latestMessages.find(msg => msg.Receiver === selectedUserId);

  // Handle sending the message
  const handleSend = () => {
    if (message.trim() && selectedUserId) {
      sendMessageMutation.mutate({
        Receiver: selectedUserId,
        Content: message.trim()
      });
      setMessage(""); // Clear the input field
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
        {latestMessagesLoading && (
          <div className="p-4 text-center text-gray-500">Loading users...</div>
        )}

        {/* Chat Items */}
        <div className="space-y-2">
          {latestMessages.map((msg) => (
            <div
              key={msg.id}
              onClick={() => setSelectedUserId(msg.Receiver)}
              className={`flex items-center p-4 hover:bg-gray-50 cursor-pointer transition-colors ${selectedUserId === msg.Sender ? 'bg-blue-50 border-r-4 border-blue-500' : ''
                }`}
            >
              <img
                alt="User Avatar"
                src={msg.receiver_avatar ?? ""}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div className="flex-1">
                <p className="font-bold text-sm">{msg.receiver_username}</p>
                <p className="text-xs text-gray-500 truncate">
                  {msg.Content}
                </p>
              </div>
              <div className="flex flex-col items-end space-y-1">
                <p className="text-xs text-gray-500">{msg.Time}</p>
              </div>
            </div>
          ))}
        </div>

        {/* No results */}
        {!latestMessagesLoading && latestMessages && latestMessages.length === 0 && (
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
                  {messages.map((msg, index) => (
                    <div key={`${msg.Sender}-${msg.Receiver}-${index}`} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'} items-end`}>
                      {!msg.isOwn && (
                        <img
                          alt="User Avatar"
                          src={msg.receiver_avatar || selectedUser?.avatar || "https://i.pravatar.cc/150?img=1"}
                          className="w-8 h-8 rounded-full mr-2"
                        />
                      )}
                      <div className={`p-3 rounded-lg max-w-xs ${msg.isOwn
                        ? `bg-blue-500 text-white ${msg.isOptimistic ? 'opacity-70' : ''}`
                        : 'bg-gray-100'
                        }`}>
                        <p className="text-sm">{msg.Content}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className={`text-xs ${msg.isOwn ? 'text-blue-100' : 'text-gray-500'}`}>
                            {msg.Time}
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
