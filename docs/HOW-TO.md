# Picus NFL Picks App - Development Guide

This comprehensive guide walks through the process of setting up, developing, testing, and deploying the Picus NFL Picks application. We'll explore not just what commands to run, but why we're running them and how they work in different environments.

## Operating System-Specific Commands

Before diving into the project setup, let's understand how commands differ between Windows PowerShell and Linux/Bash environments. We'll reference these differences throughout the guide.

### Environment Variables

In development, we often need to set environment variables for our application. The syntax differs between environments:

PowerShell:
```powershell
# Setting a single environment variable
$env:REACT_APP_API_URL = "http://localhost:5000"

# Setting multiple variables
$env:ASPNETCORE_ENVIRONMENT = "Development"
$env:ConnectionStrings__DefaultConnection = "Host=localhost;Database=picus;Username=postgres;Password=your_password"
```

Linux/Bash:
```bash
# Setting a single environment variable
export REACT_APP_API_URL=http://localhost:5000

# Setting multiple variables
export ASPNETCORE_ENVIRONMENT=Development
export ConnectionStrings__DefaultConnection="Host=localhost;Database=picus;Username=postgres;Password=your_password"
```

### File Path Differences

Windows uses backslashes (\) for file paths, while Linux uses forward slashes (/). In PowerShell, you can actually use either, but we'll use backslashes for clarity in Windows examples:

PowerShell:
```powershell
cd .\frontend\src\components
```

Linux/Bash:
```bash
cd ./frontend/src/components
```

## Project Setup

### Backend Development Environment

First, we'll set up our .NET development environment. These commands work identically across operating systems, which is one of the strengths of the .NET SDK:

```powershell
# Check if .NET SDK is installed
dotnet --version

# Create the API project
dotnet new webapi -n Picus.Api
cd Picus.Api

# Add essential packages
dotnet add package Microsoft.EntityFrameworkCore.PostgreSQL
dotnet add package Microsoft.AspNetCore.Authentication.JwtBearer
```

### Frontend Development Environment

For our React application, we'll use Node.js commands which work the same across operating systems. However, the way we set environment variables will differ:

```powershell
# Create new Next.js project with Tailwind
npx create-next-app@latest picus-frontend --typescript --tailwind --eslint

# Navigate to project
cd picus-frontend

# Install shadcn/ui CLI and initialize
npx shadcn-ui@latest init
```

Setting up environment variables for development:

PowerShell:
```powershell
# Create .env file for development
$envContent = @"
REACT_APP_API_URL=http://localhost:5000
REACT_APP_AUTH0_DOMAIN=your-domain.auth0.com
REACT_APP_AUTH0_CLIENT_ID=your-client-id
"@
Set-Content -Path .\.env -Value $envContent
```

Linux/Bash:
```bash
# Create .env file for development
cat > .env << EOL
REACT_APP_API_URL=http://localhost:5000
REACT_APP_AUTH0_DOMAIN=your-domain.auth0.com
REACT_APP_AUTH0_CLIENT_ID=your-client-id
EOL
```

[Previous content continues with testing setup, deployment setup, etc., but with PowerShell/Linux command differences noted where relevant]

## Deployment Setup

The deployment configuration files remain the same across operating systems, but the way we handle environment variables locally during development will differ:

### Local Development Configuration

PowerShell:
```powershell
# Set up development environment variables
$env:ASPNETCORE_ENVIRONMENT = "Development"
$env:AUTH0__DOMAIN = "your-domain.auth0.com"
$env:AUTH0__AUDIENCE = "your-api-identifier"

# Start the development server
dotnet run
```

Linux/Bash:
```bash
# Set up development environment variables
export ASPNETCORE_ENVIRONMENT=Development
export AUTH0__DOMAIN=your-domain.auth0.com
export AUTH0__AUDIENCE=your-api-identifier

# Start the development server
dotnet run
```

[Continue with previous content about deployment configuration, version management, etc.]

## Database Management

PostgreSQL commands might differ slightly between operating systems. Here's how to interact with PostgreSQL in different environments:

PowerShell:
```powershell
# Start PostgreSQL service (if installed as a Windows service)
Start-Service postgresql-x64-14

# Connect to PostgreSQL using psql (assuming it's in your PATH)
psql -U postgres
```

Linux/Bash:
```bash
# Start PostgreSQL service
sudo service postgresql start

# Connect to PostgreSQL
sudo -u postgres psql
```

## Running Tests

The testing commands are consistent across operating systems, which simplifies our workflow:

```powershell
# Run all tests (works the same in both environments)
dotnet test

# Run with coverage
dotnet test /p:CollectCoverage=true

# Run specific test project
dotnet test MyProject.Tests
```

Frontend testing commands are also consistent:
```powershell
# Run unit tests (works the same in both environments)
npm test

# Run with coverage
npm test -- --coverage

# Run E2E tests
npx playwright test
```

## Recommended Development Tools for Windows

When developing on Windows, these tools will make your development experience smoother:

1. Windows Terminal: A modern terminal application that can run both PowerShell and WSL (Windows Subsystem for Linux) if needed.

2. Visual Studio Code: Provides excellent support for both .NET and React development. Install these extensions:
   - C# Dev Kit
   - ESLint
   - Prettier
   - GitLens

3. PostgreSQL: Download the Windows installer from the official PostgreSQL website.

4. Postman or Thunder Client (VS Code extension): For testing your API endpoints.

To install these tools using PowerShell:

```powershell
# Install Windows Terminal (if not already installed)
winget install Microsoft.WindowsTerminal

# Install Visual Studio Code
winget install Microsoft.VisualStudioCode

# Install PostgreSQL
winget install PostgreSQL.PostgreSQL
```

[Previous content continues with the rest of the setup and configuration details]

This guide now provides clear instructions for both Windows PowerShell and Linux/Bash environments, making it easier to follow regardless of your operating system. Remember that while command syntax might differ between operating systems, the underlying concepts remain the same. Understanding these differences will help you work more effectively in any environment.