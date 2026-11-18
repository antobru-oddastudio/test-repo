import { useRouter } from 'expo-router';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text, View } from 'react-native';
import { Button, Card, Field, Poster } from '../src/components/ui';
import { EVENT_TYPES, type Lang } from '../src/domain/event';
import { filterEvents, initialFilters, type Filters } from '../src/domain/filters';
import { eventRepository } from '../src/data/eventRepository';
import { formatDateTime } from '../src/lib/format';
import { now } from '../src/lib/clock';
import EventMap from '../src/map/EventMap';

export default function Explore() {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const lang = (i18n.language === 'en' ? 'en' : 'it') as Lang;
  const [filters, setFilters] = useState<Filters>(() => initialFilters(now));
  const [view, setView] = useState<'map' | 'list'>('map');
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mapFailed, setMapFailed] = useState(false);

  const results = useMemo(() => filterEvents(eventRepository.list(), filters, lang), [filters, lang]);
  // A selection excluded by new filters is dropped: no stale preview.
  const selected = results.find((e) => e.id === selectedId) ?? null;
  const set = (p: Partial<Filters>) => setFilters((f) => ({ ...f, ...p }));
  const open = (id: string) => router.push({ pathname: '/events/[id]', params: { id } });

  return (
    <ScrollView className="bg-white" contentContainerClassName="gap-3 p-4">
      <View className="flex-row gap-2" accessibilityRole="toolbar">
        {(['it', 'en'] as Lang[]).map((l) => (
          <Button
            key={l}
            label={l.toUpperCase()}
            selected={lang === l}
            onPress={() => void i18n.changeLanguage(l)}
          />
        ))}
      </View>
      <View className="flex-row flex-wrap gap-2">
        <Button label={t('filters.all')} selected={!filters.type} onPress={() => set({ type: null })} />
        {EVENT_TYPES.map((k) => (
          <Button
            key={k}
            label={t(`types.${k}`)}
            selected={filters.type === k}
            onPress={() => set({ type: k })}
          />
        ))}
      </View>
      <View className="flex-row flex-wrap gap-2">
        <Field
          label={t('filters.title')}
          placeholder={t('filters.titlePlaceholder')}
          value={filters.title}
          onChangeText={(title) => set({ title })}
        />
        <Field
          label={t('filters.date')}
          value={filters.date ?? ''}
          onChangeText={(v) => set({ date: v || null })}
        />
      </View>
      <View className="flex-row flex-wrap gap-2">
        <Button label={t('filters.today')} onPress={() => set({ date: initialFilters(now).date })} />
        <Button label={t('filters.anyDate')} onPress={() => set({ date: null })} />
        <Button label={t('view.map')} selected={view === 'map'} onPress={() => setView('map')} />
        <Button label={t('view.list')} selected={view === 'list'} onPress={() => setView('list')} />
      </View>
      <Text accessibilityLiveRegion="polite" testID="count" className="text-muted">
        {t('results.count', { count: results.length })}
      </Text>
      {results.length === 0 && (
        <Text testID="empty" className="text-ink">
          {t('results.empty')}
        </Text>
      )}
      {view === 'map' && results.length > 0 && (
        <>
          {mapFailed ? (
            <Text testID="map-error" accessibilityRole="alert" className="text-ink">
              {t('map.error')}
            </Text>
          ) : (
            <EventMap
              events={results}
              selectedId={selected?.id ?? null}
              onSelect={setSelectedId}
              onError={() => setMapFailed(true)}
            />
          )}
          {selected && (
            <Card>
              <View testID="preview" className="gap-2">
                <Poster
                  uri={selected.poster}
                  alt={selected.posterAlt[lang]}
                  missing={t('event.posterMissing')}
                />
                <Text accessibilityRole="header" className="text-lg font-bold text-ink">
                  {selected.title[lang]}
                </Text>
                <Text className="text-ink">{formatDateTime(selected.start, lang)}</Text>
                <Text className="text-muted">{selected.organizer}</Text>
                <Button label={t('event.open')} onPress={() => open(selected.id)} />
              </View>
            </Card>
          )}
        </>
      )}
      {(view === 'list' || mapFailed) && (
        <View accessibilityRole="list" className="gap-2">
          {results.map((e) => (
            <Card key={e.id}>
              <Text accessibilityRole="header" className="text-lg font-bold text-ink">
                {e.title[lang]}
              </Text>
              <Text className="text-ink">{formatDateTime(e.start, lang)}</Text>
              <Text className="mb-2 text-muted">{e.organizer}</Text>
              <Button label={`${t('event.open')}: ${e.title[lang]}`} onPress={() => open(e.id)} />
            </Card>
          ))}
        </View>
      )}
    </ScrollView>
  );
}
