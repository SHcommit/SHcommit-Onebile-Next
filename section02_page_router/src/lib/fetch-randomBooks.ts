import { Book } from "@/types";
export default async function fetchRandomBooks(): Promise<Book[]> {
  const url = `https://onebite-books-server-main-two-mu.vercel.app/book/random`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error();
    return await response.json();
  } catch (err) {
    console.log(err);
    return [];
  }
}
