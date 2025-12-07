import React, { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { usePackingStore } from '../store/packingStore'
import * as THREE from 'three'

function PackedItems() {
    const items = usePackingStore(state => state.items)
    const suitcasePosition = [0, 0.6, -2.5]
    const suitcaseSize = [1.8, 1.2, 0.9]

    const packedItems = items.filter(item => item.packed)

    return (
        <group position={suitcasePosition}>
            {packedItems.map((item, index) => {
                // Distribute items inside suitcase (3 columns, multiple rows)
                const cols = 3
                const row = Math.floor(index / cols)
                const col = index % cols

                // Position items INSIDE the suitcase
                const x = (col - 1) * 0.45  // Spread horizontally
                const y = -0.2 + row * 0.3  // Stack vertically INSIDE (not below)
                const z = 0

                return (
                    <PackedItemCube
                        key={item.id}
                        position={[x, y, z]}
                        itemName={item.name}
                        index={index}
                    />
                )
            })}
        </group>
    )
}

function PackedItemCube({ position, itemName, index }) {
    const meshRef = useRef()
    const [appeared, setAppeared] = React.useState(false)

    useEffect(() => {
        // Delay appearance for stagger effect
        const timer = setTimeout(() => setAppeared(true), index * 100)
        return () => clearTimeout(timer)
    }, [index])

    useFrame((state) => {
        if (meshRef.current && appeared) {
            // Gentle floating animation
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + index) * 0.02
            meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime + index) * 0.1
        }
    })

    if (!appeared) return null

    return (
        <group position={position}>
            <mesh ref={meshRef}>
                <boxGeometry args={[0.25, 0.25, 0.25]} />
                <meshStandardMaterial
                    color="#00FFFF"
                    emissive="#00FFFF"
                    emissiveIntensity={0.5}
                    metalness={0.8}
                    roughness={0.2}
                />
            </mesh>

            {/* Label */}
            <Text
                position={[0, 0.2, 0]}
                fontSize={0.06}
                color="#FFFFFF"
                anchorX="center"
                anchorY="bottom"
                outlineWidth={0.005}
                outlineColor="#000000"
            >
                {itemName.substring(0, 4)}
            </Text>
        </group>
    )
}

export default PackedItems
