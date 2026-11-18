import type { Lang } from '../domain/event';
import { TZ } from '../domain/filters';

export const formatDateTime = (iso: string, lang: Lang, tz = TZ) =>
  new Intl.DateTimeFormat(lang, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: tz,
    timeZoneName: 'short',
  }).format(new Date(iso));
