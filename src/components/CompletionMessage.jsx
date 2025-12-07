import { Text } from '@react-three/drei'
import { usePackingStore } from '../store/packingStore'

function CompletionMessage() {
    const items = usePackingStore(state => state.items)
    const isComplete = items.every(item => item.packed)

    if (!isComplete) return null

    return (
        <group position={[0, 1.8, -1.5]}>
            {/* Background panel */}
            <mesh>
                <planeGeometry args={[1.2, 0.4]} />
                <meshBasicMaterial
                    color="#000000"
                    transparent
                    opacity={0.8}
                />
            </mesh>

            {/* Glow border */}
            <mesh position={[0, 0, -0.001]}>
                <planeGeometry args={[1.22, 0.42]} />
                <meshBasicMaterial
                    color="#00FF00"
                    transparent
                    opacity={0.4}
                />
            </mesh>

            {/* Success icon */}
            <Text
                position={[0, 0.08, 0.01]}
                fontSize={0.08}
                color="#00FF00"
                anchorX="center"
                anchorY="middle"
            >
                ✓
            </Text>

            {/* Main message */}
            <Text
                position={[0, -0.02, 0.01]}
                fontSize={0.045}
                color="#00FFFF"
                anchorX="center"
                anchorY="middle"
            >
                All Packed!
            </Text>

            {/* Sub message */}
            <Text
                position={[0, -0.1, 0.01]}
                fontSize={0.03}
                color="#FFFFFF"
                anchorX="center"
                anchorY="middle"
            >
                Have a great trip! ✈️
            </Text>
        </group>
    )
}

export default CompletionMessage
