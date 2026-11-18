import { Link, useLocalSearchParams } from 'expo-router';
import { useTranslation } from 'react-i18next';
import { ScrollView, Text } from 'react-native';
import { Poster } from '../../src/components/ui';
import { eventRepository } from '../../src/data/eventRepository';
import type { Lang } from '../../src/domain/event';
import { formatDateTime } from '../../src/lib/format';

// Static web routes: one per demo event.
export const generateStaticParams = () => eventRepository.list().map((e) => ({ id: e.id }));

export default function EventDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { t, i18n } = useTranslation();
  const lang = (i18n.language === 'en' ? 'en' : 'it') as Lang;
  const r = eventRepository.getById(id);

  return (
    <ScrollView className="bg-white" contentContainerClassName="gap-3 p-4">
      {!r.ok ? (
        <Text testID="not-found" accessibilityRole="alert" className="text-lg text-ink">
          {t('event.notFound')}
        </Text>
      ) : (
        <>
          <Text accessibilityRole="header" className="text-2xl font-bold text-ink">
            {r.event.title[lang]}
          </Text>
          <Poster uri={r.event.poster} alt={r.event.posterAlt[lang]} missing={t('event.posterMissing')} />
          <Text className="text-ink">
            {t('event.venue')}: {r.event.venue[lang]}
          </Text>
          <Text className="text-ink">
            {t('event.start')}: {formatDateTime(r.event.start, lang)}
          </Text>
          <Text className="text-ink">
            {t('event.end')}: {formatDateTime(r.event.end, lang)}
          </Text>
          <Text className="text-ink">{t(`types.${r.event.type}`)}</Text>
          <Text className="text-ink">
            {t('event.organizer')}: {r.event.organizer}
          </Text>
          <Text className="text-ink">{r.event.description[lang]}</Text>
        </>
      )}
      <Link href="/" className="min-h-touch text-brand underline">
        {t('event.back')}
      </Link>
    </ScrollView>
  );
}
