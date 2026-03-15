import { Html, Head, Main, NextScript } from "next/document";

/// 모든 페이지에 공통적으로 적용해야하는 Next.js앱의 html코드 설정하는 컴포넌트.
/// index.html 과 유사.
/// 모든 페이지에 적용 되야 하는
// 메타테그나 폰트 불러오거나 캐릭터 셋 설정하거나, 구글 에널리틱스와 같은 서드 파티 스크립트를  넣는다거나
/// 등등 페이지 전체에 다 적용되는 html태그 관리할 때 사용됨.
export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
