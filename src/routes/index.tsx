import { createFileRoute } from "@tanstack/react-router";
import App from "@/site/App";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AmmApp — App semplici, private, fatte con cura" },
      { name: "description", content: "AmmApp è un piccolo laboratorio indipendente che costruisce app mobile leggere, senza account né server. I tuoi dati restano sul telefono." },
      { property: "og:title", content: "AmmApp" },
      { property: "og:description", content: "App mobile leggere, senza account né server. I tuoi dati restano sul telefono." },
    ],
  }),
  component: App,
});
