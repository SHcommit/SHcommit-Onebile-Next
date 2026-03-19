"use client";
import { ReactNode, useEffect, useRef } from "react";
import style from "./modal.module.css";
import { createPortal } from "react-dom";
import { useRouter } from "next/navigation";

/// 이렇게 안하면 이페이지 layout의 칠드런으로 갈 것임 그래서
/// 페이지 어딘가에 짜부되서 보여질 수 있다는거지

// 또 해야할 것은 모달 배경 클릭되거나
// esc누를 경우에 뒤로가기 해줘야한다는거
export default function Modal({ children }: { children: ReactNode }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  /// dialog 모달 태그는 디폴트가 꺼져있는 상태로 렌더링됨
  /// 직접 다뤄줘야함
  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
      dialogRef.current?.scrollTo({ top: 0 });
    }
  }, []);
  return createPortal(
    <dialog
      onClose={() => router.back()}
      onClick={(e) => {
        if ((e.target as any).nodeName === "DIALOG") router.back();
      }}
      className={style.modal}
      ref={dialogRef}
    >
      {children}
    </dialog>,
    document.getElementById("modal-root") as HTMLElement,
  );
}
