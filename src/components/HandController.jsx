import { useEffect } from 'react'
import { useXR } from '@react-three/xr'
import { usePackingStore } from '../store/packingStore'

function HandController() {
    const { controllers } = useXR()
    const setListVisible = usePackingStore(state => state.setListVisible)
    const listVisible = usePackingStore(state => state.listVisible)
    const resetPacking = usePackingStore(state => state.resetPacking)

    useEffect(() => {
        // Keyboard controls for testing
        const handleKeyPress = (e) => {
            switch (e.key.toLowerCase()) {
                case 'l':
                    // Toggle list visibility
                    setListVisible(!listVisible)
                    break
                case 'r':
                    // Reset packing
                    resetPacking()
                    break
                case 'h':
                    // Show help
                    console.log('Keyboard Controls:')
                    console.log('L - Toggle packing list')
                    console.log('R - Reset all items')
                    console.log('H - Show this help')
                    console.log('Click on items to pack them')
                    break
                default:
                    break
            }
        }

        window.addEventListener('keypress', handleKeyPress)

        // Auto-show list after 1 second for demo
        const timer = setTimeout(() => {
            setListVisible(true)
        }, 1000)

        return () => {
            window.removeEventListener('keypress', handleKeyPress)
            clearTimeout(timer)
        }
    }, [setListVisible, listVisible, resetPacking])

    // TODO: Implement real hand tracking when in VR mode
    // This will use the controllers from useXR() to detect:
    // - Left hand open palm gesture -> show/hide list
    // - Right hand pinch gesture -> grab items
    // - Hand position tracking for drag & drop

    return null // This component doesn't render anything visible
}

export default HandController
