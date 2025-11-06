// /api/ics.js - ICS feed for Gibraltar public holidays (2025-2026)
const holidays = {
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

function dt(y, m, d) {
  return `${y}${String(m).padStart(2, "0")}${String(d).padStart(2, "0")}`;
}

function buildICS(years) {
  const now = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  let lines = [
    "BEGIN:VCALENDAR",
    "PRODID:-//Gibraltar Holidays//EN",
    "VERSION:2.0",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:Gibraltar public holidays ${years.join(", ")}`
  ];
  years.forEach(y => {
    holidays[y].forEach((h, i) => {
      const [Y, M, D] = h.date.split("-").map(Number);
      const start = dt(Y, M, D);
      const end = dt(Y, M, D + 1); // naive but ok for single-day all-day events
      lines = lines.concat([
        "BEGIN:VEVENT",
        `UID:gi-${y}-${i}@gibraltar`,
        `DTSTAMP:${now}`,
        `SUMMARY:${h.name}`,
        `DTSTART;VALUE=DATE:${start}`,
        `DTEND;VALUE=DATE:${end}`,
        "CATEGORIES:Public Holiday",
        "LOCATION:Gibraltar",
        h.notes ? `DESCRIPTION:${h.notes}` : null,
        "END:VEVENT"
      ].filter(Boolean));
    });
  });
  lines.push("END:VCALENDAR");
  return lines.join("\r\n") + "\r\n";
}

module.exports = (req, res) => {
  const yearParam = req.query.year;
  let years;
  if (yearParam) {
    const y = parseInt(yearParam, 10);
    if (!holidays[y]) return res.status(404).send("Year not found");
    years = [y];
  } else {
    years = Object.keys(holidays).map(Number);
  }
  const ics = buildICS(years);
  res.setHeader("Content-Type", "text/calendar; charset=utf-8");
  res.setHeader("Cache-Control", "s-maxage=3600, max-age=3600");
  res.status(200).send(ics);
};