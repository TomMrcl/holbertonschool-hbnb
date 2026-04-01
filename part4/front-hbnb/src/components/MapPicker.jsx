import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

export default function MapPicker({ latitude, longitude, onMapPick, onLocationChange }) {
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const markerRef = useRef(null);

  // Support both prop names for compatibility
  const handleLocationChange = onMapPick || onLocationChange;

  useEffect(() => {
    if (!mapRef.current) return;

    // Initialize map
    if (!mapInstanceRef.current) {
      mapInstanceRef.current = L.map(mapRef.current).setView(
        [latitude || 48.8566, longitude || 2.3522],
        12
      );

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
      }).addTo(mapInstanceRef.current);

      // Handle map clicks
      mapInstanceRef.current.on('click', (e) => {
        const { lat, lng } = e.latlng;
        if (handleLocationChange) {
          handleLocationChange(lat, lng);
        }
        updateMarker(lat, lng);
      });
    }

    // Update marker if coordinates change
    if (latitude && longitude) {
      updateMarker(latitude, longitude);
      mapInstanceRef.current.setView([latitude, longitude], 12);
    }
  }, [latitude, longitude, handleLocationChange]);

  const updateMarker = (lat, lng) => {
    if (markerRef.current) {
      markerRef.current.setLatLng([lat, lng]);
    } else {
      markerRef.current = L.marker([lat, lng]).addTo(mapInstanceRef.current);
    }
  };

  return (
    <div className="w-full h-64 rounded-lg overflow-hidden border border-gray-300">
      <div ref={mapRef} className="w-full h-full" />
    </div>
  );
}
