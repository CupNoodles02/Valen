import { useState, FormEvent } from 'react';
import { Lock, Unlock, Sparkles } from 'lucide-react';

interface LockScreenProps {
  onUnlock: () => void;
}

const LockScreen = ({ onUnlock }: LockScreenProps) => {
  const [name, setName] = useState('');
  const [shake, setShake] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (name.trim().toLowerCase() === 'ruth') {
      onUnlock();
    } else {
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setName('');
    }
  };

  return (
    <div className="lock-screen">
      <div className={`lock-container ${shake ? 'shake' : ''}`}>
        <div className="lock-icon-wrapper">
          <Lock className="lock-icon" size={90} strokeWidth={1.5} />
          <div className="lock-glow"></div>
        </div>

        <h1 className="lock-title">
          <Sparkles className="sparkle-icon" size={28} />
          Sealed with Love rawr
          <Sparkles className="sparkle-icon" size={28} />
        </h1>

        <p className="lock-subtitle">💖 Enter the magic key to unlock your surprise 💖</p>

        <form onSubmit={handleSubmit} className="unlock-form">
          <div className="input-wrapper">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Who are you :)"
              className="name-input"
              autoFocus
            />
            <div className="input-underline"></div>
          </div>

          <button type="submit" className="unlock-button">
            <Unlock size={20} />
            <span>Unlock My Heart</span>
          </button>
        </form>

        ✨ Hint: My super cute cuuute baby ✨
      </div>
    </div>
  );
};

export default LockScreen;