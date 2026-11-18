import { EVENT_TYPES, type EventsFile } from './event';

const OFFSET_RE = /(Z|[+-]\d{2}:\d{2})$/;
const LANGS = ['it', 'en'] as const;
const LOCALIZED = ['title', 'description', 'venue', 'posterAlt'] as const;

/** Returns errors as "event <id> / <field>: <problem>"; empty array = valid. */
export function validateEvents(file: EventsFile): string[] {
  const errors: string[] = [];
  const seen = new Set<string>();
  file.events.forEach((e, i) => {
    const at = (field: string, msg: string) => errors.push(`event ${e.id ?? `#${i}`} / ${field}: ${msg}`);
    if (!e.id) at('id', 'missing');
    else if (seen.has(e.id)) at('id', 'duplicate');
    seen.add(e.id);
    if (!(EVENT_TYPES as readonly string[]).includes(e.type)) at('type', 'unknown type');
    for (const f of LOCALIZED)
      for (const l of LANGS) if (!e[f]?.[l]?.trim()) at(`${f}.${l}`, 'missing translation');
    for (const f of ['organizer', 'poster'] as const) if (!e[f]?.trim()) at(f, 'missing');
    if (!(e.lat >= -90 && e.lat <= 90)) at('lat', 'out of range');
    if (!(e.lng >= -180 && e.lng <= 180)) at('lng', 'out of range');
    const ts = (['start', 'end'] as const).map((f) => {
      const v = e[f];
      const t = typeof v === 'string' && OFFSET_RE.test(v) ? Date.parse(v) : NaN;
      if (Number.isNaN(t)) at(f, 'invalid date or missing explicit timezone offset');
      return t;
    });
    if (ts[1] < ts[0]) at('end', 'before start');
  });
  return errors;
}
