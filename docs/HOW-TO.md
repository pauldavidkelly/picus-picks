# Picus NFL Picks App - Development Guide

This comprehensive guide walks through the process of setting up, developing, testing, and deploying the Picus NFL Picks application. We'll explore not just what commands to run, but why we're running them and how they work in different environments.

## Initial Project Setup

Before beginning development, ensure you have the following tools installed:
- Node.js (for frontend development)
- .NET SDK (for backend development)
- PostgreSQL (for database)
- Visual Studio Code (recommended IDE)

## Frontend Setup

Our frontend setup process creates a modern React application with Next.js and configures it with necessary styling tools. Each step builds upon the previous one to create a robust development environment.

### Creating the Next.js Application

First, we create a new Next.js application with TypeScript support. Open your terminal in your project's frontend directory and run:

```powershell
npx create-next-app@latest frontend
```

When prompted, select the following options:
- Would you like to use TypeScript? → Yes 
- Would you like to use ESLint? → Yes 
- Would you like to use Tailwind CSS? → Yes 
- Would you like to use `src/` directory? → Yes 
- Would you like to use App Router? → Yes 
- Would you like to customize the default import alias (@/*)? → Yes 

### Installing Essential Dependencies

After the Next.js application is created, we need to install several utility packages that help with styling and UI components. Navigate to your frontend directory and run:

```powershell
cd frontend
npm install @radix-ui/react-icons
npm install clsx
npm install class-variance-authority
npm install tailwind-merge
```

### Setting up shadcn/ui

shadcn/ui provides our component library and design system. To set it up, run:

```powershell
# Create new Next.js project with Tailwind
npx create-next-app@latest picus-frontend --typescript --tailwind --eslint

# Navigate to project
cd picus-frontend

# Install shadcn/ui CLI and initialize
npx shadcn@latest init

```

When prompted, select these options:
- Would you like to use TypeScript? → Yes
- Which style would you like to use? → New York
- Which color would you like to use as base color? → Slate
- Where is your global CSS file? → app/globals.css
- Would you like to use CSS variables for colors? → Yes
- Where is your tailwind.config.js located? → tailwind.config.js
- Configure the import alias for components? → @/components
- Configure the import alias for utilities? → @/lib/utils
- Use --legacy-peer-deps when offered the choice for React 19 compatibility

[Previous content about PostgreSQL setup, backend configuration, etc. remains unchanged...]

## Running the Application

After completing the setup, you can start the development server:

```powershell
# Start the frontend development server
cd frontend
npm run dev

# In a separate terminal, start the backend server
cd backend/src/Picus.Api
dotnet run
```

[Previous content continues with testing setup, deployment setup, etc.]