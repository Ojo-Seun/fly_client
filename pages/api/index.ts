// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import db from "../../utils/db";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  db.connect();
  res.status(200).json({ name: "John Doe" });
}
