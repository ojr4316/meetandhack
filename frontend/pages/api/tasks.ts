import type { NextApiRequest, NextApiResponse } from "next";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { prisma } from './../../lib/db';
import { task } from "@prisma/client";

type Data = {
  error: Error;
  tasks?: task[];
};

enum Error {
  None = "",
  NotLoggedIn = "Invalid Session"
}

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { projectId } = req.query;

  if (req.method == "GET" && req.session.user) {
    const tasks = await prisma.task.findMany({where: { project: parseInt(projectId as string)}});
    return res.status(200).json({error: Error.None, tasks});
  } else {
    return res.status(400).json({error: Error.NotLoggedIn});
  }
}
