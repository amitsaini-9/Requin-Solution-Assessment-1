"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
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

  const navigateToDashboard = () => {
    switch (userRole) {
      case "Admin":
        router.push("/admin");
        break;
      case "Editor":
        router.push("/editor");
        break;
      case "Viewer":
        router.push("/viewer");
        break;
      default:
        router.push("/login");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Welcome to Dashboard
          </CardTitle>
          <CardDescription>
            {isLoggedIn
              ? `Welcome back, ${userRole}!`
              : "Please login or register to continue"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {isLoggedIn ? (
            <div className="space-y-4">
              <Button className="w-full" onClick={navigateToDashboard}>
                Go to Dashboard
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <Button className="w-full" onClick={() => router.push("/login")}>
                Login
              </Button>
              <Button
                className="w-full"
                variant="outline"
                onClick={() => router.push("/register")}
              >
                Register
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
