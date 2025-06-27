import React from "react";
import { Navigate, Outlet } from "react-router";

export default function AuthGuard() {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}
