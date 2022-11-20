import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, tag, user } from '@prisma/client'
import { withIronSessionApiRoute } from 'iron-session/next';
import { sessionOptions } from "../../lib/session";
const prisma = new PrismaClient();

type Data = {
    error: Error;
    user?: user;
    tags?: tag;
}

enum Error {
    None = "",
    InvalidMethod = "Invalid HTTP Method",
    NotFound = "User Not Found"
}

export default withIronSessionApiRoute(accountRoute, sessionOptions);

async function accountRoute(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(req);

  const id = req.session.user?.id; 

  if (req.method == "POST" && id) {
    // const tag = await prisma.tag.create({data: {name: name as string}});
    // return res.status(200).json({error: Error.None,  });
  } else if (req.method == "DELETE" && id) {
    await prisma.user.delete({where: {id: id}});
    return res.status(200).json({error: Error.None });
  } 
  else if (req.method == "GET" && id) {
    const user = await prisma.user.findUnique({where: {id: id}});
    if (user !== null) {
        return res.status(200).json({error: Error.None, user });
    } else {
        return res.status(400).json({error: Error.NotFound})
    }
    
  } 
  else {
    return res.status(400).json({error: Error.InvalidMethod});
  }
}