import { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { markerPositions, type EventMapProps } from './types';

// OSM tile policy: standard tiles for internal testing only; no prefetch/offline; browser sends Referer + HTTP cache.
const TILES = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';

export default function EventMap({ events, selectedId, onSelect, onError }: EventMapProps) {
  const el = useRef<HTMLDivElement>(null);
  const cb = useRef({ onSelect, onError });
  useEffect(() => {
    cb.current = { onSelect, onError };
  });

  useEffect(() => {
    let map: import('leaflet').Map | undefined;
    let cancelled = false;
    // Leaflet touches window/document: load it only in the browser, lazily.
    void import('leaflet').then((L) => {
      if (cancelled || !el.current) return;
      map = L.map(el.current).setView([44.4939, 11.343], 13);
      L.tileLayer(TILES, {
        maxZoom: 19,
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      })
        .on('tileerror', () => cb.current.onError())
        .addTo(map);
      const pos = markerPositions(events);
      const byId = new Map(events.map((e) => [e.id, e]));
      pos.forEach((p) => {
        const e = byId.get(p.id)!;
        const m = L.marker([p.lat, p.lng], { title: e.title.it, alt: e.title.it, keyboard: true }).addTo(
          map!,
        );
        m.on('click', () => cb.current.onSelect(p.id));
        m.getElement()?.setAttribute('data-testid', `marker-${p.id}`);
        if (p.id === selectedId) m.getElement()?.setAttribute('data-selected', 'true');
      });
    });
    return () => {
      cancelled = true;
      map?.remove();
    };
  }, [events, selectedId]);

  return (
    <View testID="map" className="h-72 w-full">
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
      <div ref={el} style={{ height: '100%', width: '100%' }} />
    </View>
  );
}
