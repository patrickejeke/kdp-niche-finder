# KDP NicheFinder

Find profitable Amazon KDP publishing niches in minutes with data-driven insights on competition, revenue potential, and market trends.

## Features

- **105+ niches** across 10 categories
- **Search & filter** by category, competition, score, revenue, trend
- **Deep analytics** with keyword research, trend charts, and competition analysis
- **Professional dark theme** analytics dashboard

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS v4, Recharts
- **Backend**: Node.js, Express
- **Database**: JSON (file-based, auto-seeded)

## Deployment

### Backend (Render)

1. Go to [render.com](https://render.com) and sign up
2. Connect your GitHub account
3. Create a new "Web Service"
4. Connect the `backend` folder from this repo
5. Set build command: `npm install`
6. Set start command: `npm start`
7. Deploy!

After deploying, copy your backend URL (e.g., `https://kdp-niche-finder-api.onrender.com`)

### Frontend (Vercel)

1. Go to [vercel.com](https://vercel.com) and sign up
2. Import the GitHub repository
3. Set root directory to `frontend`
4. Add environment variable:
   - Name: `VITE_API_URL`
   - Value: Your Render backend URL + `/api` (e.g., `https://kdp-niche-finder-api.onrender.com/api`)
5. Deploy!

## Local Development

```bash
# Install dependencies
cd backend && npm install
cd ../frontend && npm install

# Start backend (port 3001)
cd backend && npm start

# Start frontend (port 5173)
cd frontend && npm run dev
```

## Live Demo

- **Frontend**: https://kdp-niche-finder.vercel.app
- **Backend API**: https://kdp-niche-finder-api.onrender.com
