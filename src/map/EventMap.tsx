import { Camera, Map, Marker } from '@maplibre/maplibre-react-native';
import { Pressable, View } from 'react-native';
import { markerPositions, type EventMapProps } from './types';

// Native (Android/iOS) map; needs a development build (no Expo Go). Raster OSM for internal tests only; no offline packs.
const STYLE = {
  version: 8 as const,
  sources: {
    osm: {
      type: 'raster' as const,
      tiles: ['https://tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      maxzoom: 19,
      attribution: '© OpenStreetMap contributors',
    },
  },
  layers: [{ id: 'osm', type: 'raster' as const, source: 'osm' }],
};

export default function EventMap({ events, selectedId, onSelect, onError }: EventMapProps) {
  return (
    <View testID="map" className="h-72 w-full">
      <Map style={{ flex: 1 }} mapStyle={STYLE} attribution onDidFailLoadingMap={onError}>
        <Camera initialViewState={{ center: [11.343, 44.4939], zoom: 12 }} />
        {markerPositions(events).map((p) => (
          <Marker key={p.id} id={`marker-${p.id}`} lngLat={[p.lng, p.lat]} selected={p.id === selectedId}>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={events.find((e) => e.id === p.id)?.title.it}
              onPress={() => onSelect(p.id)}
              className={`h-touch w-touch rounded-full border-2 border-white ${p.id === selectedId ? 'bg-brand-dark' : 'bg-brand'}`}
            />
          </Marker>
        ))}
      </Map>
    </View>
  );
}
