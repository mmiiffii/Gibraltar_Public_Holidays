
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

## Deploy an API + ICS feed on Vercel

1. Push this repo to GitHub.
2. Import the repo in Vercel.
3. You’ll get endpoints like:
   - `https://<project>.vercel.app/api/holidays` (all years, JSON)
   - `https://<project>.vercel.app/api/holidays?year=2025` (single year, JSON)
   - `https://<project>.vercel.app/api/ics` (all years, ICS)
   - `https://<project>.vercel.app/api/ics?year=2026` (single year, ICS)

These endpoints set `Access-Control-Allow-Origin: *`, so you can call them from web apps.

## Static hosting (GitHub Pages / S3 / Netlify)

You can also host the static files and let people subscribe to the `.ics` directly. Ensure the **Content-Type** is `text/calendar` for `.ics` files.

## Contributing

- Add another year by editing `api/holidays.js` and `api/ics.js` *and* the files under `data/` and `ics/`.
- PRs welcome.

## License

MIT
