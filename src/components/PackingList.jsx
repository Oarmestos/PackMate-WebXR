import { Text } from '@react-three/drei'
import { usePackingStore } from '../store/packingStore'
import InteractiveItem from './InteractiveItem'

function PackingList() {
    const items = usePackingStore(state => state.items)
    const listVisible = usePackingStore(state => state.listVisible)
    const packedCount = items.filter(i => i.packed).length
    const totalCount = items.length

    if (!listVisible) return null

    return (
        <group position={[-0.6, 1.5, -1.2]}>
            {/* Background Panel */}
            <mesh>
                <planeGeometry args={[0.5, 0.8]} />
                <meshBasicMaterial
                    color="#000000"
                    transparent
                    opacity={0.75}
                />
            </mesh>

            {/* Border glow effect */}
            <mesh position={[0, 0, -0.001]}>
                <planeGeometry args={[0.52, 0.82]} />
                <meshBasicMaterial
                    color="#00FFFF"
                    transparent
                    opacity={0.3}
                />
            </mesh>

            {/* Title */}
            <Text
                position={[0, 0.35, 0.01]}
                fontSize={0.045}
                color="#00FFFF"
                anchorX="center"
                anchorY="middle"
            >
                PACKING LIST
            </Text>

            {/* Progress */}
            <Text
                position={[0, 0.28, 0.01]}
                fontSize={0.025}
                color="#FFFFFF"
                anchorX="center"
                anchorY="middle"
            >
                {packedCount} / {totalCount} packed
            </Text>

            {/* Progress bar background */}
            <mesh position={[0, 0.22, 0.01]}>
                <planeGeometry args={[0.4, 0.02]} />
                <meshBasicMaterial color="#333333" />
            </mesh>

            {/* Progress bar fill */}
            <mesh position={[(-0.2 + (0.4 * packedCount / totalCount) / 2), 0.22, 0.011]}>
                <planeGeometry args={[0.4 * packedCount / totalCount, 0.02]} />
                <meshBasicMaterial color="#00FFFF" />
            </mesh>

            {/* Items list - now interactive */}
            {items.map((item, index) => (
                <InteractiveItem
                    key={item.id}
                    item={item}
                    position={[0, 0.12 - index * 0.055, 0.01]}
                    index={index}
                />
            ))}

            {/* Footer hint */}
            <Text
                position={[0, -0.35, 0.01]}
                fontSize={0.02}
                color="#00FFFF"
                anchorX="center"
                anchorY="middle"
                opacity={0.7}
            >
                Click items to pack
            </Text>
        </group>
    )
}

export default PackingList
