# Filters

Reference timezone: `Europe/Rome`. Initial date = today in that zone (clock injectable: `EXPO_PUBLIC_FIXED_NOW` / `initialFilters(now)`).
An event matches a day if the day lies between its start day and end day inclusive, so events crossing midnight appear on both days.
