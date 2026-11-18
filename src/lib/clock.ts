/** Controlled clock for tests/e2e: EXPO_PUBLIC_FIXED_NOW=2026-11-18T10:00:00+01:00 */
export const now = (): Date =>
  process.env.EXPO_PUBLIC_FIXED_NOW ? new Date(process.env.EXPO_PUBLIC_FIXED_NOW) : new Date();
