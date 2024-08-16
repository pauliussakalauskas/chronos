import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Navigation } from "./components";
import { HomePage } from "./pages/Home";
import { SettingsPage } from "./pages/Settings";

export enum RouteKeys {
  Settings = "/settings",
  Root = "/",
}

export function AppRoutes() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path={RouteKeys.Root} element={<HomePage />} />
        <Route path={RouteKeys.Settings} element={<SettingsPage />} />
      </Routes>
    </BrowserRouter>
  );
}
