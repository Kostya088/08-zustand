import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found",
  description:
    "This page does not exist. The requested Note Hub page could not be found.",
  openGraph: {
    title: "404 - Page Not Found",
    description:
      "This page does not exist. The requested Note Hub page could not be found.",
    url: "https://08-zustand-three-hazel.vercel.app/",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        width: 1200,
        height: 630,
        alt: "404 - Page Not Found",
      },
    ],
  },
};

export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "50vh",
        textAlign: "center",
      }}
    >
      <h1>404 - Page not found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}
