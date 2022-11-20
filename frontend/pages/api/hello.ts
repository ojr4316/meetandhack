// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from './../../lib/db';

type Data = {
  name: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const user = await prisma.user.findUnique({where: { id: 0}})
  
    prisma.user_task.delete({where: {id: 1}});
  res.status(200).json({ name: 'John Doe' })
}
