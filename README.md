# Addo.

Expo (React Native + Expo Router + NativeWind, TypeScript strict) app for web, Android, iOS. No backend or auth.

## Commands

`npm ci --legacy-peer-deps` · `npm run web` · `npm run typecheck` · `npm run lint` · `npm run format` · `npm test` · `npm run validate:events` · `npm run export:web` (→ `dist/`) · `npm run e2e`

## Layout

`app/` routes · `src/components` UI · `src/domain` model, validation, filters · `src/data` events JSON + repository (screens never import the JSON) · `src/i18n` IT/EN · `src/map` Leaflet (`.web`) / MapLibre (native).

## Events data

`src/data/events.json` is versioned in Git; validate with `npm run validate:events` (errors name event and field; also runs in CI and the Vercel build). Update demo dates by editing the file; restore old versions with `git checkout <rev> -- src/data/events.json`. Nothing is deleted automatically.

## Native builds

MapLibre needs a development build (no Expo Go): `eas build --profile development --platform android|ios`; internal distribution: `--profile internal`. Signing credentials live in EAS / CI secrets only. Requires an Expo account and, for iOS device distribution, an Apple Developer account (paid). Not executed here.

## Web / PWA

Vercel runs `vercel.json` build (static export; one route per event). `public/sw.js` caches only the same-origin shell + offline page and never intercepts cross-origin requests (OSM tiles are never cached or prefetched).

## Maps

Standard OSM raster tiles, internal testing only; no offline packs or bulk download. **Re-evaluate the tile provider before public launch.**

See `docs/exploration-verification.md` (test plan, manual checks) and `docs/filters.md`.
