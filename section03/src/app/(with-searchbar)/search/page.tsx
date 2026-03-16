// 함수형 컴포넌트에 어떻게 async?키워드를 붙여?
// 서버컴포넌트인 경우에 가능함
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ q: string }>;
}) {
  const { q } = await searchParams;
  console.log(q);
  return <div> 서리페이지: {q}</div>;
}
