"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { API_URL } from "@/config/api";
import axios from "axios";
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
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const verifyAccess = async () => {
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
        // Verify token and role
        const response = await axios.get(
          `${API_URL}/api/${requiredRole.toLowerCase()}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        // Get user role from token
        const base64Url = token.split(".")[1];
        const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        const payload = JSON.parse(window.atob(base64));
        setUserRole(payload.role);

        setIsAuthorized(true);
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Access Denied",
          description: "You don't have permission to access this page",
        });
        router.push("/");
      }
    };

    verifyAccess();
  }, [requiredRole, router, toast]);

  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}
