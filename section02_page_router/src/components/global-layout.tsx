import { ReactNode } from "react";
import Link from "next/link";
import style from "./global-layout.module.css";

export default function GlobalLayout({ children }: { children: ReactNode }) {
  return (
    <div className={style.container}>
      <header className={style.header}>
        <Link href={"/"}>📚 One Bite Books</Link>
      </header>
      <main className={style.main}>{children}</main>
      <footer className={style.footer}>Designed by @SEUNGHYUN YANG</footer>
    </div>
  );
}
