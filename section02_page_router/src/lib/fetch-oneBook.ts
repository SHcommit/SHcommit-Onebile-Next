import { Book } from "@/types";

export default async function fetchOneBook(id: number): Promise<Book | null> {
  const url = `http://localhost:12345/book/${id}`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error();

    return await response.json();
  } catch (err) {
    console.log(err);
    return null;
  }
}
