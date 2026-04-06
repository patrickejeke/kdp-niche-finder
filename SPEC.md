# KDP NicheFinder - Product Specification

## 1. Concept & Vision

KDP NicheFinder is a precision tool for self-publishing entrepreneurs who treat Amazon KDP as a serious revenue channel. It transforms hours of manual market research into instant, data-driven niche intelligence. The experience feels like having a market analyst on retainer—clinical, confident, and actionable. The interface communicates authority through data visualization and clear metrics, avoiding the "get rich quick" aesthetic that plagues most KDP tools.

**Core Promise:** "Find your profitable KDP niche in minutes, not weeks."

## 2. Design Language

### Aesthetic Direction
Professional analytics dashboard meets modern SaaS. Think Bloomberg terminal refined for indie publishers. Dark theme with strategic color accents that highlight opportunity (green), competition (amber), and risk (red). Dense information architecture that rewards power users while remaining scannable.

### Color Palette
```css
--bg-primary: #0d1117;       /* Deep navy-black */
--bg-secondary: #161b22;     /* Card backgrounds */
--bg-tertiary: #21262d;      /* Elevated surfaces */
--border: #30363d;           /* Subtle borders */
--text-primary: #e6edf3;     /* High contrast text */
--text-secondary: #8b949e;   /* Muted text */
--accent-green: #3fb950;      /* Opportunity/growth */
--accent-amber: #d29922;     /* Caution/medium competition */
--accent-red: #f85149;       /* High competition/warning */
--accent-blue: #58a6ff;       /* Links, actions */
--accent-purple: #a371f7;     /* Premium features */
```

### Typography
- **Headings:** Inter (700, 600) - clean, professional
- **Body:** Inter (400, 500) - excellent readability
- **Data/Metrics:** JetBrains Mono - monospace for numbers
- **Scale:** 12px base, 1.25 ratio (12, 15, 19, 24, 30, 37)

### Spatial System
- Base unit: 4px
- Component padding: 16px (4 units)
- Section gaps: 24px (6 units)
- Card border-radius: 8px
- Max content width: 1400px

### Motion Philosophy
- **Micro-interactions:** 150ms ease-out for hovers, button presses
- **Data loading:** Skeleton screens with subtle pulse (1.5s)
- **Results reveal:** Staggered fade-in, 50ms delay between items
- **Charts:** 400ms ease-out draw animations
- **No gratuitous animation** - every motion serves comprehension

### Visual Assets
- **Icons:** Lucide React - consistent 1.5px stroke
- **Charts:** Recharts library - area, bar, radar charts
- **Decorative:** Subtle gradient overlays on hero, dot grid patterns

## 3. Layout & Structure

### Page Architecture

```
┌─────────────────────────────────────────────────────────────┐
│  HEADER: Logo | Navigation | User Menu                      │
├─────────────────────────────────────────────────────────────┤
│  HERO SECTION                                               │
│  "Find Profitable KDP Niches in Minutes"                    │
│  Interest Input + Analyze Button                            │
├─────────────────────────────────────────────────────────────┤
│  CATEGORY QUICK FILTERS                                     │
│  Pets | Finance | Health | Business | Education | Hobbies   │
├─────────────────────────────────────────────────────────────┤
│  RESULTS DASHBOARD                                          │
│  ┌─────────────┬─────────────────────────────────────────┐  │
│  │   SIDEBAR   │  NICHE CARDS (Sortable Grid)            │  │
│  │   Filters   │  ┌───────┐ ┌───────┐ ┌───────┐         │  │
│  │   Stats     │  │ Card  │ │ Card  │ │ Card  │         │  │
│  │   Summary   │  └───────┘ └───────┘ └───────┘         │  │
│  │             │  ┌───────┐ ┌───────┐ ┌───────┐         │  │
│  │             │  │ Card  │ │ Card  │ │ Card  │         │  │
│  │             │  └───────┘ └───────┘ └───────┘         │  │
│  └─────────────┴─────────────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│  NICHE DETAIL MODAL (Overlay)                               │
│  Deep metrics, keyword suggestions, trend analysis          │
└─────────────────────────────────────────────────────────────┘
```

### Responsive Strategy
- **Desktop (1200px+):** Full 3-column niche grid, sidebar visible
- **Tablet (768-1199px):** 2-column grid, collapsible sidebar
- **Mobile (< 768px):** Single column, bottom sheet for filters

### Visual Pacing
- Hero: Generous whitespace, single focus point
- Quick filters: Compact horizontal scroll
- Results: Dense but scannable, clear card boundaries
- Detail modal: Information-rich, tabbed sections

## 4. Features & Interactions

### Core Features

#### 4.1 Interest Input System
- **Text input:** User enters interests ("dog training, personal finance, meal prep")
- **Auto-suggest:** Dropdown of related categories as they type
- **Multi-select:** Chips for selected interests, removable
- **Analyze button:** Primary CTA, disabled until valid input
- **Loading state:** Progress indicator with "Scanning 50,000+ categories..."

#### 4.2 Category Quick Filters
- Pre-defined category buttons: Pets, Finance, Health, Business, Education, Hobbies, Self-Help, Cooking
- Single or multi-select
- Updates results instantly (client-side filter)
- Visual indicator for active filters

#### 4.3 Niche Results Grid
Each niche card displays:
- **Niche Name:** Clear, specific (e.g., "Minimalist Budgeting for Millennials")
- **Opportunity Score:** 0-100, color-coded badge
- **Competition Level:** Low/Medium/High with count indicator
- **Monthly Revenue Potential:** Estimated range
- **Books in Category:** Total count
- **Avg Rating:** Market quality indicator
- **Trend Arrow:** Up/down/stable with percentage

**Card Interactions:**
- Hover: Subtle elevation, border highlight
- Click: Opens detail modal
- Quick action: "Save to Watchlist" heart icon

#### 4.4 Advanced Filters Sidebar
- **Competition Range:** Slider (Low to High)
- **Revenue Potential:** Slider ($100-$10k/month)
- **Books Count:** Max allowed
- **Trend Direction:** Rising/Stable/Declining
- **Price Range:** $2.99-$29.99
- **Review Count:** Max avg reviews
- **Clear All:** Reset button

#### 4.5 Niche Detail Modal
Full-screen modal with tabbed content:

**Overview Tab:**
- Niche description and why it's promising
- Quick stats grid (competition, revenue, trend)
- Top 3 keywords with search volume

**Competition Tab:**
- Bar chart: Review distribution
- Table: Top 10 competing titles with their metrics
- Price point histogram

**Keywords Tab:**
- Primary keywords (10) with search volume bars
- Long-tail opportunities
- Related queries (25)
- One-click copy keywords

**Trends Tab:**
- 12-month trend line chart
- Seasonal pattern analysis
- Publishing velocity (new books/month)
- Category heat map

**Actions Tab:**
- "Create Book Brief" button (placeholder for future)
- "Get Cover Design Ideas" (placeholder)
- "Save Niche" to favorites
- Share niche link

### Edge Cases & Error Handling
- **No results:** "No niches match your criteria. Try broadening your interests."
- **Too broad:** "Be more specific. Try 'vegan baking for couples' instead of 'food'"
- **Loading failure:** Retry button with cached results if available
- **Empty input:** Disabled button, subtle prompt text

## 5. Component Inventory

### Input Components

#### InterestInput
- **Default:** Placeholder text, search icon
- **Focus:** Blue border glow, dropdown visible
- **With chips:** Chips render below, X to remove
- **Error:** Red border, error message below

#### FilterChip
- **Default:** Gray background, text
- **Selected:** Blue background, checkmark icon
- **Hover:** Slight brightness increase

#### RangeSlider
- **Track:** Gray background
- **Filled:** Gradient green to red based on value
- **Handles:** Circular, draggable
- **Labels:** Min/max at ends, current value above

### Display Components

#### NicheCard
- **Default:** Dark card, metrics visible
- **Hover:** Border color change, slight scale (1.01)
- **Saved:** Heart icon filled
- **Loading:** Skeleton with pulse

#### OpportunityBadge
- **Score 0-40:** Red background
- **Score 41-70:** Amber background  
- **Score 71-100:** Green background
- Size: Small (inline) or Large (detail view)

#### StatCard
- Icon, label, value layout
- Value in monospace font
- Optional trend indicator

### Navigation

#### Sidebar
- **Desktop:** Fixed left, 280px width
- **Tablet:** Collapsible drawer
- **Mobile:** Bottom sheet

#### Modal
- **Overlay:** Semi-transparent black (0.8 opacity)
- **Content:** Centered, max 1000px width, scrollable
- **Close:** X button top-right, Escape key, click outside

### Feedback

#### LoadingSkeleton
- Gray rectangles matching content shapes
- Subtle pulse animation (opacity 0.5-1)

#### Toast
- Bottom-right positioned
- Auto-dismiss after 4 seconds
- Types: Success (green), Error (red), Info (blue)

## 6. Technical Approach

### Architecture Overview
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   React     │────▶│   Express   │────▶│   SQLite    │
│  Frontend   │     │   Backend   │     │   Database  │
└─────────────┘     └─────────────┘     └─────────────┘
     │                                            │
     │              REST API                       │
     └────────────────────────────────────────────┘
```

### Backend (Node.js + Express)

#### API Endpoints
```
GET  /api/niches                    # List niches with filters
GET  /api/niches/:id                # Single niche details
GET  /api/niches/:id/keywords       # Keywords for niche
GET  /api/niches/:id/competition    # Competition analysis
GET  /api/niches/:id/trends         # Historical trends
GET  /api/categories                # All categories
GET  /api/search?q=                 # Search niches by query
POST /api/niches/:id/save           # Save to watchlist
GET  /api/user/favorites            # User's saved niches
```

#### Data Model
```sql
-- Niches table
CREATE TABLE niches (
  id INTEGER PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  category TEXT,
  subcategory TEXT,
  description TEXT,
  opportunity_score INTEGER,
  competition_level TEXT, -- low, medium, high
  competition_count INTEGER,
  avg_rating DECIMAL(2,1),
  avg_price DECIMAL(4,2),
  monthly_revenue_low INTEGER,
  monthly_revenue_high INTEGER,
  trend_direction TEXT, -- rising, stable, declining
  trend_percentage DECIMAL(4,1),
  avg_reviews INTEGER,
  books_count INTEGER,
  keywords TEXT, -- JSON array
  created_at DATETIME,
  updated_at DATETIME
);

-- Keywords table
CREATE TABLE keywords (
  id INTEGER PRIMARY KEY,
  niche_id INTEGER REFERENCES niches(id),
  keyword TEXT,
  search_volume INTEGER,
  competition TEXT,
  category TEXT -- primary, longtail, related
);

-- Trends table (monthly snapshots)
CREATE TABLE trends (
  id INTEGER PRIMARY KEY,
  niche_id INTEGER REFERENCES niches(id),
  month DATE,
  books_published INTEGER,
  avg_price DECIMAL(4,2),
  avg_rating DECIMAL(2,1),
  search_interest INTEGER
);

-- Categories table
CREATE TABLE categories (
  id INTEGER PRIMARY KEY,
  name TEXT,
  slug TEXT,
  parent_id INTEGER REFERENCES categories(id),
  niche_count INTEGER
);
```

### Frontend (React + TypeScript)

#### State Management
- React Context for global state (user preferences, filters)
- Local state for component-specific UI
- URL params for shareable filter states

#### Key Libraries
- React Router v6 (navigation)
- Recharts (data visualization)
- Lucide React (icons)
- Tailwind CSS (styling)

#### Project Structure
```
src/
├── components/
│   ├── ui/           # Reusable UI components
│   ├── features/     # Feature-specific components
│   └── layout/       # Header, Sidebar, etc.
├── hooks/            # Custom React hooks
├── context/          # React Context providers
├── services/         # API calls
├── types/            # TypeScript interfaces
├── utils/            # Helper functions
└── data/             # Mock/seed data
```

### Database Seeding
Pre-populate with 100+ realistic KDP niches across categories:
- Pet care (senior dogs, exotic pets, etc.)
- Finance (crypto for beginners, FIRE movement, etc.)
- Health (keto for athletes, meditation for anxiety, etc.)
- Business (side hustles, remote work, etc.)
- Self-help (minimalism, productivity, etc.)

Each niche includes:
- Realistic opportunity scores (35-95)
- Competition metrics
- Trend data (12 months)
- Keyword sets (15-30 per niche)

## 7. Future Expansion Hooks (Not Built, But Enabled)

- **Cover Design Suggestions:** API endpoint ready for AI integration
- **Title Optimization:** Keyword scoring algorithm in place
- **Launch Strategy:** Competition analysis expandable to include:
  - Launch timing recommendations
  - Category selection for Better Book Bonus
  - Review acquisition strategies
- **User Accounts:** Authentication structure ready for:
  - Watchlists
  - Search history
  - Personalized recommendations
- **Data Refresh:** Cron job structure for periodic Amazon data updates
