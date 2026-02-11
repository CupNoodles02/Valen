import { useState } from 'react';
import LockScreen from './components/LockScreen';
import InvitationScreen from './components/InvitationScreen';
import FloatingHearts from './components/FloatingHearts';
import ChatWidget from './components/ChatWidget';
import './styles/App.css';

function App() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const handleUnlock = () => {
    setIsUnlocked(true);
    setTimeout(() => setShowContent(true), 600);
  };

  return (
    <div className="valentine-container">
      <FloatingHearts />
      <div className="sparkles">✨</div>
      <div className="sparkles">💖</div>
      <div className="sparkles">🌸</div>
      
      <div className="content-wrapper">
        {!isUnlocked ? (
          <LockScreen onUnlock={handleUnlock} />
        ) : (
          <InvitationScreen show={showContent} />
        )}
      </div>

      {/* Chat Widget - Available throughout the app */}
      <ChatWidget defaultUsername="Guest" />
    </div>
  );
}

export default App;