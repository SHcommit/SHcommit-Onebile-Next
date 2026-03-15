import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse,
) {
  try {
    await response.revalidate("/");
    return response.json({ revalidate: true });
  } catch {
    response.status(500).send("revalidation failed");
  }
}
