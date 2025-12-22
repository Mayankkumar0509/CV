# Mayank Kumar Portfolio

A modern, responsive portfolio website built with React, Vite, and Tailwind CSS. Features include dark mode, particle animations, smooth transitions, and an integrated LLM deployment demo.

## Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS, PostCSS
- **Animations**: Framer Motion
- **Particles**: react-tsparticles
- **Build Tool**: Vite

## Features

- Auto dark mode detection
- Loading screen with spinner
- Particle background animation
- Scroll progress bar
- Smooth page transitions
- Project modal popups
- Responsive design
- Skills section
- Floating contact button
- LLM Deployment Demo (triggers external API)

## Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd mayank-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Running the Application

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite port).

## Building for Production

To build the application for production:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Project Structure

```
src/
├── App.jsx          # Main application component
├── main.jsx         # Entry point
├── index.css        # Global styles
└── assets/          # Static assets

public/              # Public assets
├── Mayank.jpg       # Profile image
└── Mayank_Kumar_Resume.pdf  # Resume download

Configuration files:
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

## LLM Deployment Demo

The portfolio includes a demo section that allows triggering an external LLM deployment API. The endpoint URL can be configured in `src/App.jsx`.

## Deployment

This project can be deployed to any static hosting service like Vercel, Netlify, or GitHub Pages.

For GitHub Pages deployment, you may need to configure the `vite.config.js` for proper base path handling.