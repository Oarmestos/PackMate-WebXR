import { useEffect, useCallback } from 'react'
import { useFrame } from '@react-three/fiber'
import { useXRInputSourceState, useXRInputSourceEvent } from '@react-three/xr'
import { usePackingStore } from '../store/packingStore'
import { XR_CONFIG } from '../config/constants'

/**
 * XR Interaction Component
 * Handles VR controller input and haptic feedback
 * Uses @react-three/xr v6 API
 */
function XRInteraction() {
    // Get controller states using v6 API
    const rightController = useXRInputSourceState('controller', 'right')
    const leftController = useXRInputSourceState('controller', 'left')

    // Store actions
    const packItem = usePackingStore(state => state.packItem)
    const toggleListVisible = usePackingStore(state => state.toggleListVisible)
    const setVRMode = usePackingStore(state => state.setVRMode)
    const isVRMode = usePackingStore(state => state.isVRMode)

    // Update VR mode when controllers become available/unavailable
    useEffect(() => {
        const hasControllers = !!(rightController || leftController)
        if (hasControllers !== isVRMode) {
            setVRMode(hasControllers)
        }
    }, [rightController, leftController, isVRMode, setVRMode])

    /**
     * Trigger haptic feedback on input source
     */
    const triggerHaptic = useCallback((inputSource, intensity = XR_CONFIG.HAPTIC_INTENSITY) => {
        if (!inputSource?.gamepad?.hapticActuators?.[0]) return

        try {
            inputSource.gamepad.hapticActuators[0].pulse(
                intensity,
                XR_CONFIG.HAPTIC_DURATION
            )
        } catch (error) {
            // Haptics not supported on this device
        }
    }, [])

    // Handle select events on right controller
    useXRInputSourceEvent(
        rightController?.inputSource,
        'selectstart',
        useCallback((event) => {
            triggerHaptic(event.inputSource, 0.5)
            // Note: Actual item selection is handled by pointer events in InteractiveItem
            console.log('XR Select: Right controller triggered')
        }, [triggerHaptic]),
        [triggerHaptic]
    )

    // Handle select events on left controller
    useXRInputSourceEvent(
        leftController?.inputSource,
        'selectstart',
        useCallback((event) => {
            triggerHaptic(event.inputSource, 0.5)
            console.log('XR Select: Left controller triggered')
        }, [triggerHaptic]),
        [triggerHaptic]
    )

    // Handle squeeze (grip) on right controller - toggle list
    useXRInputSourceEvent(
        rightController?.inputSource,
        'squeezestart',
        useCallback((event) => {
            toggleListVisible()
            triggerHaptic(event.inputSource, 0.3)
            console.log('XR Squeeze: Toggling list visibility')
        }, [toggleListVisible, triggerHaptic]),
        [toggleListVisible, triggerHaptic]
    )

    // Handle squeeze on left controller - also toggle list
    useXRInputSourceEvent(
        leftController?.inputSource,
        'squeezestart',
        useCallback((event) => {
            toggleListVisible()
            triggerHaptic(event.inputSource, 0.3)
        }, [toggleListVisible, triggerHaptic]),
        [toggleListVisible, triggerHaptic]
    )

    // This component only handles events, no visual rendering needed
    // Controller visuals are handled by default XR components
    return null
}

export default XRInteraction

