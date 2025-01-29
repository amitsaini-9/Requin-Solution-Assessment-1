"use client";

import RoleProtectedRoute from "@/components/RoleProtectedRoute";
import { RoleIndicator } from "@/components/dashboard/RoleIndicator";

export default function AdminDashboard() {
  return (
    <RoleProtectedRoute requiredRole="Admin">
      <div className="space-y-6">
        <RoleIndicator userRole="Admin" pageRole="Admin Dashboard" />
      </div>
    </RoleProtectedRoute>
  );
}
