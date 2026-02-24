"use client";

import css from "./NoteForm.module.css";
import { createNote, fetchNotes, type CreateNoteProps } from "../../lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNoteStore } from "@/lib/store/noteStore";
import { useRouter } from "next/navigation";

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { draft, setDraft, clearDraft } = useNoteStore();

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setDraft({ ...draft, [event.target.name]: event.target.value });
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createNote,
    onSuccess: async (createdNote) => {
      await Promise.all([
        queryClient.prefetchQuery({
          queryKey: ["notes", 1, "", "all"],
          queryFn: () => fetchNotes({ page: 1, query: "", tag: "all" }),
        }),
        queryClient.prefetchQuery({
          queryKey: ["notes", 1, "", createdNote.tag],
          queryFn: () =>
            fetchNotes({ page: 1, query: "", tag: createdNote.tag }),
        }),
      ]);
      clearDraft();
      router.push("/notes/filter/all");
    },
    onError(error) {
      console.error("Failed to create note:", error);
    },
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const values: CreateNoteProps = {
      title: String(formData.get("title") ?? ""),
      content: String(formData.get("content") ?? ""),
      tag: String(formData.get("tag") ?? "Todo"),
    };

    mutate(values);
  };

  const handleCancel = () => router.push("/notes/filter/all");

  return (
    <form className={css.form} onSubmit={handleSubmit}>
      <div className={css.formGroup}>
        <label htmlFor={`title`}>Title</label>
        <input
          type="text"
          name="title"
          id={`title`}
          className={css.input}
          value={draft.title}
          onChange={handleChange}
          minLength={3}
          maxLength={50}
          required
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`content`}>Content</label>
        <textarea
          name="content"
          id={`content`}
          rows={8}
          className={css.textarea}
          value={draft.content}
          onChange={handleChange}
          maxLength={500}
        />
      </div>

      <div className={css.formGroup}>
        <label htmlFor={`tag`}>Tag</label>
        <select
          name="tag"
          className={css.select}
          id={`tag`}
          value={draft.tag || "Todo"}
          onChange={handleChange}
          required
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="button"
          className={css.cancelButton}
          onClick={handleCancel}
        >
          Cancel
        </button>
        <button type="submit" className={css.submitButton} disabled={isPending}>
          Create note
        </button>
      </div>
    </form>
  );
}
