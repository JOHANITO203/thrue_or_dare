import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics, useBox } from "@react-three/cannon";
import { motion } from "framer-motion";
import { useState } from "react";

// Dé avec texture faces 1 → 6 (à compléter avec tes PNG "dice_face_X.png")
function Dice({ position, onStop }) {
  const [ref, api] = useBox(() => ({ mass: 1, position }));

  // Fonction pour lancer le dé
  const rollDice = () => {
    api.position.set(0, 5, 0);
    api.velocity.set(
      (Math.random() - 0.5) * 10,
      5,
      (Math.random() - 0.5) * 10
    );
    api.angularVelocity.set(
      Math.random() * 10,
      Math.random() * 10,
      Math.random() * 10
    );
    // Simule un résultat aléatoire (1-6)
    setTimeout(() => {
      const result = Math.floor(Math.random() * 6) + 1;
      onStop(result);
    }, 2000);
  };

  return (
    <mesh
      ref={ref}
      castShadow
      onClick={rollDice}
      onPointerOver={() => (document.body.style.cursor = "pointer")}
      onPointerOut={() => (document.body.style.cursor = "auto")}
      role="button"
    >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="white" />
    </mesh>
  );
}

export default function DiceScene() {
  const [active, setActive] = useState(0);
  const [results, setResults] = useState({});
  const [finished, setFinished] = useState(false);

  const players = [
    { name: "Ava", avatar: "assets/memoXX/female_01.png" },
    { name: "Liam", avatar: "assets/memoXY/male_01.png" },
    { name: "Mia", avatar: "assets/memoXX/female_02.png" },
    { name: "Noah", avatar: "assets/memoXY/male_02.png" }
  ];

  const handleStop = (score) => {
    const updated = { ...results, [active]: score };
    setResults(updated);

    if (Object.keys(updated).length === players.length) {
      setFinished(true);
    } else {
      setActive((active + 1) % players.length);
    }
  };

  return (
    <div className="flex flex-col items-center text-white">
      <h1 className="text-3xl font-bold mb-4">🎲 Lancer de dés</h1>

      {/* Scène 3D */}
      <Canvas
        shadows
        camera={{ position: [3, 3, 5], fov: 50 }}
        className="w-[600px] h-[400px] bg-gray-900 rounded-xl"
      >
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 5, 5]}
          intensity={1}
          castShadow
        />
        <Physics>
          <Dice position={[0, 5, 0]} onStop={handleStop} />
        </Physics>
        <OrbitControls />
      </Canvas>

      {/* Avatars joueurs */}
      <div className="flex gap-6 mt-6">
        {players.map((p, idx) => (
          <motion.div
            key={idx}
            className={`flex flex-col items-center ${
              active === idx ? "ring-4 ring-pink-500 rounded-xl p-2" : ""
            }`}
            animate={
              active === idx
                ? { scale: [1, 1.1, 1] }
                : { scale: 1 }
            }
            transition={{ duration: 1, repeat: Infinity }}
          >
            <img
              src={p.avatar}
              alt={p.name}
              className="w-16 h-16 rounded-full"
            />
            <span className="mt-1">{p.name}</span>
            <span className="text-pink-300">
              {results[idx] ?? "-"}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Bouton Commencer */}
      {finished && (
        <button className="mt-6 px-8 py-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold hover:scale-105 transition">
          Commencer la partie
        </button>
      )}
    </div>
  );
}
