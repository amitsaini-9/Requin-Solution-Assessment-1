"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { MenuIcon, MoonIcon, SunIcon, LogOut } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { hasAccess } from "@/utils/auth";

function MobileNavbar() {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const { theme, setTheme } = useTheme();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

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
    setShowMobileMenu(false);
    router.push("/login");
  };

  return (
    <div className="flex md:hidden items-center space-x-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="mr-2"
      >
        <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
        <span className="sr-only">Toggle theme</span>
      </Button>
      <Sheet open={showMobileMenu} onOpenChange={setShowMobileMenu}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon">
            <MenuIcon className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[300px]">
          <SheetHeader>
            <SheetTitle>Menu</SheetTitle>
            {isLoggedIn && (
              <p className="text-sm text-muted-foreground">
                Logged in as {userRole}
              </p>
            )}
          </SheetHeader>
          <nav className="flex flex-col space-y-4 mt-6">
            <Button
              variant="ghost"
              className="flex items-center gap-3 justify-start border"
              asChild
            >
              <Link href="/">Home</Link>
            </Button>

            {isLoggedIn ? (
              <>
                <Separator className="my-2" />
                <SheetHeader>
                  <SheetTitle className="text-sm">Dashboards</SheetTitle>
                </SheetHeader>

                {hasAccess(userRole, "Admin") && (
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 justify-start border"
                    onClick={() => {
                      router.push("/admin");
                      setShowMobileMenu(false);
                    }}
                  >
                    Admin Dashboard
                  </Button>
                )}

                {hasAccess(userRole, "Editor") && (
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 justify-start border"
                    onClick={() => {
                      router.push("/editor");
                      setShowMobileMenu(false);
                    }}
                  >
                    Editor Dashboard
                  </Button>
                )}

                {hasAccess(userRole, "Viewer") && (
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 justify-start border"
                    onClick={() => {
                      router.push("/viewer");
                      setShowMobileMenu(false);
                    }}
                  >
                    Viewer Dashboard
                  </Button>
                )}

                <Separator className="my-2" />

                <Button
                  variant="destructive"
                  className="flex items-center gap-3 justify-start"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4" />
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 justify-start border"
                  asChild
                >
                  <Link href="/login">Login</Link>
                </Button>
                <Button
                  variant="ghost"
                  className="flex items-center gap-3 justify-start border"
                  asChild
                >
                  <Link href="/register">Register</Link>
                </Button>
              </>
            )}
          </nav>
        </SheetContent>
      </Sheet>
    </div>
  );
}

export default MobileNavbar;
