# Intrepid Travel - Urban Adventures

A world-class, map-driven travel discovery platform that enables travelers to find, research, and book authentic Intrepid Travel Urban Adventures worldwide.

## ✨ Features

- **🗺️ Interactive Map**: Mapbox-powered global map with trip pins, clustering, and real-time filtering
- **🔍 Advanced Search & Filters**: Intelligent search with autocomplete and comprehensive filtering by destination, type, price, duration, difficulty, and availability
- **📱 Trip Discovery**: Detailed trip pages with interactive itineraries, AI-generated review summaries, and social media integration
- **❤️ Wishlist System**: Save favorite trips with persistent storage across devices (requires authentication)
- **⭐ Review Aggregation**: TripAdvisor reviews with AI-powered highlights and sentiment analysis
- **🏷️ Dynamic Badge System**: Real-time status indicators like "Likely to Sell Out", "Popular", and "New Trip"
- **🔐 Authentication**: Flexible authentication with Google and Facebook OAuth support
- **📱 Responsive Design**: Mobile-first design that works seamlessly across all devices

## 🚀 Tech Stack

- **Frontend**: Next.js 14 with TypeScript and App Router
- **Styling**: Tailwind CSS with custom Intrepid brand design system
- **Mapping**: Mapbox GL JS with custom markers and popups
- **Authentication**: NextAuth.js with OAuth providers
- **State Management**: React hooks with custom data fetching
- **Icons**: Lucide React
- **API**: RESTful API with Next.js Route Handlers

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy environment variables:
   ```bash
   cp .env.local.example .env.local
   ```

4. Add your Mapbox token to `.env.local`:
   ```
   NEXT_PUBLIC_MAPBOX_TOKEN=your_mapbox_token_here
   ```

5. Run the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## 📁 Project Structure

```
src/
├── app/                    # Next.js 14 App Router
│   ├── api/               # API routes (trips, reviews, search)
│   ├── auth/              # Authentication pages
│   ├── map/               # Interactive map page
│   ├── trips/[id]/        # Dynamic trip detail pages
│   └── wishlist/          # User wishlist page
├── components/            # Reusable React components
│   ├── Auth/             # Authentication components
│   ├── Filters/          # Search and filter components
│   ├── Layout/           # Navigation and layout
│   ├── Map/              # Mapbox integration
│   ├── Search/           # Search with autocomplete
│   └── ui/               # Design system components
├── hooks/                # Custom React hooks
├── lib/                  # Configuration and constants
├── types/                # TypeScript definitions
└── utils/                # Helper functions
```

## 🎨 Design System

The application implements Intrepid Travel's complete brand design system:

- **Primary Colors**: Intrepid Red (#ff2828), Midnight (#222), Sand (#f6f4f0)
- **Secondary Palette**: Okavango, Santorini, Luxor, Sahara, and more
- **Alert System**: Success, Warning, Error, and Info color variants
- **Typography**: Inter font family with consistent hierarchy
- **Components**: Buttons, Cards, Badges, Inputs with brand styling

## Environment Variables

See `.env.local.example` for all available environment variables.

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Documentation

- [Contentstack Integration](CONTENTSTACK_INTEGRATION.md) - Setup and configuration guide for Contentstack CMS integration