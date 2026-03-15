import { Book } from "@/types";

export default async function fetchBooks(q?: string): Promise<Book[]> {
  let url = `onebite-books-server-main-two-mu.vercel.app/book`;
  if (q) {
    url += `/search?q=${q}`;
  }
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error();
    return await response.json();
  } catch (err) {
    console.log(err);
    return [];
  }
}
