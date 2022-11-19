import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, tag } from '@prisma/client'
const prisma = new PrismaClient();

type Data = {
    error: Error;
    tag?: tag;
}

enum Error {
    None = "",
    InvalidMethod = "Invalid HTTP Method"
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const { name, id } = req.body; 

  if (req.method == "POST" && name) {
    const tag = await prisma.tag.create({data: {name: name as string}});
    return res.status(200).json({error: Error.None, tag });
  } else if (req.method == "DELETE" && id) {
    await prisma.tag.delete({where: {id: parseInt(id)}});
    return res.status(200).json({error: Error.None });
  } else {
    return res.status(400).json({error: Error.InvalidMethod});
  }
}
