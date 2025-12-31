import React, { useRef, useEffect, memo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { selectPackedItems } from '../store/packingStore'
import { usePackingStore } from '../store/packingStore'
import { POSITIONS, SIZES, COLORS, ANIMATION, TIMING } from '../config/constants'

/**
 * Renders packed items inside the suitcase
 */
function PackedItems() {
    const packedItems = usePackingStore(selectPackedItems)

    return (
        <group position={POSITIONS.SUITCASE}>
            {packedItems.map((item, index) => {
                // Distribute items inside suitcase (3 columns, multiple rows)
                const cols = 3
                const row = Math.floor(index / cols)
                const col = index % cols

                // Position items INSIDE the suitcase
                const x = (col - 1) * 0.45
                const y = -0.2 + row * 0.3
                const z = 0

                return (
                    <PackedItemCube
                        key={item.id}
                        position={[x, y, z]}
                        item={item}
                        index={index}
                    />
                )
            })}
        </group>
    )
}

/**
 * Individual packed item cube with animation
 * Memoized to prevent unnecessary re-renders
 */
const PackedItemCube = memo(function PackedItemCube({ position, item, index }) {
    const meshRef = useRef()
    const [appeared, setAppeared] = React.useState(false)

    useEffect(() => {
        const timer = setTimeout(
            () => setAppeared(true),
            index * TIMING.ITEM_APPEAR_STAGGER_MS
        )
        return () => clearTimeout(timer)
    }, [index])

    useFrame((state) => {
        if (meshRef.current && appeared) {
            // Gentle floating animation
            meshRef.current.position.y = position[1] +
                Math.sin(state.clock.elapsedTime * ANIMATION.FLOAT_SPEED + index) * ANIMATION.FLOAT_AMPLITUDE
            meshRef.current.rotation.y =
                Math.sin(state.clock.elapsedTime + index) * ANIMATION.ROTATION_AMPLITUDE
        }
    })

    if (!appeared) return null

    const cubeSize = SIZES.PACKED_ITEM_CUBE

    return (
        <group position={position}>
            <mesh ref={meshRef}>
                <boxGeometry args={[cubeSize, cubeSize, cubeSize]} />
                <meshStandardMaterial
                    color={COLORS.PRIMARY}
                    emissive={COLORS.PRIMARY}
                    emissiveIntensity={0.5}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>

            {/* Icon or short label */}
            <Text
                position={[0, cubeSize * 0.8, 0]}
                fontSize={0.06}
                color={COLORS.TEXT}
                anchorX="center"
                anchorY="bottom"
                outlineWidth={0.005}
                outlineColor={COLORS.BACKGROUND}
            >
                {item.icon || item.name.substring(0, 4)}
            </Text>
        </group>
    )
})

export default PackedItems
