# 🎰 Vue.js Casino Games Page
_____________________________


## 🚀 Features

- **Responsive Game Layout**: Adaptive grid system that works seamlessly across desktop, tablet, and mobile devices
- **Category Navigation**: Dynamic filtering system with categories including Top Games, New Games, Slots, Jackpots, Live, Poker, etc...
- **Real-time Jackpot Updates**: Live jackpot amounts that update every 5 seconds with automatic interval management
- **Game Ribbons**: Visual indicators for "NEW" and "TOP" games with animated ribbon overlays
- **Interactive Hover Effects**: Smooth hover animations with play button overlays and image scaling
- **Smart Category Grouping**: Automatic grouping of "ball", "virtual", and "fun" categories into "Other"
- **Error Handling**: Comprehensive error states with retry functionality and user-friendly messages
- **Loading States**: Smooth loading animations and skeleton states for better UX

## 🛠️ Technologies Used

- **Vue.js 3** - Progressive JavaScript framework with Composition API
- **Pinia** - State management for Vue applications
- **Vite** - Fast build tool and development server
- **TypeScript** - Type-safe JavaScript development
- **Axios** - HTTP client for API requests
- **Jest** - Unit testing framework with Vue Test Utils
- **Custom CSS** - Responsive design with CSS Grid and Flexbox (No framework)
- **Vue Router** - Client-side routing

________________________________________________________________________________________________

## 📦 Installation & Setup

### Prerequisites
- Node.js (version 18 or higher)
- npm or yarn package manager

### Setup Instructions

1. **Clone the repository**
   git clone <repository-url>
   cd vue-star

2. **.env**
   VITE_APP_GAMES_API_URL=https://stage.whgstage.com/front-end-test/games.php
   VITE_APP_JACKPOTS_API_URL=https://stage.whgstage.com/front-end-test/jackpots.php

3. **Install dependencies**
   npm install

4. **Start the development server**
   npm run dev

5. **Open your browser**
   Navigate to `http://localhost:5173` (or the port shown in the terminal)

### Available Scripts

- `npm run dev` - Start development server
- `npm test` - Run unit tests
- `npm run test:coverage` - Run tests with coverage report

____________________________________________________________________________________________________
## 🧪 Running Tests

The project uses Jest as the testing framework, which is optimized for Vue 3 + Vite applications.

# Run all tests
npm test

# Run tests in watch mode
npm test -- --watch

# Run tests with coverage
npm run test:coverage

The test suite includes:
- **Store Tests**: Business logic and state management
- **Component Tests**: UI rendering and user interactions
- **API Service Tests**: Data fetching and error handling

___________________________________________________________________________________________________


## 📁 Project Structure

```
src/
├── components/          # Reusable Vue components
│   ├── GameCard.vue    # Individual game card component
│   └── CategoryFilter.vue # Category navigation component
├── stores/             # Pinia state management
│   ├── games.ts        # Games data and filtering logic
│   └── jackpots.ts     # Jackpot data and real-time updates
├── services/           # API and external services
│   └── api.ts          # Axios-based API service
├── views/              # Page components
│   └── GamesPage.vue   # Main games page
├── constants/          # Application constants
├── types/              # TypeScript type definitions
├── utils/              # Utility functions
└── assets/             # Static assets and styles

tests/                  # Test files
├── components/         # Component tests
├── stores/             # Store tests
└── setup.ts           # Test configuration
```

