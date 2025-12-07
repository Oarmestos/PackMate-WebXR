import { usePackingStore } from '../store/packingStore'
import './PackingListOverlay.css'

function PackingListOverlay() {
    const items = usePackingStore(state => state.items)
    const listVisible = usePackingStore(state => state.listVisible)
    const setListVisible = usePackingStore(state => state.setListVisible)
    const packItem = usePackingStore(state => state.packItem)

    const packedCount = items.filter(i => i.packed).length
    const totalCount = items.length
    const progressPercent = (packedCount / totalCount) * 100

    if (!listVisible) return null

    return (
        <div className="packing-list-overlay">
            <div className="packing-list-panel">
                {/* Header */}
                <div className="packing-list-header">
                    <h2 className="packing-list-title">PACKING LIST</h2>
                    <button
                        className="close-button"
                        onClick={() => setListVisible(false)}
                        aria-label="Close packing list"
                    >
                        ✕
                    </button>
                </div>

                {/* Progress */}
                <div className="progress-section">
                    <p className="progress-text">{packedCount} / {totalCount} packed</p>
                    <div className="progress-bar-bg">
                        <div
                            className="progress-bar-fill"
                            style={{ width: `${progressPercent}%` }}
                        />
                    </div>
                </div>

                {/* Items List */}
                <div className="items-list">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className={`packing-item ${item.packed ? 'packed' : ''}`}
                            onClick={(e) => {
                                e.stopPropagation()
                                if (!item.packed) {
                                    packItem(item.id)
                                }
                            }}
                            style={{ cursor: item.packed ? 'default' : 'pointer' }}
                        >
                            <span className="checkbox">
                                {item.packed ? '✓' : '○'}
                            </span>
                            <span className="item-name">{item.name}</span>
                        </div>
                    ))}
                </div>

                {/* Footer */}
                <div className="packing-list-footer">
                    <p className="hint-text">Click items to pack</p>
                </div>
            </div>
        </div>
    )
}

export default PackingListOverlay
