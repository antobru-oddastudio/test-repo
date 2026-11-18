import type { AddoEvent } from '../domain/event';

/** Shared contract for the web (Leaflet) and native (MapLibre) maps. */
export interface EventMapProps {
  events: AddoEvent[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  /** Called when tiles cannot be loaded; the list stays usable. */
  onError: () => void;
}

/** Events sharing coordinates get a small deterministic offset (~10 m per step) so every marker is selectable. */
export function markerPositions(events: AddoEvent[]): { id: string; lat: number; lng: number }[] {
  const seen = new Map<string, number>();
  return events.map((e) => {
    const key = `${e.lat},${e.lng}`;
    const n = seen.get(key) ?? 0;
    seen.set(key, n + 1);
    return { id: e.id, lat: e.lat + n * 0.0001, lng: e.lng + n * 0.0001 };
  });
}
