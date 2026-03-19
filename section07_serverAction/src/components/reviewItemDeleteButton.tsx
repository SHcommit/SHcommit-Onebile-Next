"use client";

import { deleteReviewAction } from "@/actions/deleteReview.action";
import { use, useEffect, useRef, useActionState } from "react";

/// 클라이언트 컴포넌트에서 직접 서버 액션 호출하기 !
/// 버튼쓰기 싫을때 난 div쓸건데~

/// 그냥 api 직접 호출해도 될턴데
/// 서버액션에 찰떡궁합이 form 이고, 데이터 넣고 꺼내기도 형식상 formData로하면되는거여서 그런강
/// 뭐 서버 호출할때 바인딩같은거 안쓰고 리엑터랑 서버액션에서제공하는거 쓰면 편해서 그런가봄
/// 바인딩 안쓰지만 서버액션 제공해주니까 이거로 처리하는 느낌
/// useActionState로 에러핸들링, isPending제공되니까 굿굿
export default function ReviewItemDeleteButton({
  reviewId,
  bookId,
}: {
  reviewId: number;
  bookId: number;
}) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, formAction, isPending] = useActionState(
    deleteReviewAction,
    null,
  );

  useEffect(() => {
    if (state && !state.status) alert(state.error);
  }, [state]);

  return (
    <form ref={formRef} action={formAction}>
      <input name="reviewId" value={reviewId} hidden />
      <input name="bookId" value={bookId} hidden />
      {isPending ? (
        "..."
      ) : (
        <div onClick={() => formRef.current?.requestSubmit()}>삭제하기</div>
      )}
    </form>
  );
}
