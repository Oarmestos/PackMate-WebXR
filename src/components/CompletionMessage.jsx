import { useEffect, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { usePackingStore, selectIsComplete, selectPackedCount, selectTotalCount } from '../store/packingStore'
import { POSITIONS, SIZES, COLORS } from '../config/constants'
import { playSound } from '../hooks/useAudio'

/**
 * Completion celebration message
 * Shown when all items are packed
 */
function CompletionMessage() {
    const isComplete = usePackingStore(selectIsComplete)
    const packedCount = usePackingStore(selectPackedCount)
    const totalCount = usePackingStore(selectTotalCount)
    const completionShown = usePackingStore(state => state.completionShown)
    const setCompletionShown = usePackingStore(state => state.setCompletionShown)
    const resetPacking = usePackingStore(state => state.resetPacking)

    const groupRef = useRef()
    const hasPlayedSound = useRef(false)

    // Play completion sound once
    useEffect(() => {
        if (isComplete && !hasPlayedSound.current) {
            playSound('COMPLETE', 0.7)
            hasPlayedSound.current = true
            setCompletionShown(true)
        }
        if (!isComplete) {
            hasPlayedSound.current = false
        }
    }, [isComplete, setCompletionShown])

    // Floating animation
    useFrame((state) => {
        if (groupRef.current && isComplete) {
            groupRef.current.position.y = POSITIONS.COMPLETION_MESSAGE[1] +
                Math.sin(state.clock.elapsedTime * 1.5) * 0.02
        }
    })

    if (!isComplete) return null

    return (
        <group ref={groupRef} position={POSITIONS.COMPLETION_MESSAGE}>
            {/* Background panel */}
            <mesh>
                <planeGeometry args={SIZES.PANEL.COMPLETION} />
                <meshBasicMaterial
                    color={COLORS.BACKGROUND}
                    transparent
                    opacity={0.85}
                />
            </mesh>

            {/* Glow border */}
            <mesh position={[0, 0, -0.001]}>
                <planeGeometry args={[SIZES.PANEL.COMPLETION[0] + 0.02, SIZES.PANEL.COMPLETION[1] + 0.02]} />
                <meshBasicMaterial
                    color={COLORS.SUCCESS}
                    transparent
                    opacity={0.4}
                />
            </mesh>

            {/* Success icon */}
            <Text
                position={[0, 0.08, 0.01]}
                fontSize={SIZES.TEXT.ICON}
                color={COLORS.SUCCESS}
                anchorX="center"
                anchorY="middle"
            >
                ✓
            </Text>

            {/* Main message */}
            <Text
                position={[0, -0.02, 0.01]}
                fontSize={SIZES.TEXT.TITLE}
                color={COLORS.PRIMARY}
                anchorX="center"
                anchorY="middle"
            >
                All Packed! ({packedCount}/{totalCount})
            </Text>

            {/* Sub message */}
            <Text
                position={[0, -0.1, 0.01]}
                fontSize={SIZES.TEXT.BODY}
                color={COLORS.TEXT}
                anchorX="center"
                anchorY="middle"
            >
                Have a great trip! ✈️
            </Text>

            {/* Reset button hint */}
            <Text
                position={[0, -0.16, 0.01]}
                fontSize={SIZES.TEXT.SMALL}
                color={COLORS.TEXT_MUTED}
                anchorX="center"
                anchorY="middle"
            >
                Press R to reset
            </Text>
        </group>
    )
}

export default CompletionMessage
