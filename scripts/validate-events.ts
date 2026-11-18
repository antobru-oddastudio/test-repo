import data from '../src/data/events.json';
import type { EventsFile } from '../src/domain/event';
import { validateEvents } from '../src/domain/validate';

const errors = validateEvents(data as EventsFile);
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`events.json OK (${data.events.length} events)`);
