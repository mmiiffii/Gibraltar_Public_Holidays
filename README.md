
# Gibraltar Public Holidays (2025–2026)

This repo contains Gibraltar public holidays for 2025 and 2026 in multiple formats (ICS, JSON, CSV, YAML) and two small serverless endpoints you can deploy on Vercel for a live API and an iCal feed.

## Contents

```
data/
  2025.csv  2025.json  2025.yaml
  2026.csv  2026.json  2026.yaml
  all.json
ics/
  gibraltar_public_holidays_2025.ics
  gibraltar_public_holidays_2026.ics
  gibraltar_public_holidays_2025_2026.ics
api/
  holidays.js   # JSON API
  ics.js        # ICS feed
```

## Use the files directly

- **ICS (single year):**
  - `ics/gibraltar_public_holidays_2025.ics`
  - `ics/gibraltar_public_holidays_2026.ics`
- **ICS (both years):** `ics/gibraltar_public_holidays_2025_2026.ics`
- **JSON:** `data/2025.json`, `data/2026.json`, `data/all.json`
- **CSV:** `data/2025.csv`, `data/2026.csv`
- **YAML:** `data/2025.yaml`, `data/2026.yaml`

> Notes: King’s Birthday dates are marked “Subject to change.” Boxing Day 2026 is observed **in lieu** on Monday 28 December.


