import { create } from 'zustand'

export const usePackingStore = create((set) => ({
    // Packing items
    items: [
        { id: 1, name: 'Shirts', packed: false, category: 'Clothing' },
        { id: 2, name: 'Pants', packed: false, category: 'Clothing' },
        { id: 3, name: 'Passport', packed: false, category: 'Documents' },
        { id: 4, name: 'Wallet', packed: false, category: 'Documents' },
        { id: 5, name: 'Phone Charger', packed: false, category: 'Electronics' },
        { id: 6, name: 'Headphones', packed: false, category: 'Electronics' },
        { id: 7, name: 'Toothbrush', packed: false, category: 'Toiletries' },
        { id: 8, name: 'Shoes', packed: false, category: 'Clothing' },
    ],

    // UI state
    listVisible: false,
    grabbedItem: null,
    suitcaseDetected: false,
    suitcasePosition: null,
    completionShown: false,

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

    setListVisible: (visible) => set({ listVisible: visible }),

    setGrabbedItem: (item) => set({ grabbedItem: item }),

    setSuitcaseDetected: (detected, position = null) => set({
        suitcaseDetected: detected,
        suitcasePosition: position
    }),

    resetPacking: () => set((state) => ({
        items: state.items.map(item => ({ ...item, packed: false })),
        grabbedItem: null,
        completionShown: false
    })),

    // Computed
    get packedCount() {
        return this.items.filter(item => item.packed).length
    },

    get totalCount() {
        return this.items.length
    },

    get isComplete() {
        return this.items.every(item => item.packed)
    }
}))
