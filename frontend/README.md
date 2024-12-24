# Picus NFL Picks Frontend

This is the frontend application for Picus NFL Picks, a self-hosted NFL picks application built with React, TypeScript, and Vite.

## Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)
- Auth0 account and application credentials

## Installation

1. Clone the repository
2. Navigate to the frontend directory
3. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

1. Create a `.env` file in the frontend directory using the `.env.example` template:
   ```bash
   cp .env.example .env
   ```

2. Update the `.env` file with your Auth0 credentials:
   ```
   VITE_AUTH0_DOMAIN=your-auth0-domain.auth0.com
   VITE_AUTH0_CLIENT_ID=your-client-id
   VITE_AUTH0_AUDIENCE=your-api-identifier
   ```

   You can find these values in your Auth0 application settings:
   - Log into your Auth0 account
   - Go to Applications > Your Application
   - Copy the Domain and Client ID
   - For the Audience, use your API identifier from Auth0 APIs section

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173` by default.

## Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `dist` directory.

## Technologies Used

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Shadcn UI
- Auth0 for authentication
