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
  InvalidUsername = "Could not find username",
  InvalidPassword = "Incorrect Password",
  InvalidRequest = "Invalid request",
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  const { email, password } = req.body;

  if (req.method == "POST" && email && password) {
    const userExists = await prisma.user.findFirst({
      where: { email: email as string },
    });

    if (userExists) {
      const correctPassword = bcrypt.compareSync(password, userExists.password);
      if (correctPassword) {
        req.session.user = {
          id: userExists.id,
        };
        await req.session.save();

        return res.redirect("/");
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
