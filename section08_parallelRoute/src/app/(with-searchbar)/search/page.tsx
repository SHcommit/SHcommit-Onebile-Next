import BookItem from "@/components/book-item";
import BookListSkeleton from "@/components/skeleton/book-list-skeleton";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Metadata } from "next";
import { describe } from "node:test";
import { Suspense } from "react";

async function SearchResult({ q }: { q: string }) {
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

/// 검색어 ..접근 어떻게?!
/// 동적인  값을 통해 메타데이터 설정해야하는 경우
/// Metadata라는 변수를 통해 정적으로 현재 페이지에 메타데이터 내보내는 방식 사용 하면 안됌
const ___metadata: any = {
  title: "~~",
  dsecription: "gg",
  openGraph: {},
};

/// 이 방식을 써야함
/// 현재 페이지에 메타데이터를 동적으로 생성함
// 동적
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return {
    title: `${q} : 한입북스 검색`,
    description: `${q}의 검색 결과입니다`,
    openGraph: {
      title: `${q} : 한입북스 검색`,
      description: `${q}의 검색 결과입니다`,
      images: ["/thumbnail.png"],
    },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const { q } = await searchParams;
  return (
    <Suspense key={q || ""} fallback={<BookListSkeleton withCount={3} />}>
      <SearchResult q={q || ""} />
    </Suspense>
  );
}
