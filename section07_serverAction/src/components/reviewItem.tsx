import { ReviewData } from "@/types";
import style from "./reviewItem.module.css";
import ReviewItemDeleteButton from "./reviewItemDeleteButton";

export default function ReviewItem({
  id,
  content,
  author,
  createdAt,
  bookId,
}: ReviewData) {
  return (
    <div className={style.container}>
      <div className={style.author}>{author}</div>
      <div className={style.content}>{content}</div>
      <div className={style.bottomContainer}>
        <div className={style.date}>{new Date(createdAt).toLocaleString()}</div>
        <div className={style.deleteButton}>
          <ReviewItemDeleteButton reviewId={id} bookId={bookId} />
        </div>
      </div>
    </div>
  );
}
