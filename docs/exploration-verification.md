# Exploration verification (#47)

## Automated (run in CI / locally)

- `npm test` – Jest: filters (each, combined, empty, zero results, IT/EN, Europe/Rome day boundaries, midnight-crossing), validator, repository, i18n parity.
- `npm run e2e` – Playwright (Pixel 7 profile) with fixed clock `EXPO_PUBLIC_FIXED_NOW=2026-11-18T10:00:00+01:00`, OSM tiles always stubbed or aborted (no OSM traffic): initial today, filter combination, map/list switch, detail from both views, IT/EN, zero results, coincident coordinates, date boundary, tile failure with list still usable, axe-core A/AA.
- Maestro: `maestro test .maestro/explore.yaml` on a development build (Android/iOS) built with the same fixed-clock env var.

## Manual – NOT YET PERFORMED (to be filled in; no devices available when this was written)

| Check                                                                              | Environment | Result |
| ---------------------------------------------------------------------------------- | ----------- | ------ |
| Keyboard-only (web)                                                                |             |        |
| Screen reader web (NVDA/VoiceOver)                                                 |             |        |
| VoiceOver iOS                                                                      |             |        |
| TalkBack Android                                                                   |             |        |
| Web mobile LCP (target ≤ 2.5 s) / CLS (≤ 0.1), Lighthouse mobile, throttling noted |             |        |
| Android/iOS: startup, scrolling, map interactions                                  |             |        |

## Known limits

- Native (MapLibre) code and Maestro flow are written but unexecuted.
- Markers are offset ~10 m when coordinates coincide.
- Standard OSM tiles are for internal testing only. The map provider **must be re-evaluated before public launch** (OSM tile usage policy); no offline caching/prefetch of tiles is allowed.
