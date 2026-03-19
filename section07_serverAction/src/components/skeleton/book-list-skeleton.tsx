import BookItemSkeleton from "./book-item-skeleton";

export default function BookListSkeleton({ withCount }: { withCount: number }) {
  return new Array(withCount)
    .fill(0)
    .map((_, idx) => <BookItemSkeleton key={`book-item-skeleton-${idx}`} />);
}
