import { ReactNode, Suspense } from "react";
import Searchbar from "../../components/searchbar";

/// suspense란?
/// 그 전에, Searchbar는 클라이언트 컴포넌트다.
/// 서버 컴포넌트에서 직접 호출하면 빌드 에러가 발생한다. 빌드시간에 사용자가 검색 입력 안했으니까..
/// 그대신 호출하는 서버 컴포넌트에서 이렇게 Suspense로 감싸면, 클라이언트 코드를 비동기로 로딩한다.
/// 언제까지 fallback 상태로 남아있냐면, Searchbar의 비동기 작업이 종료될 때 까지!!
/// useSearchParams느 비동기로 작동함.
/// 언제 종료된다고 ? searchbar컴포넌트 비동기작업?!
/// => 클라이언트 사이드에서 쿼리 스트링 불러왔을 때. 즉 브라우저에 마운트 되었을 때 
/// 그래서 서치바 컴포넌트는 next.js 서버측 사전 렌더링에서 완전히  제외됨
export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Searchbar />
      </Suspense>
      {children}
    </div>
  );
}
