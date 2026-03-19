import style from "./ReviewEditor.module.css";
import { createReviewAction } from "@/actions/createReview.action";

export default function ReviewEditor({ bookId }: { bookId: string }) {
  return (
    <section>
      <form className={style.formContainer} action={createReviewAction}>
        {/** 인풋에서 북 아이디는 안보이게! hidden + readOnly */}
        <input name="bookId" value={bookId} hidden readOnly />
        <textarea required name="content" placeholder="리뷰 내용" />
        <div className={style.submitContainer}>
          <input required name="author" placeholder="작성자" />
          <button type="submit"> 작성하기</button>
        </div>
      </form>
    </section>
  );
}
