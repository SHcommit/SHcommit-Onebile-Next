import BookItem from "@/components/book-item";
import style from "./page.module.css";
import { BookData } from "@/types";
import { delay } from "@/util/delay";
import { Suspense } from "react";

/// 특정 페이지의 유형을 강제로 static, dynamic으로 설정해주는기능
/// 이를 사용하면 페이지 내부 동적 함수나 데이터 캐시 유무를 떠나서 강제로
/// 해당하는 페이지를 스태틱이나 다이내믹으로 지정이 가능한거

/// 1. auto : 기본값, 아무것도 강제로 안함. 개발자가 정한거에 따라서 그대로~
/// 2. force-dynaimc : 페이지를 무조건 다이내믹으로 설정함
/// 3. force-static : 페이지를 무조건 스태틱으로 설정함
///  -> 근데 검색페이지에 사용자의 입력인 쿼리가 필요한데 강제로 스태틱 해버리면 제대로 동작 안될수있음
/// 4. error : 페이지를 강제로 스태틱 페이지로 설정
/// -> 근데 동적 함수라던가 캐싱되지 않는 데이터 패칭등 스태틱으로 설정하면 안되는 이유가 있으면
/// 빌드 오류 내보냄
/// export const dynamic = 'auto'

/// fetch -> 캐싱안하니까 dynamic페이지로 되버림.
/// 도서 정보를 force-cache로 바꿔줘보자 데이터가 한정되어이싿 가정하면!
/// 그럼 스태틱 페이지로 작동됨 !!
async function AllBooks() {
  await delay(1500);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
    { cache: "force-cache" },
  );
  if (!response.ok) return <div>오류가 발생했습니다 ...</div>;
  const allBooks: BookData[] = await response.json();
  return allBooks.map((book) => <BookItem key={book.id} {...book} />);
}

async function RecoBooks() {
  await delay(3000);
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book/random`,
    { cache: "force-cache" },
  );
  if (!response.ok) return <div>오류가 발생했어요 ㅠㅠ..</div>;
  const recoBooks: BookData[] = await response.json();
  return recoBooks.map((book) => <BookItem key={book.id} {...book} />);
}

export default async function Home() {
  return (
    <div className={style.container}>
      <section>
        <h3>지금 추천하는 도서</h3>
        <Suspense fallback={<div>도서를 불러오는 중이에욤 ...</div>}>
          <RecoBooks />
        </Suspense>
      </section>
      <section>
        <h3>등록된 모든 도서</h3>
        <Suspense fallback={<div>도서를 불러오는 중이에욤 ...</div>}>
          <AllBooks />
        </Suspense>
      </section>
    </div>
  );
}
