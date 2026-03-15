import { ReactNode, useState, useEffect } from "react";
import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item";
import { Book } from "@/types";
import fetchBooks from "@/lib/fetch-books";
import { useRouter } from "next/router";

export default function Page() {
  const [books, setBooks] = useState<Book[]>([]);
  const router = useRouter();
  const q = router.query.q;
  const fetchSearchResult = async () => {
    const data = await fetchBooks(q as string);
    setBooks(data);
  };
  useEffect(() => {
    if (q) {
      fetchSearchResult();
    }
  }, [q]);

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout> {page}</SearchableLayout>;
};
