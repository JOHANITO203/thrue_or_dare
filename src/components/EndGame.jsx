export default function EndGame({ result, onRestart }) {
  const { winner, scores } = result || {}

  return (
    <div className="glass w-[450px] max-w-full p-8 text-center animate-fade-in">
      <h1 className="text-3xl font-bold mb-6">🎉 Partie Terminée !</h1>
      
      {winner && (
        <div className="mb-6">
          <h2 className="text-2xl mb-4">🏆 Bravo {winner.name} !</h2>
          <div className="text-lg">{winner.score || 0} points</div>
        </div>
      )}

      {scores && (
        <div className="mb-6">
          <h3 className="text-xl mb-4">Classement Final</h3>
          {scores.map((player, index) => (
            <div key={player.id} className="flex justify-between p-2 bg-white/10 rounded mb-2">
              <span>{index + 1}. {player.name}</span>
              <span>{player.score || 0} pts</span>
            </div>
          ))}
        </div>
      )}

      <button onClick={onRestart} className="w-full py-3 rounded-full bg-gradient-to-b from-[#5C6BFF] to-[#7A00FF] text-white font-semibold">
        Nouvelle Partie
      </button>
    </div>
  )
}
