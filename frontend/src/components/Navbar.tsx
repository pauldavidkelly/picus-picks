import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

export function Navbar() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          <Link to="/" className="text-xl font-bold hover:text-primary">
            Picus NFL Picks
          </Link>
          {isAuthenticated && (
            <>
              <Link 
                to="/games" 
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Games
              </Link>
              <Link 
                to="/picks/2023/1" 
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                Picks
              </Link>
            </>
          )}
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm">Welcome, {user?.name}</span>
              <Button
                variant="outline"
                onClick={() =>
                  logout({ logoutParams: { returnTo: window.location.origin } })
                }
              >
                Log Out
              </Button>
            </>
          ) : (
            <Button onClick={() => loginWithRedirect()}>Log In</Button>
          )}
        </div>
      </div>
    </nav>
  );
}
