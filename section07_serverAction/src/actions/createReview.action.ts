"use server";
/// api가 자동으로 생성됨 !

/// useServer는 함수 맨 위로.
/// nested function으로 선언할때는 createReviewAction함수 스코프 안에서, 첫줄에 작성하면됨
export async function createReviewAction(formData: FormData) {
  const bookId = formData.get("bookId")?.toString();
  const content = formData.get("content")?.toString();
  const author = formData.get("author")?.toString();

  if (!content || !author || !bookId) {
    return;
  }

  try {
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
    console.log(response.status);
  } catch (err) {
    console.log(err);
    return;
  }
}
