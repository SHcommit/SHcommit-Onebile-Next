import BookItem from "@/components/book-item";
import { BookData } from "@/types";
import { delay } from "@/util/delay";

/// 스트리밍을 써보쟈.
/// 해당페이지와 동일한 폴더에 loading.tsx
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  await delay(1300);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/search?q=${q}`,
    { cache: "force-cache" },
  );
  if (!response.ok) return <div>오류가 발생했습니다.</div>;

  const books: BookData[] = await response.json();

  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
