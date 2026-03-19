"use client";

import style from "./ReviewEditor.module.css";
import { createReviewAction } from "@/actions/createReview.action";
import { useActionState, useEffect } from "react";

export default function ReviewEditor({ bookId }: { bookId: string }) {
  const [state, formAction, isPending] = useActionState(
    createReviewAction,
    null,
  );
  useEffect(() => {
    if (state && !state.status) {
      alert(state.console.error());
    }
  }, [state]);

  return (
    <section>
      <form className={style.formContainer} action={formAction}>
        {/** 인풋에서 북 아이디는 안보이게! hidden + readOnly */}
        <input name="bookId" value={bookId} hidden readOnly />
        <textarea
          disabled={isPending}
          required
          name="content"
          placeholder="리뷰 내용"
        />
        <div className={style.submitContainer}>
          <input
            disabled={isPending}
            required
            name="author"
            placeholder="작성자"
          />
          <button disabled={isPending} type="submit">
            {" "}
            {isPending ? "..." : "작성하기"}
          </button>
        </div>
      </form>
    </section>
  );
}
