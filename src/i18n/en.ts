import type it from './it';

const en: typeof it = {
  app: { title: 'Addo.', language: 'Language' },
  filters: {
    type: 'Type',
    all: 'All',
    title: 'Title',
    titlePlaceholder: 'Search by title',
    date: 'Date (YYYY-MM-DD)',
    today: 'Today',
    anyDate: 'Any date',
  },
  types: { music: 'Music', food: 'Food', art: 'Art', sport: 'Sport' },
  view: { map: 'Map', list: 'List' },
  results: {
    empty: 'No events match the filters.',
    count_one: '{{count}} event',
    count_other: '{{count}} events',
  },
  map: { error: 'The map is unavailable. Use the list.', attribution: '© OpenStreetMap contributors' },
  event: {
    start: 'Start',
    end: 'End',
    organizer: 'Organizer',
    venue: 'Venue',
    open: 'Open details',
    back: 'Back to events',
    notFound: 'Event not found.',
    posterMissing: 'Poster not available',
  },
};
export default en;
