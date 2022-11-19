import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";

type Data = {
  error: Error;
};

enum Error {
  None = ""
}

export default withIronSessionApiRoute(loginRoute, sessionOptions);

async function loginRoute(req: NextApiRequest, res: NextApiResponse) {
  req.session.destroy();
  return res.status(200).json({error: Error.None});
}
