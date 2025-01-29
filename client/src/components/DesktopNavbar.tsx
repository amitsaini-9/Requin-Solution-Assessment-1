"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "./ModeToggle";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const DesktopNavbar = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(window.atob(base64));
      setIsLoggedIn(true);
      setUserRole(payload.role);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUserRole(null);
    router.push("/login");
  };

  return (
    <div className="hidden md:flex relative gap-4 items-center">
      <div className="transition-transform hover:scale-105">
        <ModeToggle />
      </div>

      {isLoggedIn ? (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="transition-all hover:scale-105"
              >
                Dashboards
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {userRole === "Admin" && (
                <DropdownMenuItem
                  onClick={() => router.push("/admin")}
                  className="cursor-pointer hover:bg-accent"
                >
                  Admin Dashboard
                </DropdownMenuItem>
              )}
              {(userRole === "Admin" || userRole === "Editor") && (
                <DropdownMenuItem
                  onClick={() => router.push("/editor")}
                  className="cursor-pointer hover:bg-accent"
                >
                  Editor Dashboard
                </DropdownMenuItem>
              )}
              <DropdownMenuItem
                onClick={() => router.push("/viewer")}
                className="cursor-pointer hover:bg-accent"
              >
                Viewer Dashboard
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="destructive"
            onClick={handleLogout}
            className="transition-all hover:scale-105"
          >
            Logout
          </Button>
        </>
      ) : (
        <>
          <Button
            variant="outline"
            onClick={() => router.push("/login")}
            className="transition-all hover:scale-105"
          >
            Login
          </Button>
          <Button
            onClick={() => router.push("/register")}
            className="transition-all hover:scale-105"
          >
            Register
          </Button>
        </>
      )}
    </div>
  );
};

export default DesktopNavbar;
