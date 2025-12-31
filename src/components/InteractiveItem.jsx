import { useState, useRef, memo, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { usePackingStore } from '../store/packingStore'
import { COLORS, ANIMATION, SIZES } from '../config/constants'
import { playSound } from '../hooks/useAudio'

/**
 * Interactive packing list item
 * Handles click/hover interactions for packing items
 */
const InteractiveItem = memo(function InteractiveItem({ item, position }) {
    const [hovered, setHovered] = useState(false)
    const meshRef = useRef()
    const packItem = usePackingStore(state => state.packItem)

    // Animate when hovered
    useFrame((state) => {
        if (!meshRef.current) return

        if (hovered && !item.packed) {
            const pulse = Math.sin(state.clock.elapsedTime * 3) * 0.02
            meshRef.current.scale.x = ANIMATION.HOVER_SCALE + pulse
            meshRef.current.scale.y = ANIMATION.HOVER_SCALE + pulse
        } else {
            // Smooth return to normal
            meshRef.current.scale.x += (1 - meshRef.current.scale.x) * 0.2
            meshRef.current.scale.y += (1 - meshRef.current.scale.y) * 0.2
        }
    })

    const handleClick = useCallback((event) => {
        event.stopPropagation()
        if (!item.packed) {
            packItem(item.id)
            playSound('PACK', 0.5)
        }
    }, [item.packed, item.id, packItem])

    const handlePointerOver = useCallback(() => setHovered(true), [])
    const handlePointerOut = useCallback(() => setHovered(false), [])

    const checkboxColor = item.packed ? COLORS.SUCCESS : COLORS.TEXT
    const textColor = item.packed ? COLORS.SUCCESS : (hovered ? COLORS.PRIMARY : COLORS.TEXT)
    const bgOpacity = hovered && !item.packed ? 0.2 : 0

    return (
        <group position={position}>
            {/* Clickable area - userData for XR interaction */}
            <mesh
                ref={meshRef}
                onClick={handleClick}
                onPointerOver={handlePointerOver}
                onPointerOut={handlePointerOut}
                userData={{
                    itemId: item.id,
                    packed: item.packed,
                    type: 'packingItem'
                }}
            >
                <planeGeometry args={[0.4, 0.045]} />
                <meshBasicMaterial
                    color={COLORS.PRIMARY}
                    transparent
                    opacity={bgOpacity}
                />
            </mesh>

            {/* Icon/Checkbox */}
            <Text
                position={[-0.18, 0, 0.001]}
                fontSize={SIZES.TEXT.BODY}
                color={checkboxColor}
                anchorX="center"
                anchorY="middle"
            >
                {item.packed ? '✓' : (item.icon || '○')}
            </Text>

            {/* Item name */}
            <Text
                position={[-0.05, 0, 0.001]}
                fontSize={0.028}
                color={textColor}
                anchorX="left"
                anchorY="middle"
                maxWidth={0.3}
                textDecoration={item.packed ? 'line-through' : 'none'}
            >
                {item.name}
            </Text>

            {/* Hover indicator */}
            {hovered && !item.packed && (
                <Text
                    position={[0.17, 0, 0.001]}
                    fontSize={SIZES.TEXT.SMALL}
                    color={COLORS.PRIMARY}
                    anchorX="right"
                    anchorY="middle"
                >
                    ← Pack
                </Text>
            )}

            {/* Packed indicator */}
            {item.packed && (
                <Text
                    position={[0.17, 0, 0.001]}
                    fontSize={SIZES.TEXT.SMALL}
                    color={COLORS.SUCCESS}
                    anchorX="right"
                    anchorY="middle"
                    fillOpacity={0.7}
                >
                    ✓ Done
                </Text>
            )}
        </group>
    )
})

export default InteractiveItem
