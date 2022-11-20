import type { NextApiRequest, NextApiResponse } from "next";
import { project } from "@prisma/client";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { prisma } from './../../lib/db';

type Data = {
  error: Error;
  project?: project | project[];
};

enum Error {
  None = "",
  InvalidMethod = "Invalid HTTP Method",
  InvalidUser = "Not the manager",
  InvalidRequest = "Invalid request",
}

export default withIronSessionApiRoute(handler, sessionOptions);

async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { id, name } = req.body;

  if (req.method == "POST" && name) {
    const project = await prisma.project.create({
      data: {
        name: name as string,
        creation_date: new Date(),
        finish_date: new Date("2040-12-12"),
      },
    });
    return res.status(200).json({ error: Error.None, project });
  } else if (req.method == "DELETE" && id) {
    await prisma.project.delete({ where: { id: parseInt(id) } });
    return res.status(200).json({ error: Error.None });
  } else if (req.method == "GET") {
    if (req.session.user && req.session.user?.id) {
      const projects = await prisma.project.findMany({
        where: { owner: req.session.user.id },
      });
      return res.status(200).json({ error: Error.None, project: projects });
    } else {
      return res.status(400).json({ error: Error.InvalidMethod });
    }
  } else {
    return res.status(400).json({ error: Error.InvalidMethod });
  }
}
