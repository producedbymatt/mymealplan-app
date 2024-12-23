const LiquidBackground = () => {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        {/* Liquid blobs */}
        <div className="absolute w-1/2 h-1/2 bg-blue-400/50 rounded-full blur-3xl animate-blob mix-blend-multiply" 
          style={{ 
            animation: 'blob 7s infinite',
            left: '0%',
            top: '0%',
          }}
        />
        <div className="absolute w-1/2 h-1/2 bg-green-400/50 rounded-full blur-3xl animate-blob animation-delay-2000 mix-blend-multiply"
          style={{ 
            animation: 'blob 7s infinite',
            animationDelay: '2s',
            right: '0%',
            top: '50%',
          }}
        />
        <div className="absolute w-1/2 h-1/2 bg-blue-500/50 rounded-full blur-3xl animate-blob animation-delay-4000 mix-blend-multiply"
          style={{ 
            animation: 'blob 7s infinite',
            animationDelay: '4s',
            left: '50%',
            bottom: '0%',
          }}
        />
      </div>
    </div>
  );
};

export default LiquidBackground;