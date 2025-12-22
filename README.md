# Purple Dashboard - Admin UI

A modern React + TypeScript dashboard UI clone based on the Purple admin template design.

## Features

- **Header Bar**: Logo, search functionality, user profile, and notification icons
- **Sidebar Navigation**: User profile section with navigation menu
- **Dashboard Metrics**: Three gradient cards showing Weekly Sales, Weekly Orders, and Visitors Online
- **Charts**: 
  - Visit and Sales Statistics (Bar Chart)
  - Traffic Sources (Donut Chart)
- **Recent Tickets Table**: Data table with assignee, subject, status, and tracking information

## Tech Stack

- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Recharts** for chart components
- **Lucide React** for icons
- **Node.js 22**

## Getting Started

### Prerequisites

- Node.js 22 or higher
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Project Structure

```
src/
  ├── components/
  │   ├── Header.tsx          # Top navigation bar
  │   ├── Sidebar.tsx         # Left navigation menu
  │   ├── Dashboard.tsx       # Main dashboard content
  │   ├── MetricCard.tsx      # Reusable metric card component
  │   ├── VisitSalesChart.tsx # Bar chart component
  │   ├── TrafficSourcesChart.tsx # Donut chart component
  │   └── RecentTickets.tsx   # Tickets table component
  ├── App.tsx                 # Main app component
  ├── main.tsx               # Entry point
  └── index.css              # Global styles
```

## Notes

This is a UI-only implementation. All data is static/mock data for display purposes.
