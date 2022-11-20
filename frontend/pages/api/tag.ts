import type { NextApiRequest, NextApiResponse } from 'next'
import { tag } from '@prisma/client'
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from "../../lib/session";
import { prisma } from '../../lib/db';


type Data = {
  error: Error;
  tag?: tag;
  tags?: tag[];
}

enum Error {
  None = "",
  InvalidMethod = "Invalid HTTP Method"
}

export default withIronSessionApiRoute(tagRoute, sessionOptions);

async function tagRoute(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {

  let { name, id } = req.body;

  if (req.method == "GET") {
    console.log("query: " + req.query.id);
    name = req.query.name;
    id = req.query.id;
    console.log("id:" + id)
  }

  if (req.method == "POST" && name) {
    const tag = await prisma.tag.create({ data: { name: name as string } });
    return res.status(200).json({ error: Error.None, tag });
  } else if (req.method == "DELETE" && id) {
    await prisma.tag.delete({ where: { id: parseInt(id) } });
    return res.status(200).json({ error: Error.None });
  }
  else if (req.method == "GET" && !id && !name) {
    const tags = await prisma.tag.findMany();
    return res.status(200).json({ error: Error.None, tags });
  }
  else if (req.method == "GET" && name) {
    const tag = await prisma.tag.findFirst({where: {name}});
    if (tag) {
      return res.status(200).json({ error: Error.None, tag });
    }
  }
  else if (req.method == "GET" && id) {
    console.log("id: " + id);
    const tag = await prisma.tag.findUnique({ where: { id: parseInt(id) } });
    if (tag) {
      return res.status(200).json({ error: Error.None, tag });
    }
  }
  else {
    return res.status(400).json({ error: Error.InvalidMethod });
  }
}
