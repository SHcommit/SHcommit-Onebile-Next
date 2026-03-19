import { notFound } from "next/navigation";
import style from "./page.module.css";
import { createReviewAction } from "@/actions/createReview.action";

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

function ReviewEditor({ bookId }: { bookId: string }) {
  return (
    <section>
      <form action={createReviewAction}>
        {/** 인풋에서 북 아이디는 안보이게! hidden + readOnly */}
        <input name="bookId" value={bookId} hidden readOnly />
        <input required name="content" placeholder="리뷰 내용" />
        <input required name="author" placeholder="작성자" />
        <button type="submit"> 작성하기</button>
      </form>
    </section>
  );
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
    </div>
  );
}
