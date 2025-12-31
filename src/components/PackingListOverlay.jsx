import { memo, useCallback } from 'react'
import { usePackingStore, selectPackedCount, selectTotalCount, selectProgress } from '../store/packingStore'
import { playSound } from '../hooks/useAudio'
import './PackingListOverlay.css'

/**
 * HTML-based packing list overlay
 * Used for desktop view (hidden in VR mode)
 */
const PackingListOverlay = memo(function PackingListOverlay() {
    const items = usePackingStore(state => state.items)
    const listVisible = usePackingStore(state => state.listVisible)
    const isVRMode = usePackingStore(state => state.isVRMode)
    const setListVisible = usePackingStore(state => state.setListVisible)
    const packItem = usePackingStore(state => state.packItem)
    const unpackItem = usePackingStore(state => state.unpackItem)

    const packedCount = usePackingStore(selectPackedCount)
    const totalCount = usePackingStore(selectTotalCount)
    const progress = usePackingStore(selectProgress)

    const handleItemClick = useCallback((item) => {
        if (!item.packed) {
            packItem(item.id)
            playSound('PACK', 0.5)
        }
    }, [packItem])

    const handleItemRightClick = useCallback((e, item) => {
        e.preventDefault()
        if (item.packed) {
            unpackItem(item.id)
            playSound('CLICK', 0.3)
        }
    }, [unpackItem])

    const handleClose = useCallback(() => {
        setListVisible(false)
        playSound('CLICK', 0.3)
    }, [setListVisible])

    // Don't show in VR mode or if not visible
    if (!listVisible || isVRMode) return null

    return (
        <div className="packing-list-overlay">
            <div className="packing-list-panel">
                {/* Header */}
                <div className="packing-list-header">
                    <h2 className="packing-list-title">🎒 PACKING LIST</h2>
                    <button
                        className="close-button"
                        onClick={handleClose}
                        aria-label="Close packing list"
                    >
                        ✕
                    </button>
                </div>

                {/* Progress */}
                <div className="progress-section">
                    <p className="progress-text">
                        {packedCount} / {totalCount} packed ({Math.round(progress)}%)
                    </p>
                    <div className="progress-bar-bg">
                        <div
                            className={`progress-bar-fill ${progress >= 100 ? 'complete' : ''}`}
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                </div>

                {/* Items List */}
                <div className="items-list">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className={`packing-item ${item.packed ? 'packed' : ''}`}
                            onClick={() => handleItemClick(item)}
                            onContextMenu={(e) => handleItemRightClick(e, item)}
                            role="button"
                            tabIndex={0}
                            aria-pressed={item.packed}
                            aria-label={`${item.name} - ${item.packed ? 'packed' : 'not packed'}`}
                        >
                            <span className="item-icon">
                                {item.icon || (item.packed ? '✓' : '○')}
                            </span>
                            <span className="item-name">{item.name}</span>
                            <span className="item-category">{item.category}</span>
                            {item.packed && (
                                <span className="item-status">✓</span>
                            )}
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="packing-list-footer">
                    <p className="hint-text">
                        Click to pack • Right-click to unpack
                    </p>
                </div>
            </div>
        </div>
    )
})

export default PackingListOverlay
