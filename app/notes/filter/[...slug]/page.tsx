import NotesClient from "./Notes.client";
import { Metadata } from "next";

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] || "all";
  return {
    title: `Filter: ${tag}`,
    description: `All notes with ${tag} tag`,
    openGraph: {
      title: `Filter: ${tag}`,
      description: `All notes with ${tag} tag`,
      url: `https://08-zustand-three-hazel.vercel.app/notes/filter/${tag}`,
      images: [
        {
          url: `https://ac.goit.global/fullstack/react/notehub-og-meta.jpg`,
          width: 1200,
          height: 630,
          alt: "Note Hub",
        },
      ],
      type: "website",
    },
  };
}

export default async function Notes({ params }: Props) {
  const { slug } = await params;
  const tag = slug[0] || "all";

  return <NotesClient tag={tag} />;
}
