import { useRouter } from "next/router";
import { ReactNode } from "react";
import SearchableLayout from "@/components/searchable-layout";
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";

/// 브라우저에서 localhost:3000 인덱스 경로로 인덱스 페이지를 요청해서, 
/// Next서버가 사전 렌더링을 하게될 때
export const getServerSideProps = ()=> {

}

export default function Page() {
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
