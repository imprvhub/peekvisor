import type { APIRoute } from "astro";

export const GET: APIRoute = () => {
  const icons = [
    {
      src: "/favicons/favicon-192.png",
      sizes: "192x192",
      type: "image/png",
      purpose: "any",
    },
    {
      src: "/favicons/favicon-512.png",
      sizes: "512x512",
      type: "image/png",
      purpose: "maskable",
    },
  ];

  const manifest = {
    short_name: "PeekVisor",
    name: "PeekVisor",
    icons,
    display: "minimal-ui",
    id: "/",
    start_url: "/",
    theme_color: "#FFEDD5",
    background_color: "#262626",
  };

  return new Response(JSON.stringify(manifest));
};
