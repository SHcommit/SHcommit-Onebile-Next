"use server";

import { revalidateTag } from "next/cache";
import { delay } from "@/util/delay";

/// api가 자동으로 생성됨 !

/// useServer는 함수 맨 위로.
/// nested function으로 선언할때는 createReviewAction함수 스코프 안에서, 첫줄에 작성하면됨
export async function createReviewAction(_: any, formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!content || !author || !bookId) {
    return {
      status: false,
      error: "리뷰 내용과 작성자를 입력해주세요",
    };
  }

  try {
    await delay(2000);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/review`,
      {
        method: "POST",
        body: JSON.stringify({
          bookId,
          content,
          author,
        }),
      },
    );
    if (!response.ok) throw new Error("리뷰 저장에 실패했습니다");

    console.log(response.status);
    // revalidatePath(`/book/${bookId}`);
    revalidateTag(`review-${bookId}`, "default");
    return {
      status: true,
      error: "",
    };
  } catch (err) {
    console.log(err);
    return {
      status: false,
      error: `리뷰 저장에 실패했습니다 : ${err}`,
    };
  }
}
