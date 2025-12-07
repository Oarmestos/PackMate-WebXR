import { usePackingStore } from '../store/packingStore'
import './DetectionLabel.css'

function DetectionLabel() {
    const suitcaseDetected = usePackingStore(state => state.suitcaseDetected)

    if (!suitcaseDetected) return null

    return (
        <div className="detection-label">
            <div className="detection-panel">
                <div className="detection-title">✓ Suitcase Detected</div>
                <div className="detection-confidence">Confidence: 92%</div>
            </div>
        </div>
    )
}

export default DetectionLabel
