export default function MainMenu({ onNewGame }) {
  return (
    <div className="glass w-[520px] max-w-full overflow-hidden p-8 flex flex-col items-center gap-6 text-center animate-fade-in">
      {/* Titre avec icône flamme */}
      <h1 className="text-[2.75rem] font-bold flex items-center gap-2">
        <span>Truth or Dare</span>
        <span className="flex items-center gap-1">
          HOT
          <img 
            src="/assets/emojis/1f525.png" 
            alt="flamme iOS" 
            className="w-12 h-12 align-text-bottom" 
            onError={(e) => {
              // Fallback si l'image n'existe pas
              e.target.style.display = 'none'
            }}
          />
        </span>
      </h1>

      {/* Cercle d'avatars - 8 memojis positionnés */}
      <div className="relative w-full h-[340px] mt-2">
        {/* Avatar 1 - Position 0° */}
        <img 
          src="/assets/memoXX/female_01.png" 
          alt="memoji 1" 
          className="absolute top-1/2 left-1/2 w-[100px] h-[100px]" 
          style={{transform: "translate(-50%, -50%) rotate(0deg) translate(120px) rotate(0deg)"}}
          onError={(e) => e.target.style.display = 'none'}
        />
        
        {/* Avatar 2 - Position 45° */}
        <img 
          src="/assets/memoXY/male_01.png" 
          alt="memoji 2" 
          className="absolute top-1/2 left-1/2 w-[100px] h-[100px]" 
          style={{transform: "translate(-50%, -50%) rotate(45deg) translate(120px) rotate(-45deg)"}}
          onError={(e) => e.target.style.display = 'none'}
        />
        
        {/* Avatar 3 - Position 90° */}
        <img 
          src="/assets/memoXX/female_15.png" 
          alt="memoji 3" 
          className="absolute top-1/2 left-1/2 w-[100px] h-[100px]" 
          style={{transform: "translate(-50%, -50%) rotate(90deg) translate(120px) rotate(-90deg)"}}
          onError={(e) => e.target.style.display = 'none'}
        />
        
        {/* Avatar 4 - Position 135° */}
        <img 
          src="/assets/memoXY/male_02.png" 
          alt="memoji 4" 
          className="absolute top-1/2 left-1/2 w-[100px] h-[100px]" 
          style={{transform: "translate(-50%, -50%) rotate(135deg) translate(120px) rotate(-135deg)"}}
          onError={(e) => e.target.style.display = 'none'}
        />
        
        {/* Avatar 5 - Position 180° */}
        <img 
          src="/assets/memoXX/female_14.png" 
          alt="memoji 5" 
          className="absolute top-1/2 left-1/2 w-[100px] h-[100px]" 
          style={{transform: "translate(-50%, -50%) rotate(180deg) translate(120px) rotate(-180deg)"}}
          onError={(e) => e.target.style.display = 'none'}
        />
        
        {/* Avatar 6 - Position 225° */}
        <img 
          src="/assets/memoXY/male_03.png" 
          alt="memoji 6" 
          className="absolute top-1/2 left-1/2 w-[100px] h-[100px]" 
          style={{transform: "translate(-50%, -50%) rotate(225deg) translate(120px) rotate(-225deg)"}}
          onError={(e) => e.target.style.display = 'none'}
        />
        
        {/* Avatar 7 - Position 270° */}
        <img 
          src="/assets/memoXX/female_04.png" 
          alt="memoji 7" 
          className="absolute top-1/2 left-1/2 w-[100px] h-[100px]" 
          style={{transform: "translate(-50%, -50%) rotate(270deg) translate(120px) rotate(-270deg)"}}
          onError={(e) => e.target.style.display = 'none'}
        />
        
        {/* Avatar 8 - Position 315° */}
        <img 
          src="/assets/memoXY/male_13.png" 
          alt="memoji 8" 
          className="absolute top-1/2 left-1/2 w-[100px] h-[100px]" 
          style={{transform: "translate(-50%, -50%) rotate(315deg) translate(120px) rotate(-315deg)"}}
          onError={(e) => e.target.style.display = 'none'}
        />
      </div>

      {/* Boutons du menu */}
      <div className="w-full flex flex-col gap-4 mt-4">
        {/* Bouton Nouvelle Partie */}
        <button
          onClick={onNewGame}
          className="w-full rounded-full py-3 font-semibold text-white bg-gradient-to-b from-[#5C6BFF] to-[#7A00FF] shadow hover:scale-105 transition-transform"
        >
          Nouvelle Partie
        </button>
        
        {/* Bouton Paramètres */}
        <button className="w-full rounded-full py-3 font-semibold text-white bg-gradient-to-b from-[#5CD96E] to-[#34C759] shadow hover:scale-105 transition-transform">
          Paramètres
        </button>
        
        {/* Bouton Premium Content */}
        <button className="w-full rounded-full py-3 font-semibold text-white bg-gradient-to-b from-[#FF6AC0] to-[#FF3B72] shadow hover:scale-105 transition-transform">
          Premium Content
        </button>
        
        {/* Bouton Quitter */}
        <button 
          onClick={() => window.close()}
          className="w-full rounded-full py-3 font-semibold text-white bg-gradient-to-b from-[#FF9575] to-[#FF3B30] shadow hover:scale-105 transition-transform"
        >
          Quitter
        </button>
      </div>
    </div>
  )
}
