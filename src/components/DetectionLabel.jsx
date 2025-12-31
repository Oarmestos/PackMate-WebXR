import { memo } from 'react'
import { usePackingStore, selectPackedCount, selectTotalCount } from '../store/packingStore'
import './DetectionLabel.css'

/**
 * Detection status label overlay
 * Shows suitcase detection status and quick stats
 */
const DetectionLabel = memo(function DetectionLabel() {
    const suitcaseDetected = usePackingStore(state => state.suitcaseDetected)
    const isVRMode = usePackingStore(state => state.isVRMode)
    const packedCount = usePackingStore(selectPackedCount)
    const totalCount = usePackingStore(selectTotalCount)

    // Don't show HTML overlay in VR mode
    if (!suitcaseDetected || isVRMode) return null

    return (
        <div className="detection-label">
            <div className="detection-panel">
                <div className="detection-title">✓ Suitcase Detected</div>
                <div className="detection-confidence">Confidence: 92%</div>
                <div className="detection-stats">
                    {packedCount}/{totalCount} items packed
                </div>
            </div>
        </div>
    )
})

export default DetectionLabel
