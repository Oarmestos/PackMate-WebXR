import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { XR, createXRStore } from '@react-three/xr'
import { OrbitControls, Environment, Html } from '@react-three/drei'
import PackingListOverlay from './components/PackingListOverlay'
import PackingList from './components/PackingList'
import DetectionLabel from './components/DetectionLabel'
import SuitcaseDetector from './components/SuitcaseDetector'
import HandController from './components/HandController'
import CompletionMessage from './components/CompletionMessage'
import PackedItems from './components/PackedItems'
import XRInteraction from './components/XRInteraction'
import { usePackingStore } from './store/packingStore'
import { COLORS } from './config/constants'
import './App.css'

// Create XR store with passthrough support
const store = createXRStore({
  requiredFeatures: ['local-floor'],
  optionalFeatures: ['hand-tracking', 'bounded-floor'],
})

/**
 * Loading fallback for Suspense
 */
function LoadingFallback() {
  return (
    <Html center>
      <div style={{
        color: COLORS.PRIMARY,
        fontSize: '18px',
        fontWeight: 'bold',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '40px', marginBottom: '10px' }}>🎒</div>
        Loading PackMate...
      </div>
    </Html>
  )
}

function App() {
  const isVRMode = usePackingStore(state => state.isVRMode)

  return (
    <div style={{ width: '100vw', height: '100vh', background: COLORS.BACKGROUND }}>
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
          background: COLORS.PRIMARY,
          color: COLORS.BACKGROUND,
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
          boxShadow: `0 0 20px ${COLORS.GLOW}`
        }}
      >
        🥽 Enter VR / Start PackMate
      </button>

      {/* AR Button */}
      <button
        onClick={() => store.enterAR()}
        style={{
          position: 'absolute',
          top: '130px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          padding: '12px 24px',
          fontSize: '16px',
          background: 'transparent',
          color: COLORS.PRIMARY,
          border: `2px solid ${COLORS.PRIMARY}`,
          borderRadius: '8px',
          cursor: 'pointer',
          fontWeight: 'bold',
        }}
      >
        📱 Enter AR (Passthrough)
      </button>

      {/* Instructions - hidden in VR */}
      {!isVRMode && (
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 1000,
          color: COLORS.PRIMARY,
          textAlign: 'center',
          fontSize: '14px',
          background: COLORS.PANEL_BG,
          padding: '15px 25px',
          borderRadius: '8px',
          border: `1px solid ${COLORS.PRIMARY}`
        }}>
          <p style={{ margin: '5px 0' }}>📋 <strong>Press L:</strong> Toggle packing list</p>
          <p style={{ margin: '5px 0' }}>🖱️ <strong>Click items:</strong> Mark as packed</p>
          <p style={{ margin: '5px 0' }}>🔄 <strong>Press R:</strong> Reset all items</p>
          <p style={{ margin: '5px 0', opacity: 0.7 }}>❓ <strong>Press H:</strong> Help</p>
        </div>
      )}

      {/* HTML Overlays (desktop only) */}
      {!isVRMode && (
        <>
          <PackingListOverlay />
          <DetectionLabel />
        </>
      )}

      {/* 3D Canvas */}
      <Canvas
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 1.6, 2], fov: 70 }}
      >
        <Suspense fallback={<LoadingFallback />}>
          <XR store={store}>
            {/* Lighting */}
            <ambientLight intensity={0.6} />
            <pointLight position={[10, 10, 10]} intensity={1} castShadow />
            <directionalLight position={[-5, 5, 5]} intensity={0.5} />

            {/* Environment for better visuals */}
            <Environment preset="city" />

            {/* 3D Packing List (visible in VR) */}
            <PackingList />

            {/* 3D Components */}
            <SuitcaseDetector />
            <PackedItems />
            <HandController />
            <CompletionMessage />

            {/* XR Controller interaction */}
            <XRInteraction />

            {/* Development controls (only works outside VR) */}
            {!isVRMode && <OrbitControls />}
          </XR>
        </Suspense>
      </Canvas>
    </div>
  )
}

export default App
