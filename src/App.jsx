import { Canvas } from '@react-three/fiber'
import { XR, createXRStore } from '@react-three/xr'
import { OrbitControls, Environment } from '@react-three/drei'
import PackingListOverlay from './components/PackingListOverlay'
import DetectionLabel from './components/DetectionLabel'
import SuitcaseDetector from './components/SuitcaseDetector'
import HandController from './components/HandController'
import CompletionMessage from './components/CompletionMessage'
import PackedItems from './components/PackedItems'
import './App.css'

// Create XR store
const store = createXRStore()

function App() {
  return (
    <div style={{ width: '100vw', height: '100vh', background: '#000' }}>
      {/* VR Button */}
      <button
        onClick={() => store.enterVR()}
        style={{
          position: 'absolute',
          top: '70px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          padding: '15px 30px',
          fontSize: '18px',
          background: '#00FFFF',
          color: '#000',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
          boxShadow: '0 0 20px rgba(0, 255, 255, 0.5)'
        }}
      >
        Enter VR / Start PackMate
      </button>

      {/* Instructions */}
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        color: '#00FFFF',
        textAlign: 'center',
        fontSize: '14px',
        background: 'rgba(0, 0, 0, 0.7)',
        padding: '15px 25px',
        borderRadius: '8px',
        border: '1px solid #00FFFF'
      }}>
        <p style={{ margin: '5px 0' }}>📋 <strong>Press L:</strong> Toggle packing list</p>
        <p style={{ margin: '5px 0' }}>🖱️ <strong>Click items:</strong> Mark as packed</p>
        <p style={{ margin: '5px 0' }}>🔄 <strong>Press R:</strong> Reset all items</p>
      </div>

      {/* HTML Overlays */}
      <PackingListOverlay />
      <DetectionLabel />

      {/* 3D Canvas */}
      <Canvas>
        <XR store={store}>
          {/* Lighting */}
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <directionalLight position={[-5, 5, 5]} intensity={0.5} />

          {/* Environment for better visuals */}
          <Environment preset="city" />

          {/* 3D Components */}
          <SuitcaseDetector />
          <PackedItems />
          <HandController />
          <CompletionMessage />

          {/* Development controls (only works outside VR) */}
          <OrbitControls />
        </XR>
      </Canvas>
    </div>
  )
}

export default App
