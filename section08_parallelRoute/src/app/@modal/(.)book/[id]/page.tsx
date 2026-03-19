import BookPage from "@/app/book/[id]/page";
import Modal from "@/components/modal";
/// 여기서는 모달이 띄워지면 이전에 보여지고 있는 페이지가 보여지는
/// 병렬로 렌더링 되는 그런 기능을 만들어야 함! 
export default function Page(props: any) {
  return (
    <div>
      <Modal>
        <BookPage {...props} />
      </Modal>
    </div>
  );
}
