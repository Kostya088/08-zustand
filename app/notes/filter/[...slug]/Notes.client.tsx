"use client";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import NoteList from "../../../../components/NoteList/NoteList";
import css from "./page.module.css";
import { fetchNotes } from "../../../../lib/api";
import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Link from "next/link";

type Props = {
  tag: string;
};

export default function NotesClient({ tag }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const { data, isLoading } = useQuery({
    queryKey: ["notes", currentPage, searchQuery, tag],
    queryFn: () => fetchNotes({ page: currentPage, query: searchQuery, tag }),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
  });

  const updateSearchQuery = useDebouncedCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      setCurrentPage(1);
    },
    300,
  );

  const totalPages = data?.totalPages ?? 0;
  const notes = data?.notes ?? [];

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox defaultValue={searchQuery} onChange={updateSearchQuery} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setPage={setCurrentPage}
          />
        )}
        <Link
          href="/notes/action/create"
          aria-label="Create new note"
          className={css.button}
          style={{ textDecoration: "none" }}
        >
          Create note +
        </Link>
      </div>

      {notes.length > 0 && <NoteList notes={notes} />}
      {!isLoading && notes.length === 0 && (
        <h2 style={{ textAlign: "center" }}>No search results</h2>
      )}
    </div>
  );
}
