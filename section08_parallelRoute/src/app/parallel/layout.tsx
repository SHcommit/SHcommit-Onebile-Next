import { ReactNode } from "react";
import Link from "next/link";

export default function Layout({
  children,
  sidebar,
  feed,
}: {
  children: ReactNode;
  feed: ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <div>
      <div>
        <Link href={"/parallel"}>parallel</Link>
        &nbsp;
        <Link href={"/parallel/setting"}>parallel/feed/setting</Link>
      </div>
      {sidebar}
      {feed}
      {children}
    </div>
  );
}
