import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const saltRounds = 10;

type Data = {
  error: Error;
};

enum Error {
  None = "",
  EmailExists = "Account already exists",
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email, password } = req.body;

  const userExists = await prisma.user.findFirst({
    where: { email: email as string },
  });

  if (!userExists) {
    const hashed = bcrypt.hashSync(password, saltRounds);
    console.log(hashed.length);
    const user = await prisma.user.create({
      data: { email, password: hashed, name: "", is_manager: false, username: "" },
    });
    return res.status(200).json({error: Error.None});
  } else {
    return res.status(400).json({ error: Error.EmailExists });
  }
}
