import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { BookData } from "@/types";

/// Footer에서도 book 전체 종류를 받아오고
/// Search 페이지에서도 book 전체 종류를 받아온다.
/// 요청 url이 같은데 서로 다른 컴포넌트에서 요청을 한다..
/// 상당히 비효율적인건데
/// Next에서는 Request memoization을 지원해주기 때문에 괜찮다.
/// 각각의 렌더링될 때 호출했던 url의 response를 캐싱해주기 때문임 : )

/// 서버렌더링임 => 다이내믹
/// 이거 하나때문에!
async function Footer() {
  // const response = await fetch(
  //   `${process.env.NEXT_PUBLIC_API_SERVER_URL}/book`,
  //   { cache: "force-cache" },
  // );
  // if (!response.ok)  <footer>제작 @Seung-Hyun, Yang</footer>;
  // const books: BookData[] = await response.json();
  // const numberOfBooks = books.length;

  return (
    <footer>
      <div>제작 @Seung-Hyun, Yang</div>
      {/* <div>{numberOfBooks}개의 도서가 등록되어 있습니다.</div> */}
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className={style.container}>
          <header>
            <Link href={"/"}>📚 ONEBITE BOOKS</Link>
          </header>
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
