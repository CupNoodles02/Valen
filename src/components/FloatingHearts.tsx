const FloatingHearts = () => {
  const hearts = ['💕', '💖', '💗', '💝', '💓', '🌸', '✨'];
  
  return (
    <div className="floating-hearts">
      {[...Array(20)].map((_, i) => (
        <div 
          key={i} 
          className="heart-float" 
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${8 + Math.random() * 4}s`
          }}
        >
          {hearts[i % hearts.length]}
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;