import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Note Hub",
  description: "Create new note",
  openGraph: {
    title: "Note Hub",
    description: "Create new note",
    url: `https://08-zustand-three-hazel.vercel.app/notes/action/create`,
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

export default function CreateNote() {
  return (
    <main className={css.main}>
      <div className={css.container}>
        <h1 className={css.title}>Create note</h1>
        <NoteForm />
      </div>
    </main>
  );
}
