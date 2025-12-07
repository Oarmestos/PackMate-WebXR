import { useState, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { usePackingStore } from '../store/packingStore'

function InteractiveItem({ item, position, index }) {
    const [hovered, setHovered] = useState(false)
    const meshRef = useRef()
    const packItem = usePackingStore(state => state.packItem)
    const grabbedItem = usePackingStore(state => state.grabbedItem)
    const setGrabbedItem = usePackingStore(state => state.setGrabbedItem)

    // Animate when hovered
    useFrame((state) => {
        if (meshRef.current && hovered && !item.packed) {
            meshRef.current.scale.x = 1.05 + Math.sin(state.clock.elapsedTime * 3) * 0.02
            meshRef.current.scale.y = 1.05 + Math.sin(state.clock.elapsedTime * 3) * 0.02
        } else if (meshRef.current) {
            meshRef.current.scale.x = 1
            meshRef.current.scale.y = 1
        }
    })

    const handleClick = () => {
        if (!item.packed) {
            packItem(item.id)
        }
    }

    return (
        <group position={position}>
            {/* Clickable area */}
            <mesh
                ref={meshRef}
                onClick={handleClick}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <planeGeometry args={[0.4, 0.045]} />
                <meshBasicMaterial
                    color={hovered && !item.packed ? "#00FFFF" : "transparent"}
                    transparent
                    opacity={hovered && !item.packed ? 0.2 : 0}
                />
            </mesh>

            {/* Checkbox */}
            <Text
                position={[-0.18, 0, 0.001]}
                fontSize={0.03}
                color={item.packed ? "#00FF00" : "#FFFFFF"}
                anchorX="center"
                anchorY="middle"
            >
                {item.packed ? '✓' : '○'}
            </Text>

            {/* Item name */}
            <Text
                position={[-0.05, 0, 0.001]}
                fontSize={0.028}
                color={item.packed ? "#00FF00" : hovered ? "#00FFFF" : "#FFFFFF"}
                anchorX="left"
                anchorY="middle"
                maxWidth={0.35}
            >
                {item.name}
            </Text>

            {/* Hover indicator */}
            {hovered && !item.packed && (
                <Text
                    position={[0.15, 0, 0.001]}
                    fontSize={0.02}
                    color="#00FFFF"
                    anchorX="right"
                    anchorY="middle"
                >
                    ← Click
                </Text>
            )}
        </group>
    )
}

export default InteractiveItem
