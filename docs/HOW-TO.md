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
npx shadcn-ui@latest init
```

When prompted, choose these options and here's why each matters:
1. Would you like to use TypeScript? → Yes
   (Enables better code checking and autocompletion)

2. Which style would you like to use? → New York
   (Provides a bold, modern look that works well for sports applications)

3. Which color would you like to use as base color? → Slate
   (A professional blue-gray that works well with sports content)

4. Where is your global CSS file? → app/globals.css
   (Matches our Next.js app structure)

5. Would you like to use CSS variables for colors? → Yes
   (Makes theme customization easier)

6. Where is your tailwind.config.js located? → tailwind.config.js
   (Default location for our styling configuration)

7. Configure the import alias for components? → @/components
   (Makes importing components more straightforward)

8. Configure the import alias for utilities? → @/lib/utils
   (Keeps our utility functions organized)

When prompted about React 19 compatibility, choose --legacy-peer-deps for the most stable setup.

## Backend Setup

### Setting up Entity Framework Core

First, we'll install the required NuGet packages for Entity Framework Core with PostgreSQL support. Navigate to your backend project directory and run:

```powershell
cd backend/src/Picus.Api
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Microsoft.EntityFrameworkCore.Design
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
```

These packages provide:
- Entity Framework Core: Our main ORM framework
- EF Core Design: Tools for migrations and reverse engineering
- Npgsql PostgreSQL: PostgreSQL database provider for EF Core

### Creating the Data Models

Create a new Models folder in your project and add the following model classes based on our schema. Each model represents a table in our database:

```powershell
mkdir Models
cd Models
```

Create the following files:

1. User.cs - Represents application users
2. Game.cs - Stores NFL game information
3. Pick.cs - Records user predictions
4. League.cs - Manages pick pools
5. Team.cs - Stores NFL team data

Each model should implement proper relationships and data annotations. Here's how to scaffold them:

```powershell
dotnet new classlib -n Picus.Models
cd Picus.Models
```

### Setting up the Database Context

Create a new Data folder for your DbContext:

```powershell
mkdir Data
cd Data
```

The DbContext will manage database sessions and map our models to database tables.

### Creating the Initial Migration

After setting up your models and DbContext, create and apply the initial migration:

```powershell
# Create the migration
dotnet ef migrations add InitialCreate

# Apply the migration to create the database
dotnet ef database update
```

### Database Connection Configuration

Add the database connection string to your appsettings.json:

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Host=localhost;Database=picus;Username=your_username;Password=your_password"
  }
}
```

## Running the Application

After completing the setup, you can start the development server:

```powershell
# Start the frontend development server
cd frontend
npm run dev

# In a separate terminal, start the backend server (once implemented)
cd backend/src/Picus.Api
dotnet run
```