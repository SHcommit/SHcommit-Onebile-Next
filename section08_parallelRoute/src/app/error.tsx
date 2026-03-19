"use client";

import { startTransition, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();
  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div>
      <h3>오류 발생: {error.message}</h3>
      {/* <button onClick={() => reset()}>다시 시도</button> */}
      {/* <button onClick={() => window.location.reload()}>다시 시도</button> */}
      <button
        onClick={() => {
          startTransition(() => {
            router.refresh();
            reset();
          });
        }}
      >
        다시 시도
      </button>
    </div>
  );
}
