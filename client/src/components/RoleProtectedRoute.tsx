"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { hasAccess } from "@/utils/auth";
import { useToast } from "@/hooks/use-toast";

interface RoleProtectedRouteProps {
  children: React.ReactNode;
  requiredRole: string;
}

export default function RoleProtectedRoute({
  children,
  requiredRole,
}: RoleProtectedRouteProps) {
  const router = useRouter();
  const { toast } = useToast();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast({
        variant: "destructive",
        title: "Access Denied",
        description: "Please login to continue",
      });
      router.push("/login");
      return;
    }

    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(window.atob(base64));

      if (!hasAccess(payload.role, requiredRole)) {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "You don't have permission to access this page",
        });
        router.push("/");
        return;
      }

      setIsAuthorized(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Authentication Error",
        description: "Please login again",
      });
      router.push("/login");
    }
  }, [requiredRole, router, toast]);

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
