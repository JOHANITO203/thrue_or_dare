import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center">
      <div className="flex gap-4">
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="h-16" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="h-16" alt="React logo" />
        </a>
      </div>
      <h1 className="text-3xl font-bold">Vite + React</h1>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setCount((count) => count + 1)}
      >
        count is {count}
      </button>
    </div>
  )
}

export default App
