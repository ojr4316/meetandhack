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
  InvalidUsername = "Could not find username",
  InvalidPassword = "Incorrect Password",
  InvalidRequest = "Invalid request",
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { email, password } = req.body;

  if (req.method == "POST" && email && password) {
    const userExists = await prisma.user.findFirst({
      where: { email: email as string },
    });

    if (userExists) {
      const correctPassword = bcrypt.compareSync(password, userExists.password);
      if (correctPassword) {
        return res.status(200).json({ error: Error.None });
      } else {
        return res.status(400).json({ error: Error.InvalidPassword });
      }
    } else {
      return res.status(400).json({ error: Error.InvalidUsername });
    }
  } else {
    return res.status(400).json({ error: Error.InvalidRequest });
  }
}
