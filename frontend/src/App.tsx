import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { GamesPage } from './pages/GamesPage';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
      }}
    >
      <Router>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={
                <>
                  <div>
                    <a href="https://vite.dev" target="_blank">
                      <img src={viteLogo} className="logo" alt="Vite logo" />
                    </a>
                    <a href="https://react.dev" target="_blank">
                      <img src={reactLogo} className="logo react" alt="React logo" />
                    </a>
                  </div>
                  <h1>Vite + React</h1>
                  <div className="card">
                    <button onClick={() => setCount((count) => count + 1)}>
                      count is {count}
                    </button>
                    <p>
                      Edit <code>src/App.tsx</code> and save to test HMR
                    </p>
                  </div>
                  <p className="read-the-docs">
                    Click on the Vite and React logos to learn more
                  </p>
                  <div>Welcome to Picus NFL Picks!</div>
                </>
              } />
              <Route path="/games" element={<GamesPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Auth0Provider>
  )
}

export default App
