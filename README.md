# eHealthJOBS - Next.js App

A modern healthcare recruitment platform built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **Radix UI** components for accessibility
- **React Query** for data fetching
- **Responsive design** for all devices

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or bun

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
bun install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   ├── not-found.tsx   # 404 page
│   └── providers.tsx   # Client providers
├── components/         # React components
│   ├── ui/            # Reusable UI components
│   └── ...            # Page-specific components
├── hooks/             # Custom React hooks
├── lib/               # Utility functions
└── index.css          # Global styles
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe JavaScript
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Beautiful icons
- **React Query** - Data fetching and caching
- **Sonner** - Toast notifications
