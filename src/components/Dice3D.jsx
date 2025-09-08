import { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'

export default function Dice3D({ onResult, isRolling, result }) {
  const mountRef = useRef(null)
  const sceneRef = useRef(null)
  const rendererRef = useRef(null)
  const diceRef = useRef(null)
  const animationIdRef = useRef(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    if (!mountRef.current) return

    // Configuration de la scène
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    
    renderer.setSize(200, 200)
    renderer.setClearColor(0x000000, 0)
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    
    mountRef.current.appendChild(renderer.domElement)

    // Éclairage
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
    directionalLight.position.set(10, 10, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    scene.add(directionalLight)

    // Création du dé
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    
    // Matériaux pour chaque face avec les points
    const materials = []
    const canvas = document.createElement('canvas')
    canvas.width = 128
    canvas.height = 128
    const ctx = canvas.getContext('2d')

    // Fonction pour dessiner les points sur une face
    const drawDots = (number) => {
      ctx.clearRect(0, 0, 128, 128)
      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, 128, 128)
      ctx.fillStyle = '#000000'

      const dotSize = 12
      const positions = {
        1: [[64, 64]], // Centre
        2: [[32, 32], [96, 96]], // Diagonale
        3: [[32, 32], [64, 64], [96, 96]], // Diagonale avec centre
        4: [[32, 32], [96, 32], [32, 96], [96, 96]], // Coins
        5: [[32, 32], [96, 32], [64, 64], [32, 96], [96, 96]], // Coins + centre
        6: [[32, 25], [96, 25], [32, 64], [96, 64], [32, 103], [96, 103]] // 2 colonnes
      }

      if (positions[number]) {
        positions[number].forEach(([x, y]) => {
          ctx.beginPath()
          ctx.arc(x, y, dotSize, 0, Math.PI * 2)
          ctx.fill()
        })
      }

      const texture = new THREE.CanvasTexture(canvas)
      return new THREE.MeshLambertMaterial({ map: texture })
    }

    // Créer les matériaux pour chaque face (1-6)
    for (let i = 1; i <= 6; i++) {
      materials.push(drawDots(i))
    }

    const dice = new THREE.Mesh(geometry, materials)
    dice.castShadow = true
    dice.position.set(0, 0, 0)
    scene.add(dice)

    // Plan invisible pour recevoir les ombres
    const planeGeometry = new THREE.PlaneGeometry(5, 5)
    const planeMaterial = new THREE.ShadowMaterial({ opacity: 0.3 })
    const plane = new THREE.Mesh(planeGeometry, planeMaterial)
    plane.rotation.x = -Math.PI / 2
    plane.position.y = -1
    plane.receiveShadow = true
    scene.add(plane)

    // Position de la caméra
    camera.position.set(2, 2, 3)
    camera.lookAt(0, 0, 0)

    // Sauvegarder les références
    sceneRef.current = scene
    rendererRef.current = renderer
    diceRef.current = dice

    setIsReady(true)

    // Animation de base (rotation lente)
    const animate = () => {
      if (!dice || !renderer || !scene) return
      
      if (!isRolling) {
        dice.rotation.x += 0.005
        dice.rotation.y += 0.005
      }

      renderer.render(scene, camera)
      animationIdRef.current = requestAnimationFrame(animate)
    }
    animate()

    // Cleanup
    return () => {
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current)
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement)
      }
      renderer.dispose()
    }
  }, [])

  // Animation de lancer de dé
  useEffect(() => {
    if (!isReady || !diceRef.current || !isRolling) return

    const dice = diceRef.current
    const startTime = Date.now()
    const duration = 1500 // 1.5 secondes

    const rollAnimation = () => {
      const elapsed = Date.now() - startTime
      const progress = Math.min(elapsed / duration, 1)

      if (progress < 1) {
        // Animation de roulement rapide
        dice.rotation.x += 0.3 * (1 - progress)
        dice.rotation.y += 0.3 * (1 - progress)
        dice.rotation.z += 0.2 * (1 - progress)

        // Effet de rebond
        const bounce = Math.sin(progress * Math.PI * 8) * 0.1 * (1 - progress)
        dice.position.y = bounce

        requestAnimationFrame(rollAnimation)
      } else {
        // Position finale basée sur le résultat
        const finalRotations = {
          1: { x: 0, y: 0, z: 0 },           // Face 1 dessus
          2: { x: 0, y: 0, z: Math.PI },     // Face 2 dessus  
          3: { x: 0, y: -Math.PI/2, z: 0 },  // Face 3 dessus
          4: { x: 0, y: Math.PI/2, z: 0 },   // Face 4 dessus
          5: { x: Math.PI/2, y: 0, z: 0 },   // Face 5 dessus
          6: { x: -Math.PI/2, y: 0, z: 0 }   // Face 6 dessus
        }

        const target = finalRotations[result] || finalRotations[1]
        dice.rotation.set(target.x, target.y, target.z)
        dice.position.y = 0

        // Notifier le résultat
        setTimeout(() => {
          if (onResult) onResult(result)
        }, 200)
      }
    }

    rollAnimation()
  }, [isRolling, result, isReady, onResult])

  return (
    <div className="relative">
      <div 
        ref={mountRef} 
        className="w-[200px] h-[200px] cursor-pointer hover:scale-105 transition-transform duration-300"
        style={{ 
          background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
          borderRadius: '20px',
          border: '2px solid rgba(255,255,255,0.2)'
        }}
      />
      {isRolling && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-white text-lg font-bold animate-pulse">
            🎲
          </div>
        </div>
      )}
    </div>
  )
}
