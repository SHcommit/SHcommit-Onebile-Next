// 대체 로딩 ui
// 이렇게 선언하면 이제 스트리밍을 쓸 준비가 자동으로 만들어짐 (Suspense boundary)
// <Suspense fallback={<Loading />}>
//  <Page />
// </Suspense>
// 페이지가 실제 서버 컴포넌트고 fallback이 로딩
export default function Loading() {
  return <div>Loading...</div>
}