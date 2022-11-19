import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { prisma } from './../../lib/db';

const bcrypt = require("bcrypt");
const saltRounds = 10;

type Data = {
  error: Error;
};

enum Error {
  None = "",
  EmailExists = "Account already exists",
}

export default withIronSessionApiRoute(registerRoute, sessionOptions);

async function registerRoute(req: NextApiRequest, res: NextApiResponse<Data>) {
  const { username, password, email, name } = req.body;

  const userExists = await prisma.user.findFirst({
    where: { email: email as string },
  });

  if (!userExists) {
    const hashed = bcrypt.hashSync(password, saltRounds);
    console.log(hashed.length);
    const user = await prisma.user.create({
      data: { email, password: hashed, name, is_manager: false, username },
    });
    return res.status(200).json({ error: Error.None });
  } else {
    return res.status(400).json({ error: Error.EmailExists });
  }
}
