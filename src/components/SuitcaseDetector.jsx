import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { usePackingStore } from '../store/packingStore'
import * as THREE from 'three'

function SuitcaseDetector() {
    const wireframeRef = useRef()
    const glowRef = useRef()
    const [detected, setDetected] = useState(false)
    const [scanning, setScanning] = useState(true)
    const setSuitcaseDetected = usePackingStore(state => state.setSuitcaseDetected)

    // Simulated suitcase position
    const suitcasePosition = [0, 0.6, -2.5]
    const suitcaseSize = [1.8, 1.2, 0.9] // Made larger for better visibility

    // Simulate detection after 2 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setScanning(false)
            setDetected(true)
            setSuitcaseDetected(true, suitcasePosition)
        }, 2000)

        return () => clearTimeout(timer)
    }, [setSuitcaseDetected])

    // Animate the wireframe
    useFrame((state) => {
        if (wireframeRef.current && detected) {
            // Gentle rotation
            wireframeRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1

            // Pulsing glow effect
            if (glowRef.current) {
                glowRef.current.material.opacity = 0.1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
            }
        }
    })

    if (scanning) {
        return (
            <group position={[0, 1.2, -1.5]}>
                <Text
                    fontSize={0.04}
                    color="#00FFFF"
                    anchorX="center"
                    anchorY="middle"
                >
                    🔍 Scanning for suitcase...
                </Text>
                <Text
                    position={[0, -0.06, 0]}
                    fontSize={0.025}
                    color="#FFFFFF"
                    anchorX="center"
                    anchorY="middle"
                    opacity={0.7}
                >
                    Point at your luggage
                </Text>
            </group>
        )
    }

    if (!detected) return null

    return (
        <group position={suitcasePosition}>
            {/* Wireframe box representing detected suitcase */}
            <group ref={wireframeRef}>
                <lineSegments>
                    <edgesGeometry args={[new THREE.BoxGeometry(...suitcaseSize)]} />
                    <lineBasicMaterial color="#00FFFF" linewidth={2} />
                </lineSegments>

                {/* Glow effect */}
                <mesh ref={glowRef}>
                    <boxGeometry args={suitcaseSize} />
                    <meshBasicMaterial
                        color="#00FFFF"
                        transparent
                        opacity={0.1}
                        wireframe
                    />
                </mesh>

                {/* Corner markers */}
                {[
                    [-suitcaseSize[0] / 2, suitcaseSize[1] / 2, suitcaseSize[2] / 2],
                    [suitcaseSize[0] / 2, suitcaseSize[1] / 2, suitcaseSize[2] / 2],
                    [-suitcaseSize[0] / 2, -suitcaseSize[1] / 2, suitcaseSize[2] / 2],
                    [suitcaseSize[0] / 2, -suitcaseSize[1] / 2, suitcaseSize[2] / 2],
                ].map((pos, i) => (
                    <mesh key={i} position={pos}>
                        <sphereGeometry args={[0.02, 8, 8]} />
                        <meshBasicMaterial color="#00FFFF" />
                    </mesh>
                ))}
            </group>

            {/* Drop zone indicator */}
            <mesh position={[0, suitcaseSize[1] + 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.5, 0.55, 32]} />
                <meshBasicMaterial color="#00FFFF" transparent opacity={0.3} side={THREE.DoubleSide} />
            </mesh>
        </group>
    )
}

export default SuitcaseDetector
