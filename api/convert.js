const { parseCsv } = require("../lib/csv");

module.exports = (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed." });
    return;
  }

  const csv = typeof req.body?.csv === "string" ? req.body.csv : "";

  if (!csv.trim()) {
    res.status(400).json({ error: "CSV content is required." });
    return;
  }

  const rows = parseCsv(csv);
  res.status(200).json({ rows });
};
