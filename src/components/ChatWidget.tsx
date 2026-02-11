import { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Edit2, Check, Users } from 'lucide-react';
import { io, Socket } from 'socket.io-client';
import './ChatWidget.css';

interface Message {
  id: number;
  username: string;
  userId: string;
  message: string;
  timestamp: string;
}

interface ChatWidgetProps {
  defaultUsername?: string;
}

const ChatWidget = ({ defaultUsername = 'Guest' }: ChatWidgetProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [username, setUsername] = useState(defaultUsername);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [tempUsername, setTempUsername] = useState(username);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [typingUsers, setTypingUsers] = useState<string[]>([]);
  const [activeUsers, setActiveUsers] = useState<string[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const typingTimeoutRef = useRef<NodeJS.Timeout>();

  // Initialize socket connection
  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setIsConnected(true);
      newSocket.emit('user_join', username);
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
    });

    newSocket.on('chat_history', (history: Message[]) => {
      setMessages(history);
    });

    newSocket.on('receive_message', (message: Message) => {
      setMessages((prev) => [...prev, message]);
      
      // Increment unread count if chat is closed
      if (!isOpen) {
        setUnreadCount((prev) => prev + 1);
      }
    });

    newSocket.on('user_joined', (data: { username: string }) => {
      const systemMessage: Message = {
        id: Date.now(),
        username: 'System',
        userId: 'system',
        message: `${data.username} joined the chat`,
        timestamp: new Date().toISOString()
      };
      setMessages((prev) => [...prev, systemMessage]);
    });

    newSocket.on('user_left', (data: { username: string }) => {
      const systemMessage: Message = {
        id: Date.now(),
        username: 'System',
        userId: 'system',
        message: `${data.username} left the chat`,
        timestamp: new Date().toISOString()
      };
      setMessages((prev) => [...prev, systemMessage]);
    });

    newSocket.on('username_changed', (data: { oldUsername: string; newUsername: string }) => {
      const systemMessage: Message = {
        id: Date.now(),
        username: 'System',
        userId: 'system',
        message: `${data.oldUsername} is now ${data.newUsername}`,
        timestamp: new Date().toISOString()
      };
      setMessages((prev) => [...prev, systemMessage]);
    });

    newSocket.on('user_typing', (data: { username: string; isTyping: boolean }) => {
      if (data.isTyping) {
        setTypingUsers((prev) => [...new Set([...prev, data.username])]);
      } else {
        setTypingUsers((prev) => prev.filter((u) => u !== data.username));
      }
    });

    newSocket.on('active_users', (users: string[]) => {
      setActiveUsers(users);
    });

    return () => {
      newSocket.close();
    };
  }, [username]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Reset unread count when opening chat
  useEffect(() => {
    if (isOpen) {
      setUnreadCount(0);
    }
  }, [isOpen]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputMessage.trim() && socket && isConnected) {
      socket.emit('send_message', { message: inputMessage });
      setInputMessage('');
      
      // Stop typing indicator
      socket.emit('typing', false);
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
    
    // Emit typing indicator
    if (socket && isConnected) {
      socket.emit('typing', true);
      
      // Clear typing after 2 seconds of no input
      if (typingTimeoutRef.current) {
        clearTimeout(typingTimeoutRef.current);
      }
      
      typingTimeoutRef.current = setTimeout(() => {
        socket.emit('typing', false);
      }, 2000);
    }
  };

  const handleUsernameEdit = () => {
    setTempUsername(username);
    setIsEditingUsername(true);
  };

  const handleUsernameSave = () => {
    if (tempUsername.trim() && tempUsername !== username) {
      setUsername(tempUsername);
      if (socket && isConnected) {
        socket.emit('username_change', tempUsername);
      }
    }
    setIsEditingUsername(false);
  };

  const handleUsernameCancel = () => {
    setTempUsername(username);
    setIsEditingUsername(false);
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  return (
    <>
      {/* Floating Chat Button */}
      <button
        className={`chat-widget-button ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <X size={24} />
        ) : (
          <>
            <MessageCircle size={24} />
            {unreadCount > 0 && (
              <span className="unread-badge">{unreadCount > 99 ? '99+' : unreadCount}</span>
            )}
          </>
        )}
      </button>

      {/* Chat Window */}
      <div className={`chat-widget-window ${isOpen ? 'open' : ''}`}>
        {/* Header */}
        <div className="chat-widget-header">
          <div className="header-left">
            <MessageCircle size={20} />
            <div>
              <h3>Live Chat</h3>
              <span className={`status ${isConnected ? 'connected' : 'disconnected'}`}>
                {isConnected ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>
          <div className="header-right">
            <div className="active-users-count" title={`Active users: ${activeUsers.join(', ')}`}>
              <Users size={16} />
              <span>{activeUsers.length}</span>
            </div>
          </div>
        </div>

        {/* Username Section */}
        <div className="chat-username-section">
          {isEditingUsername ? (
            <div className="username-edit">
              <input
                type="text"
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleUsernameSave();
                  if (e.key === 'Escape') handleUsernameCancel();
                }}
                maxLength={20}
                autoFocus
              />
              <button onClick={handleUsernameSave} className="save-btn">
                <Check size={16} />
              </button>
              <button onClick={handleUsernameCancel} className="cancel-btn">
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="username-display">
              <span className="username-label">Chatting as:</span>
              <span className="username-value">{username}</span>
              <button onClick={handleUsernameEdit} className="edit-btn">
                <Edit2 size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Messages */}
        <div className="chat-messages">
          {messages.length === 0 ? (
            <div className="empty-state">
              <MessageCircle size={48} />
              <p>No messages yet</p>
              <p className="empty-subtitle">Start the conversation!</p>
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`message ${
                  msg.userId === socket?.id ? 'own-message' : ''
                } ${msg.username === 'System' ? 'system-message' : ''}`}
              >
                {msg.username !== 'System' && (
                  <div className="message-header">
                    <span className="message-username">{msg.username}</span>
                    <span className="message-time">{formatTime(msg.timestamp)}</span>
                  </div>
                )}
                <div className="message-content">{msg.message}</div>
              </div>
            ))
          )}
          
          {/* Typing Indicator */}
          {typingUsers.length > 0 && (
            <div className="typing-indicator">
              <div className="typing-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <span className="typing-text">
                {typingUsers.length === 1
                  ? `${typingUsers[0]} is typing...`
                  : `${typingUsers.length} people are typing...`}
              </span>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form className="chat-input-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            value={inputMessage}
            onChange={handleInputChange}
            placeholder="Type a message..."
            disabled={!isConnected}
            maxLength={500}
          />
          <button 
            type="submit" 
            disabled={!inputMessage.trim() || !isConnected}
            className="send-button"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </>
  );
};

export default ChatWidget;