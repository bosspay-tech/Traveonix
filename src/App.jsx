import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import AppShell from "./components/AppShell";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Providers from "./pages/Providers";
import Pay from "./pages/Pay";
import History from "./pages/History";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import AvailableRoutes from "./pages/AvailableRoutes";
import SearchTrips from "./pages/SearchTrips";
import RefundPolicy from "./pages/RefundPolicy";
import Terms from "./pages/Terms";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<SearchTrips />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/refunds" element={<RefundPolicy />} />
      <Route path="/contact" element={<Contact />} />
      </Route>

      {/* public (no shell) */}

      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />

      {/* protected */}
      <Route
        element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }
      >
        <Route path="/pay/:category" element={<Pay />} />
        <Route path="/routes" element={<AvailableRoutes />} />
        <Route path="/history" element={<History />} />
        <Route path="/providers/:category" element={<Providers />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
