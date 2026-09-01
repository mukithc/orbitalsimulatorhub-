import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { ErrorBoundary } from "./ErrorBoundary";
import { ThemeProvider } from "./lib/ThemeContext";
import App from "./App";
import "./index.css";
import "./styles/osh-theme.css";

// Apply saved theme before React renders to prevent flash
(function () {
  try {
    const saved = localStorage.getItem("osh-theme");
    if (saved) document.documentElement.setAttribute("data-theme", saved);
    else document.documentElement.setAttribute("data-theme", "space-aurora");
  } catch { document.documentElement.setAttribute("data-theme", "space-aurora"); }
})();

const rootEl = document.getElementById("root");
if (!rootEl) {
  document.body.innerHTML = "<p style='padding:20px;font-family:sans-serif'>Error: #root not found.</p>";
} else {
  try {
    createRoot(rootEl).render(
      <StrictMode>
        <ErrorBoundary>
          <ThemeProvider>
            <App />
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </ErrorBoundary>
      </StrictMode>
    );
    document.getElementById("seo-static")?.setAttribute("hidden", "hidden");
  } catch (err) {
    rootEl.innerHTML = `<div style="padding:20px;font-family:sans-serif;white-space:pre-wrap">App failed to load: ${err instanceof Error ? err.message : String(err)}</div>`;
  }
}
