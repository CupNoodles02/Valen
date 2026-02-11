import { useState } from 'react';
import { Heart } from 'lucide-react';

interface InvitationScreenProps {
  show: boolean;
}

const InvitationScreen = ({ show }: InvitationScreenProps) => {
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 0 });
  const [noButtonSize, setNoButtonSize] = useState(1);
  const [yesButtonSize, setYesButtonSize] = useState(1);
  const [noClickCount, setNoClickCount] = useState(0);
  const [accepted, setAccepted] = useState(false);

  const handleNoClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Increase yes button size (no limit!)
    setYesButtonSize((prev) => prev + 0.2);
    // Decrease no button size
    setNoButtonSize((prev) => Math.max(prev - 0.15, 0.3)); // Minimum size of 0.3
    setNoClickCount((prev) => prev + 1);

    // Get the button container dimensions
    const container = e.currentTarget.parentElement;
    if (container) {
      const containerRect = container.getBoundingClientRect();
      const buttonWidth = 100; // Approximate button width
      const buttonHeight = 50; // Approximate button height

      // Move No button to random position within the container
      const maxX = containerRect.width - buttonWidth;
      const maxY = containerRect.height - buttonHeight;
      const randomX = Math.random() * maxX;
      const randomY = Math.random() * maxY;

      setNoButtonPosition({ top: randomY, left: randomX });
    }
  };

  const handleYesClick = () => {
    setAccepted(true);
  };

  if (accepted) {
    return (
      <div className={`invitation-screen ${show ? 'show' : ''}`}>
        <div className="invitation-content accepted-animation">
          <div className="celebration-hearts">
            {[...Array(25)].map((_, i) => (
              <div
                key={i}
                className="celebration-heart"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  fontSize: `${20 + Math.random() * 35}px`,
                }}
              >
                {['💕', '💖', '💗', '💓', '🌸'][i % 5]}
              </div>
            ))}
          </div>

          <div className="rose-decoration">🌹</div>

          <h1 className="invitation-title celebration-title">
            Yeheeey! U said YES baby! 🎉
          </h1>

          <div className="to-from">
            <p className="to-text">
              To my dearest <span className="name-highlight">Ruth</span>
            </p>
          </div>

          <div className="message-box compact">
            <p className="message celebration-message">
              Awwwwwww, Salamat looove loove kooo! 💖
            </p>

            <p className="message">
              Thank you sa palaging pag accept baby, Valentine's Day looove!
            </p>

            <div className="details">
              <div className="detail-item">
                <span className="detail-label">When:</span>
                <span className="detail-value">February 14th, 2026</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Time:</span>
                <span className="detail-value">10:00 AM</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Place:</span>
                <span className="detail-value">Anywhere u want baby</span>
              </div>
            </div>

            <p className="closing">Can't wait to spend this special day with you, baby! 💕</p>
          </div>

          <div className="signature">
            With all my love,
            <div className="signature-line">Your Valentine 💓</div>
          </div>

          <div className="hearts-decoration">
            <Heart fill="#ff69b4" color="#ff69b4" size={16} />
            <Heart fill="#ff85c1" color="#ff85c1" size={20} />
            <Heart fill="#ff69b4" color="#ff69b4" size={16} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`invitation-screen ${show ? 'show' : ''}`}>
      <div className="invitation-content">
        <div className="rose-decoration">🌹</div>

        <h1 className="invitation-title">
          Happy Valentine's Day
          <Heart className="heart-beat" fill="currentColor" size={36} />
        </h1>

        <div className="to-from">
          <p className="to-text">
            To my baby loove <span className="name-highlight">Ruth</span>
          </p>
        </div>

        <div className="message-box compact">
          <p className="message valentine-question">
            Hello baby i know na want mo rin ma invite for valentines kahit na supposed tayo talaga
            pupunta and ginawa ko to para yayain ka EHHEHE. 💕
          </p>

          <p className="message valentine-main-question">
            Baby can you be my valentines? 💖
          </p>

          <div className="button-container">
            <button
              className="yes-button"
              onClick={handleYesClick}
              style={{
                transform: `scale(${yesButtonSize})`,
                transition: 'transform 0.3s ease',
              }}
            >
              YES! 💕
            </button>

            <button
              className={`no-button ${noClickCount > 0 ? 'moving' : ''}`}
              onClick={handleNoClick}
              style={
                noClickCount > 0
                  ? {
                      position: 'absolute',
                      top: `${noButtonPosition.top}px`,
                      left: `${noButtonPosition.left}px`,
                      transform: `scale(${noButtonSize})`,
                      transition: 'transform 0.3s ease',
                      zIndex: 9999,
                    }
                  : {}
              }
            >
              No...
            </button>
          </div>

          {noClickCount > 0 && (
            <p className="message hint-text">
              {noClickCount === 1 && 'Baby naman... 🥺'}
              {noClickCount === 2 && 'Awww okaay.... 💔'}
              {noClickCount === 3 && 'Mag tatampo ako mga 1 week '}
              {noClickCount === 4 && 'Kulang na yung kiss para suyuin ako sige ka love :('}
              {noClickCount >= 5 && 'YES NAAAA! 😢'}
            </p>
          )}
        </div>

        <div className="signature">
          Your one and only, <span className="name-highlight">bebe Frazeta</span>
          <div className="signature-line">💓</div>
        </div>

        <div className="hearts-decoration">
          <Heart fill="#ff69b4" color="#ff69b4" size={16} />
          <Heart fill="#ff85c1" color="#ff85c1" size={20} />
          <Heart fill="#ff69b4" color="#ff69b4" size={16} />
        </div>
      </div>
    </div>
  );
};

export default InvitationScreen;
