import { GetStaticPropsContext, InferGetStaticPropsType } from "next";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetch-oneBook";
import { useRouter } from "next/router";
import Head from "next/head";

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: true, // paths에 해당하지 않는 경우 false인 경우에 not found.
  };
};

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const id = context.params!.id;
  const book = await fetchOneBook(Number(id));

  if (!book) {
    return {
      notFound: true,
    };
  }

  return {
    props: { book },
  };
};

/// ssg + fallback: true인 경우엔
/// 페이지 보내고 연이어 넥스트 서버에서 데이터 페치를 해서 보내끼 때무네 일단 로딩 검증을 해야함
/// book = null이지만, 로딩중인건데 -> 문제 발생됬습니다. 다시 시도해서요 이렇게 보여주면 애매하잖음


/// 한 가지 또 주의사항은
/// SSG방식인데, 1,2,3을 제외한 나머지들은 추후에 사용자의 요청에 의해서 SSG가 적용된다.
/// 즉 10번 도서 요청이 처음 들어오게 된다면, fallback:true이니까, 빌드타임에 생성되지 않았기 때문에
/// 처음 요청받은 html의 메타테그를 보면 우리가 설정한 meta가 사라져 있다.
/// 이유는 처음에 우리가 router.isFallback return 로딩중입니다. 이렇게 로직이 되어있기 때문이다. 
/// 그래서 위의 로직을 적용하면 SEO설정이 안되어 버린다...
/// 그래서 아직 page가 fallback 상태여서 로딩중인 경우에도 기본적인 메타테그를 설정해주도록 하쟈.
export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback) return <>
    <Head>
        <title>한입북스</title>
        <meta property="og:image" content="/thumbnail.png" />
        <meta property="og:title" content="한입북스" />
        <meta property="og:description" content="한입 북스에 등록된 도서들을 만나보세요" />
      </Head>
    <div>
      로딩중입니다.
    </div>
  </>;
  if (!book) return "문제가 발생됬습니다. 다시 시도하세요.";

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  /// 여기서 좋은점은 페이지별로 서로다른 og를 부여 할 수 있는거구
  /// 그렇다면 아래처럼 이렇게 책 상세페이지는 상세 컨텐츠로 og설정할 수 있다.
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:image" content={coverImgUrl} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
      </Head>
      <div className={style.container}>
        <div
          className={style.coverImgContainer}
          style={{ backgroundImage: `url(${coverImgUrl})` }}
        >
          <img src={coverImgUrl} />
        </div>
        <div className={style.title}>{title}</div>
        <div className={style.subTitle}>{subTitle}</div>
        <div className={style.author}>
          {author} | {publisher}
        </div>
        <div className={style.description}>{description}</div>
      </div>
    </>
  );
}
