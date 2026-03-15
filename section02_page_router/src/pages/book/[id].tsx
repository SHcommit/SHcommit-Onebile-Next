import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetStaticPropsContext,
  InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import style from "./[id].module.css";
import fetchOneBook from "@/lib/fetch-oneBook";
import { getStaticPaths } from "next/dist/build/templates/pages";
import { useRouter } from "next/router";

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
export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback) return "로딩중입니다";
  if (!book) return "문제가 발생됬습니다. 다시 시도하세요.";

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
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
  );
}
