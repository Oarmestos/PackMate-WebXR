import { useRef, useState, useEffect, memo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { usePackingStore } from '../store/packingStore'
import { POSITIONS, SIZES, COLORS, TIMING, ANIMATION } from '../config/constants'
import * as THREE from 'three'

/**
 * Suitcase detection and visualization component
 * Shows scanning state and detected suitcase wireframe
 */
function SuitcaseDetector() {
    const wireframeRef = useRef()
    const glowRef = useRef()
    const [detected, setDetected] = useState(false)
    const [scanning, setScanning] = useState(true)
    const [confidence, setConfidence] = useState(0)
    const setSuitcaseDetected = usePackingStore(state => state.setSuitcaseDetected)

    const suitcasePosition = POSITIONS.SUITCASE
    const suitcaseSize = SIZES.SUITCASE

    // Simulate detection with progressive confidence
    useEffect(() => {
        let confidenceInterval

        // Animate confidence during scanning
        confidenceInterval = setInterval(() => {
            setConfidence(prev => Math.min(prev + Math.random() * 15, 92))
        }, 200)

        const timer = setTimeout(() => {
            clearInterval(confidenceInterval)
            setConfidence(92)
            setScanning(false)
            setDetected(true)
            setSuitcaseDetected(true, suitcasePosition)
        }, TIMING.DETECTION_DELAY_MS)

        return () => {
            clearTimeout(timer)
            clearInterval(confidenceInterval)
        }
    }, [setSuitcaseDetected, suitcasePosition])

    // Animate the wireframe
    useFrame((state) => {
        if (wireframeRef.current && detected) {
            wireframeRef.current.rotation.y =
                Math.sin(state.clock.elapsedTime * ANIMATION.ROTATION_SPEED) * ANIMATION.ROTATION_AMPLITUDE

            if (glowRef.current) {
                glowRef.current.material.opacity =
                    ANIMATION.PULSE_MIN_OPACITY +
                    Math.sin(state.clock.elapsedTime * ANIMATION.PULSE_SPEED) * ANIMATION.PULSE_AMPLITUDE
            }
        }
    })

    if (scanning) {
        return (
            <group position={POSITIONS.SCANNING_TEXT}>
                <Text
                    fontSize={SIZES.TEXT.TITLE}
                    color={COLORS.PRIMARY}
                    anchorX="center"
                    anchorY="middle"
                >
                    🔍 Scanning for suitcase... {Math.round(confidence)}%
                </Text>
                <Text
                    position={[0, -0.06, 0]}
                    fontSize={SIZES.TEXT.SMALL}
                    color={COLORS.TEXT}
                    anchorX="center"
                    anchorY="middle"
                    fillOpacity={0.7}
                >
                    Point at your luggage
                </Text>

                {/* Scanning progress bar */}
                <mesh position={[0, -0.12, 0]}>
                    <planeGeometry args={[0.3, 0.01]} />
                    <meshBasicMaterial color={COLORS.TEXT_MUTED} />
                </mesh>
                <mesh position={[-0.15 + (confidence / 100) * 0.15, -0.12, 0.001]}>
                    <planeGeometry args={[(confidence / 100) * 0.3, 0.01]} />
                    <meshBasicMaterial color={COLORS.PRIMARY} />
                </mesh>
            </group>
        )
    }

    if (!detected) return null

    const cornerRadius = SIZES.CORNER_MARKER_RADIUS

    return (
        <group position={suitcasePosition}>
            {/* Wireframe box representing detected suitcase */}
            <group ref={wireframeRef}>
                <lineSegments>
                    <edgesGeometry args={[new THREE.BoxGeometry(...suitcaseSize)]} />
                    <lineBasicMaterial color={COLORS.PRIMARY} linewidth={2} />
                </lineSegments>

                {/* Glow effect */}
                <mesh ref={glowRef}>
                    <boxGeometry args={suitcaseSize} />
                    <meshBasicMaterial
                        color={COLORS.PRIMARY}
                        transparent
                        opacity={0.1}
                        wireframe
                    />
                </mesh>

                {/* Corner markers - optimized */}
                <CornerMarkers size={suitcaseSize} radius={cornerRadius} />
            </group>

            {/* Drop zone indicator */}
            <mesh position={[0, suitcaseSize[1] + 0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[SIZES.DROP_ZONE_INNER, SIZES.DROP_ZONE_OUTER, 32]} />
                <meshBasicMaterial color={COLORS.PRIMARY} transparent opacity={0.3} side={THREE.DoubleSide} />
            </mesh>
        </group>
    )
}

/**
 * Corner markers component - memoized for performance
 */
const CornerMarkers = memo(function CornerMarkers({ size, radius }) {
    const corners = [
        [-size[0] / 2, size[1] / 2, size[2] / 2],
        [size[0] / 2, size[1] / 2, size[2] / 2],
        [-size[0] / 2, -size[1] / 2, size[2] / 2],
        [size[0] / 2, -size[1] / 2, size[2] / 2],
        [-size[0] / 2, size[1] / 2, -size[2] / 2],
        [size[0] / 2, size[1] / 2, -size[2] / 2],
        [-size[0] / 2, -size[1] / 2, -size[2] / 2],
        [size[0] / 2, -size[1] / 2, -size[2] / 2],
    ]

    return (
        <>
            {corners.map((pos, i) => (
                <mesh key={i} position={pos}>
                    <sphereGeometry args={[radius, 8, 8]} />
                    <meshBasicMaterial color={COLORS.PRIMARY} />
                </mesh>
            ))}
        </>
    )
})

export default SuitcaseDetector
