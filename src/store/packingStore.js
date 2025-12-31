import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { DEFAULT_ITEMS } from '../config/constants'

/**
 * PackMate Packing Store
 * Manages packing list state with persistence
 */
export const usePackingStore = create(
    persist(
        (set, get) => ({
            // Packing items with icons from constants
            items: DEFAULT_ITEMS.map(item => ({ ...item, packed: false })),

            // UI state
            listVisible: false,
            grabbedItem: null,
            suitcaseDetected: false,
            suitcasePosition: null,
            completionShown: false,
            isVRMode: false,

            // Actions
            toggleItem: (id) => set((state) => ({
                items: state.items.map(item =>
                    item.id === id ? { ...item, packed: !item.packed } : item
                )
            })),

            packItem: (id) => set((state) => ({
                items: state.items.map(item =>
                    item.id === id ? { ...item, packed: true } : item
                ),
                grabbedItem: null
            })),

            unpackItem: (id) => set((state) => ({
                items: state.items.map(item =>
                    item.id === id ? { ...item, packed: false } : item
                )
            })),

            setListVisible: (visible) => set({ listVisible: visible }),

            toggleListVisible: () => set((state) => ({ listVisible: !state.listVisible })),

            setGrabbedItem: (item) => set({ grabbedItem: item }),

            setSuitcaseDetected: (detected, position = null) => set({
                suitcaseDetected: detected,
                suitcasePosition: position
            }),

            setVRMode: (isVR) => set({ isVRMode: isVR }),

            resetPacking: () => set((state) => ({
                items: state.items.map(item => ({ ...item, packed: false })),
                grabbedItem: null,
                completionShown: false
            })),

            setCompletionShown: (shown) => set({ completionShown: shown }),
        }),
        {
            name: 'packmate-storage',
            partialize: (state) => ({
                items: state.items,
            }),
        }
    )
)

// ============================================
// SELECTORS (use these instead of getters)
// ============================================
export const selectPackedCount = (state) =>
    state.items.filter(item => item.packed).length

export const selectTotalCount = (state) =>
    state.items.length

export const selectIsComplete = (state) =>
    state.items.every(item => item.packed)

export const selectProgress = (state) => {
    const packed = state.items.filter(item => item.packed).length
    const total = state.items.length
    return total > 0 ? (packed / total) * 100 : 0
}

export const selectUnpackedItems = (state) =>
    state.items.filter(item => !item.packed)

export const selectPackedItems = (state) =>
    state.items.filter(item => item.packed)
