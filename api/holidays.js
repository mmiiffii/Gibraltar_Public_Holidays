// /api/holidays.js - JSON API for Gibraltar public holidays (2025-2026)
const data = {
  2025: [
    { name: "New Year’s Day", date: "2025-01-01", notes: "" },
    { name: "Winter Midterm Bank Holiday", date: "2025-02-17", notes: "" },
    { name: "Good Friday", date: "2025-04-18", notes: "" },
    { name: "Easter Monday", date: "2025-04-21", notes: "" },
    { name: "Workers’ Memorial Day", date: "2025-04-28", notes: "" },
    { name: "May Day", date: "2025-05-01", notes: "" },
    { name: "Spring Bank Holiday", date: "2025-05-26", notes: "" },
    { name: "King’s Birthday", date: "2025-06-16", notes: "Subject to change." },
    { name: "Late Summer Bank Holiday", date: "2025-08-25", notes: "" },
    { name: "Gibraltar National Day", date: "2025-09-10", notes: "" },
    { name: "Christmas Day", date: "2025-12-25", notes: "" },
    { name: "Boxing Day", date: "2025-12-26", notes: "" }
  ],
  2026: [
    { name: "New Year’s Day", date: "2026-01-01", notes: "" },
    { name: "Winter Midterm Bank Holiday", date: "2026-02-16", notes: "" },
    { name: "Good Friday", date: "2026-04-03", notes: "" },
    { name: "Easter Monday", date: "2026-04-06", notes: "" },
    { name: "Workers’ Memorial Day", date: "2026-04-28", notes: "" },
    { name: "May Day", date: "2026-05-01", notes: "" },
    { name: "Spring Bank Holiday", date: "2026-05-25", notes: "" },
    { name: "King’s Birthday", date: "2026-06-15", notes: "Subject to change." },
    { name: "Late Summer Bank Holiday", date: "2026-08-31", notes: "" },
    { name: "Gibraltar National Day", date: "2026-09-10", notes: "" },
    { name: "Christmas Day", date: "2026-12-25", notes: "" },
    { name: "Boxing Day (in lieu)", date: "2026-12-28", notes: "In lieu of Saturday 26 December." }
  ]
};

function respond(res, status, payload) {
  res.status(status).setHeader("Access-Control-Allow-Origin", "*").json(payload);
}

module.exports = (req, res) => {
  const { year } = req.query;
  if (year) {
    const y = parseInt(year, 10);
    const items = data[y];
    if (!items) return respond(res, 404, { error: "Year not found" });
    return respond(res, 200, { year: y, holidays: items, location: "Gibraltar", country: "GI" });
  }
  // Return all
  const all = Object.entries(data).flatMap(([y, arr]) => arr.map(h => ({ year: Number(y), ...h })));
  return respond(res, 200, { years: Object.keys(data).map(Number), holidays: all, location: "Gibraltar", country: "GI" });
};