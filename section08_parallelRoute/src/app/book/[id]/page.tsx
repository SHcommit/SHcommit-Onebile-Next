import { notFound } from "next/navigation";
import style from "./page.module.css";
import { BookData, ReviewData } from "@/types";
import ReviewItem from "@/components/reviewItem";
import ReviewEditor from "@/components/ReviewEditor";

/// 북페이지는 기본적으로 다이내믹 페이지다.
/// 스태틱으로 만들기 위해서 가능한 경로들을 알려주면 된다.
/// 정적인 파라미터를 생성한다.

// 만약 이 지정된 id이외에는 모두 404로 하고 싶다면?
// export const dynamicParams = false 로 처리하면 됨
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}

async function BookDetail({ bookId }: { bookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${bookId}`,
    { next: { tags: [`review-${bookId}`] } },
  );
  if (!response.ok) {
    /// 낫 파운드 규칙 not-found.tsx
    if (response.status === 404) {
      notFound();
    }
    return <div>오류가 발생했습니다.</div>;
  }

  const data = await response.json();

  const { title, subTitle, description, author, publisher, coverImgUrl } = data;

  return (
    <section>
      <div
        className={style.cover_img_container}
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}>{description}</div>
    </section>
  );
}

async function ReviewList({ withBookId }: { withBookId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review/book/${withBookId}`,
  );

  if (!response.ok)
    throw new Error(`review fetch failed: ${response.statusText}`);

  const reviews: ReviewData[] = await response.json();

  return (
    <section>
      {reviews.map((review) => (
        <ReviewItem key={`review-item-${review.id}`} {...review} />
      ))}
    </section>
  );
}

/// 이 페이지 또한 동적으로 메타데이터 생성
// 현재 도서의 상세 정보도 받아오면 좋을 것임
// 한 페이지에서 api 중복 호출해도 next내부에서는 최적화해줌 중복 호출 api에 대해서
// 리퀘스트 메모이제이션
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/${id}`,
    {
      cache: "force-cache",
    },
  );

  if (!response.ok) throw new Error(response.statusText);
  const book: BookData = await response.json();

  return {
    title: `${book.title} - 한입북스`,
    description: `${book.description}`,
    openGraph: {
      title: `${book.title} - 한입북스`,
      description: `${book.description}`,
      iamges: [book.coverImgUrl],
    },
  };
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return (
    <div className={style.container}>
      <BookDetail bookId={id} />
      <ReviewEditor bookId={id} />
      <ReviewList withBookId={id} />
    </div>
  );
}
