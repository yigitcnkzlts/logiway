// src/components/Map.jsx
import "./Map.css";

export default function Map() {
  // Dummy araç ve yük konumları
  const truckPos = { x: 60, y: 140 };
  const loadPos = { x: 220, y: 60 };

  return (
    <div className="map-container">
      <div className="map-box">
        
        {/* Rota çizgisi */}
        <svg className="map-line">
          <line
            x1={truckPos.x}
            y1={truckPos.y}
            x2={loadPos.x}
            y2={loadPos.y}
            stroke="#38bdf8"
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>

        {/* Araç markerı */}
        <div
          className="marker truck"
          style={{ left: truckPos.x, top: truckPos.y }}
        >
          🚚
        </div>

        {/* Yük markerı */}
        <div
          className="marker load"
          style={{ left: loadPos.x, top: loadPos.y }}
        >
          📦
        </div>
      </div>

      <p className="map-label">Mini Harita (Araç → Yük Rota)</p>
    </div>
  );
}