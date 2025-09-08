import { useState } from 'react'

export default function SpiralTest() {
  const [restart, setRestart] = useState(0)

  const restartAnimation = () => {
    setRestart(prev => prev + 1)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#7a60ff] via-[#ff6ac0] to-[#ff9575] flex flex-col items-center justify-center p-4">
      
      {/* Bouton de test */}
      <button 
        onClick={restartAnimation}
        className="mb-8 px-6 py-3 bg-white/20 backdrop-blur-lg rounded-full text-white font-semibold hover:bg-white/30 transition-all"
      >
        🔄 Relancer l'animation spirale
      </button>

      {/* Zone de test avec MainMenu */}
      <div key={restart}>
        <div className="glass-premium w-[520px] max-w-full overflow-hidden p-8 flex flex-col items-center gap-6 text-center">
          
          <h1 className="text-[2.75rem] font-bold">
            Truth or Dare HOT 🔥
          </h1>

          {/* Test de l'animation spirale */}
          <div className="relative w-full h-[300px] mt-2" style={{ maxWidth: '400px', margin: '0 auto' }}>
            {[
              { finalAngle: 0, startAngle: -720, midAngle: -360, delay: '0.1s' },
              { finalAngle: 45, startAngle: -675, midAngle: -315, delay: '0.2s' },
              { finalAngle: 90, startAngle: -630, midAngle: -270, delay: '0.3s' },
              { finalAngle: 135, startAngle: -585, midAngle: -225, delay: '0.4s' },
              { finalAngle: 180, startAngle: -540, midAngle: -180, delay: '0.5s' },
              { finalAngle: 225, startAngle: -495, midAngle: -135, delay: '0.6s' },
              { finalAngle: 270, startAngle: -450, midAngle: -90, delay: '0.7s' },
              { finalAngle: 315, startAngle: -405, midAngle: -45, delay: '0.8s' }
            ].map((avatar, index) => (
              <div
                key={index}
                className="absolute top-1/2 left-1/2 w-[90px] h-[90px] bg-gradient-to-br from-blue-400 to-purple-600 rounded-full spiral-avatar flex items-center justify-center text-white font-bold text-xl"
                style={{
                  '--start-angle': `${avatar.startAngle}deg`,
                  '--mid-angle': `${avatar.midAngle}deg`,
                  '--final-angle': `${avatar.finalAngle}deg`,
                  animationDelay: avatar.delay,
                  animationFillMode: 'both'
                }}
              >
                {index + 1}
              </div>
            ))}
          </div>

          <div className="text-white/70 text-center">
            🌸 Test de l'animation spirale<br/>
            <small>Les avatars forment une spirale puis s'épanouissent en cercle</small>
          </div>
        </div>
      </div>
    </div>
  )
}
