# CSV to JSON App

A tiny app that turns CSV content into JSON, ready for local use or deployment on Vercel or Netlify.

## Local run

```bash
cd /Users/vasu/Documents/Playground/csv-json-app
npm start
```

Open `http://localhost:3010`.

## Deploy on Vercel

1. Push `/Users/vasu/Documents/Playground/csv-json-app` to a GitHub repo.
2. In Vercel, choose `Add New Project`.
3. Import that repo.
4. Leave the default settings as-is and deploy.

Vercel will serve the static files from `public/` and the serverless endpoint from `api/convert.js`.

## Deploy on Netlify

1. Push `/Users/vasu/Documents/Playground/csv-json-app` to a GitHub repo.
2. In Netlify, choose `Add new site` and import the repo.
3. Use:
   - Build command: leave empty
   - Publish directory: `public`
4. Deploy.

Netlify will use `netlify.toml` to route `/api/convert` to `netlify/functions/convert.js`.

## How it works

- The client lets you upload a CSV file or paste CSV text.
- The browser sends the CSV text to `POST /api/convert`.
- The backend parses the CSV and returns JSON rows.

## Example input

```csv
name,email
Ada,ada@example.com
Linus,linus@example.com
```

## Example output

```json
[
  {
    "name": "Ada",
    "email": "ada@example.com"
  },
  {
    "name": "Linus",
    "email": "linus@example.com"
  }
]
```
