import { ReactNode, useState, useEffect } from "react";
import SearchableLayout from "@/components/searchable-layout";
import BookItem from "@/components/book-item";
import { Book } from "@/types";
import fetchBooks from "@/lib/fetch-books";
import { useRouter } from "next/router";
import Head from "next/head";

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
      <Head>
        <title>한입북스 - 검색결과</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스-검색결과" />
        <meta
          property="og:description"
          content="한입 북스에 등록된 도서들 만나보세요~"
        />
      </Head>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}

Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout> {page}</SearchableLayout>;
};
