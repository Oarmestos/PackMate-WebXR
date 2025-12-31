import { useEffect, useCallback } from 'react'
import { useXR } from '@react-three/xr'
import { usePackingStore } from '../store/packingStore'
import { KEYBOARD, TIMING } from '../config/constants'
import { playSound } from '../hooks/useAudio'

/**
 * Keyboard and controller input handler
 * Manages keyboard shortcuts and VR controller events
 */
function HandController() {
    // v6 API: useXR with selector to get session state
    const session = useXR((state) => state.session)
    const isPresenting = !!session

    const toggleListVisible = usePackingStore(state => state.toggleListVisible)
    const setListVisible = usePackingStore(state => state.setListVisible)
    const resetPacking = usePackingStore(state => state.resetPacking)

    const showHelp = useCallback(() => {
        console.log('%c🎒 PackMate WebXR Controls', 'font-size: 16px; font-weight: bold; color: #00FFFF')
        console.log('%c─────────────────────────', 'color: #00FFFF')
        console.log(`%c${KEYBOARD.TOGGLE_LIST.toUpperCase()}%c - Toggle packing list`, 'color: #00FF00; font-weight: bold', 'color: inherit')
        console.log(`%c${KEYBOARD.RESET.toUpperCase()}%c - Reset all items`, 'color: #00FF00; font-weight: bold', 'color: inherit')
        console.log(`%c${KEYBOARD.HELP.toUpperCase()}%c - Show this help`, 'color: #00FF00; font-weight: bold', 'color: inherit')
        console.log('%c─────────────────────────', 'color: #00FFFF')
        console.log('Click on items to pack them')
        if (isPresenting) {
            console.log('%cVR Mode:%c Use trigger to select, grip to toggle menu', 'color: #00FFFF; font-weight: bold', 'color: inherit')
        }
    }, [isPresenting])

    useEffect(() => {
        const handleKeyPress = (e) => {
            const key = e.key.toLowerCase()

            switch (key) {
                case KEYBOARD.TOGGLE_LIST:
                    toggleListVisible()
                    playSound('CLICK', 0.3)
                    break
                case KEYBOARD.RESET:
                    resetPacking()
                    playSound('CLICK', 0.3)
                    console.log('%c🔄 Packing list reset!', 'color: #00FFFF')
                    break
                case KEYBOARD.HELP:
                    showHelp()
                    break
                default:
                    break
            }
        }

        window.addEventListener('keypress', handleKeyPress)

        // Auto-show list after delay for demo
        const timer = setTimeout(() => {
            setListVisible(true)
        }, TIMING.AUTO_SHOW_LIST_MS)

        // Show help on first load
        console.log('%c🎒 PackMate WebXR loaded! Press H for controls.', 'color: #00FFFF; font-weight: bold')

        return () => {
            window.removeEventListener('keypress', handleKeyPress)
            clearTimeout(timer)
        }
    }, [toggleListVisible, setListVisible, resetPacking, showHelp])

    // This component handles input only, no visual rendering
    // XR-specific interaction is handled by XRInteraction component
    return null
}

export default HandController
