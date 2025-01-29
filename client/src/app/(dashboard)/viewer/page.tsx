"use client";

import { useEffect, useState } from "react";
import { RoleIndicator } from "@/components/dashboard/RoleIndicator";

export default function ViewerDashboard() {
  const [userRole, setUserRole] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(window.atob(base64));
      setUserRole(payload.role);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <RoleIndicator pageRole="Viewer Dashboard" />
    </div>
  );
}
