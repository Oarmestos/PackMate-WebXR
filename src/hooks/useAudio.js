import { useRef, useCallback, useEffect } from 'react'
import { SOUNDS } from '../config/constants'

/**
 * Audio hook for PackMate sound effects
 * Preloads sounds and provides play function
 */
export function useAudio() {
    const soundsRef = useRef({})
    const enabledRef = useRef(true)

    // Preload sounds on mount
    useEffect(() => {
        const soundEntries = Object.entries(SOUNDS)
        
        soundEntries.forEach(([key, path]) => {
            try {
                const audio = new Audio(path)
                audio.preload = 'auto'
                audio.volume = 0.5
                soundsRef.current[key.toLowerCase()] = audio
            } catch (error) {
                console.warn(`Failed to load sound: ${key}`, error)
            }
        })

        return () => {
            // Cleanup audio objects
            Object.values(soundsRef.current).forEach(audio => {
                audio.pause()
                audio.src = ''
            })
        }
    }, [])

    /**
     * Play a sound effect
     * @param {string} soundName - Name of sound (pack, complete, click, error)
     * @param {number} volume - Optional volume (0-1)
     */
    const play = useCallback((soundName, volume = 0.5) => {
        if (!enabledRef.current) return
        
        const audio = soundsRef.current[soundName.toLowerCase()]
        if (audio) {
            try {
                audio.currentTime = 0
                audio.volume = volume
                audio.play().catch(() => {
                    // Ignore autoplay restrictions
                })
            } catch (error) {
                console.warn(`Failed to play sound: ${soundName}`, error)
            }
        }
    }, [])

    /**
     * Play pack sound
     */
    const playPack = useCallback(() => play('pack', 0.6), [play])

    /**
     * Play completion sound
     */
    const playComplete = useCallback(() => play('complete', 0.8), [play])

    /**
     * Play click/UI sound
     */
    const playClick = useCallback(() => play('click', 0.4), [play])

    /**
     * Play error sound
     */
    const playError = useCallback(() => play('error', 0.5), [play])

    /**
     * Enable/disable sounds
     */
    const setEnabled = useCallback((enabled) => {
        enabledRef.current = enabled
    }, [])

    return {
        play,
        playPack,
        playComplete,
        playClick,
        playError,
        setEnabled,
        isEnabled: () => enabledRef.current,
    }
}

/**
 * Simple sound player without hook (for use in stores/handlers)
 */
export const playSound = (soundName, volume = 0.5) => {
    try {
        const path = SOUNDS[soundName.toUpperCase()]
        if (path) {
            const audio = new Audio(path)
            audio.volume = volume
            audio.play().catch(() => {})
        }
    } catch (error) {
        // Ignore errors
    }
}

