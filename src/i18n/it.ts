export default {
  app: { title: 'Addo.', language: 'Lingua' },
  filters: {
    type: 'Tipologia',
    all: 'Tutte',
    title: 'Titolo',
    titlePlaceholder: 'Cerca per titolo',
    date: 'Data (AAAA-MM-GG)',
    today: 'Oggi',
    anyDate: 'Qualsiasi data',
  },
  types: { music: 'Musica', food: 'Cibo', art: 'Arte', sport: 'Sport' },
  view: { map: 'Mappa', list: 'Elenco' },
  results: {
    empty: 'Nessun evento corrisponde ai filtri.',
    count_one: '{{count}} evento',
    count_other: '{{count}} eventi',
  },
  map: {
    error: 'La mappa non è disponibile. Usa l’elenco.',
    attribution: '© collaboratori di OpenStreetMap',
  },
  event: {
    start: 'Inizio',
    end: 'Fine',
    organizer: 'Organizzatore',
    venue: 'Luogo',
    open: 'Apri dettaglio',
    back: 'Torna agli eventi',
    notFound: 'Evento non trovato.',
    posterMissing: 'Locandina non disponibile',
  },
};
