import { useAuth0 } from "@auth0/auth0-react";
import { Button } from "./ui/button";

export function Navbar() {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <nav className="border-b">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold">Picus NFL Picks</h1>
        </div>
        <div className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span>Welcome, {user?.name}</span>
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
