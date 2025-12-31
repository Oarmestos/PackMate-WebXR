import { memo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { useXR } from '@react-three/xr'
import { usePackingStore, selectPackedCount, selectTotalCount, selectProgress } from '../store/packingStore'
import InteractiveItem from './InteractiveItem'
import { POSITIONS, SIZES, COLORS } from '../config/constants'

/**
 * 3D Packing List component
 * Visible in both desktop and VR modes
 */
function PackingList() {
    const items = usePackingStore(state => state.items)
    const listVisible = usePackingStore(state => state.listVisible)
    const packedCount = usePackingStore(selectPackedCount)
    const totalCount = usePackingStore(selectTotalCount)
    const progress = usePackingStore(selectProgress)
    // v6 API: useXR with selector to get session state
    const session = useXR((state) => state.session)
    const isPresenting = !!session

    const groupRef = useRef()

    // In VR, gently follow head movement
    useFrame(({ camera }) => {
        if (groupRef.current && isPresenting && listVisible) {
            // Smooth lerp towards camera position
            const targetX = camera.position.x - 0.5
            const targetY = camera.position.y
            const targetZ = camera.position.z - 1.0

            groupRef.current.position.x += (targetX - groupRef.current.position.x) * 0.05
            groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.05
            groupRef.current.position.z += (targetZ - groupRef.current.position.z) * 0.05

            // Look at camera
            groupRef.current.lookAt(camera.position)
        }
    })

    if (!listVisible) return null

    const panelWidth = SIZES.PANEL.PACKING_LIST[0]
    const panelHeight = SIZES.PANEL.PACKING_LIST[1]
    const progressBarWidth = 0.4
    const progressFill = (progress / 100) * progressBarWidth

    return (
        <group
            ref={groupRef}
            position={isPresenting ? POSITIONS.PACKING_LIST_3D : POSITIONS.PACKING_LIST}
        >
            {/* Background Panel */}
            <mesh>
                <planeGeometry args={[panelWidth, panelHeight]} />
                <meshBasicMaterial
                    color={COLORS.BACKGROUND}
                    transparent
                    opacity={0.85}
                />
            </mesh>

            {/* Border glow effect */}
            <mesh position={[0, 0, -0.001]}>
                <planeGeometry args={[panelWidth + 0.02, panelHeight + 0.02]} />
                <meshBasicMaterial
                    color={COLORS.PRIMARY}
                    transparent
                    opacity={0.3}
                />
            </mesh>

            {/* Title */}
            <Text
                position={[0, 0.35, 0.01]}
                fontSize={SIZES.TEXT.TITLE}
                color={COLORS.PRIMARY}
                anchorX="center"
                anchorY="middle"
                font="/fonts/inter-bold.woff"
            >
                🎒 PACKING LIST
            </Text>

            {/* Progress text */}
            <Text
                position={[0, 0.28, 0.01]}
                fontSize={SIZES.TEXT.SMALL}
                color={COLORS.TEXT}
                anchorX="center"
                anchorY="middle"
            >
                {packedCount} / {totalCount} packed ({Math.round(progress)}%)
            </Text>

            {/* Progress bar background */}
            <mesh position={[0, 0.22, 0.01]}>
                <planeGeometry args={[progressBarWidth, 0.02]} />
                <meshBasicMaterial color="#333333" />
            </mesh>

            {/* Progress bar fill */}
            {progressFill > 0 && (
                <mesh position={[(-progressBarWidth/2 + progressFill/2), 0.22, 0.011]}>
                    <planeGeometry args={[progressFill, 0.02]} />
                    <meshBasicMaterial color={progress >= 100 ? COLORS.SUCCESS : COLORS.PRIMARY} />
                </mesh>
            )}

            {/* Items list */}
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
                fontSize={SIZES.TEXT.SMALL}
                color={COLORS.PRIMARY}
                anchorX="center"
                anchorY="middle"
                fillOpacity={0.7}
            >
                {isPresenting ? 'Use trigger to pack items' : 'Click items to pack'}
            </Text>
        </group>
    )
}

export default memo(PackingList)
