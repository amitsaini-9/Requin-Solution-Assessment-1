"use client";

import RoleProtectedRoute from "@/components/RoleProtectedRoute";
import { RoleIndicator } from "@/components/dashboard/RoleIndicator";

export default function EditorDashboard() {
  return (
    <RoleProtectedRoute requiredRole="Editor">
      <div className="space-y-6">
        <RoleIndicator pageRole="Editor Dashboard" />
      </div>
    </RoleProtectedRoute>
  );
}
