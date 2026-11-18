// eslint-disable-next-line import/no-named-as-default
import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const OSM = '**/tile.openstreetmap.org/**';
// Tiles are always stubbed: no real OSM traffic from tests.
test.beforeEach(({ page }) =>
  page.route(OSM, (r) => r.fulfill({ status: 200, contentType: 'image/png', body: Buffer.alloc(0) })),
);

test('initial today, filters combination, map/list, details from both views (IT)', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByTestId('count')).toHaveText('2 eventi');
  await page.getByRole('button', { name: 'Cibo', exact: true }).click();
  await expect(page.getByTestId('count')).toHaveText('1 evento');
  await page.getByTestId('marker-notte-dei-sapori').click();
  await expect(page.getByTestId('preview')).toContainText('Notte dei sapori');
  await page.getByRole('button', { name: 'Apri dettaglio' }).click();
  await expect(page).toHaveURL(/events\/notte-dei-sapori/);
  await page.goBack();
  await page.getByRole('button', { name: 'Elenco' }).click();
  await page.getByRole('button', { name: /Apri dettaglio: Notte dei sapori/ }).click();
  await expect(page.getByRole('heading', { name: 'Notte dei sapori' })).toBeVisible();
  await page.reload(); // direct reload of exported route
  await expect(page.getByRole('heading', { name: 'Notte dei sapori' })).toBeVisible();
});

test('coincident coordinates: both markers selectable', async ({ page }) => {
  await page.goto('/');
  await page.getByTestId('marker-jazz-in-piazza').click();
  await expect(page.getByTestId('preview')).toContainText('Jazz');
  await page.getByTestId('marker-notte-dei-sapori').click();
  await expect(page.getByTestId('preview')).toContainText('Notte');
});

test('EN, zero results, date boundary', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'EN' }).click();
  await page.getByLabel('Date (YYYY-MM-DD)').fill('2026-11-20');
  await expect(page.getByTestId('empty')).toHaveText('No events match the filters.');
  await page.getByLabel('Date (YYYY-MM-DD)').fill('2026-11-19'); // midnight-crossing event still on 19th
  await expect(page.getByTestId('count')).toHaveText('2 events');
});

test('tiles unavailable: message shown, list and filters still work', async ({ page }) => {
  await page.unroute(OSM);
  await page.route(OSM, (r) => r.abort());
  await page.goto('/');
  await expect(page.getByTestId('map-error')).toBeVisible();
  await page.getByRole('button', { name: /Apri dettaglio: Jazz/ }).click();
  await expect(page).toHaveURL(/events\/jazz-in-piazza/);
});

test('axe: no A/AA violations', async ({ page }) => {
  await page.goto('/');
  const r = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa']).analyze();
  expect(r.violations).toEqual([]);
});
