import './App.css'
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { GamesPage } from './pages/GamesPage';
import { PicksPage } from './pages/picks/PicksPage';

function App() {
  return (
    <Auth0Provider
      domain={import.meta.env.VITE_AUTH0_DOMAIN}
      clientId={import.meta.env.VITE_AUTH0_CLIENT_ID}
      authorizationParams={{
        redirect_uri: window.location.origin,
        audience: import.meta.env.VITE_AUTH0_AUDIENCE,
        scope: "openid profile email offline_access"
      }}
      cacheLocation="localstorage"
      useRefreshTokens={true}
      useRefreshTokensFallback={true}
    >
      <Router>
        <div className="min-h-screen bg-background">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={
                <div className="text-center">
                  <h1 className="text-4xl font-bold mb-4">Welcome to Picus NFL Picks!</h1>
                  <p className="text-lg text-muted-foreground">Sign in to start making your picks</p>
                </div>
              } />
              <Route path="/games" element={<GamesPage />} />
              <Route path="/picks/:season/:week" element={<PicksPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </Auth0Provider>
  )
}

export default App
