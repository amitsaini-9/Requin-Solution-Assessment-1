"use client";

import { useEffect, useState } from "react";

interface RoleIndicatorProps {
  pageRole: string;
}

export function RoleIndicator({ pageRole }: RoleIndicatorProps) {
  const [userRole, setUserRole] = useState<string>("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      const payload = JSON.parse(window.atob(base64));
      setUserRole(payload.role);
    }
  }, []);

  return (
    <div className="mb-6 p-4 bg-muted rounded-lg">
      <h2 className="text-lg font-semibold mb-2">Access Information</h2>
      <p>
        Your Role: <span className="font-medium text-primary">{userRole}</span>
      </p>
      <p>
        Current Dashboard:{" "}
        <span className="font-medium text-primary">{pageRole}</span>
      </p>
      {userRole === "Admin" && (
        <p className="text-sm text-muted-foreground mt-2">
          As an Admin, you have access to all dashboards
        </p>
      )}
      {userRole === "Editor" && (
        <p className="text-sm text-muted-foreground mt-2">
          As an Editor, you have access to Editor and Viewer dashboards
        </p>
      )}
      {userRole === "Viewer" && (
        <p className="text-sm text-muted-foreground mt-2">
          As a Viewer, you have access to the Viewer dashboard only
        </p>
      )}
    </div>
  );
}
