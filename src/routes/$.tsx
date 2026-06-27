import { createFileRoute } from "@tanstack/react-router";
import App from "@/site/App";

// Catch-all: HashRouter handles client-side routing inside <App />.
export const Route = createFileRoute("/$")({
  component: App,
});
