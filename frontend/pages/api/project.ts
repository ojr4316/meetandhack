import type { NextApiRequest, NextApiResponse } from 'next'
import { PrismaClient, project } from '@prisma/client'
const prisma = new PrismaClient();

type Data = {
    error: Error;
    project?: project;
}

enum Error {
    None = "",
    InvalidMethod = "Invalid HTTP Method",
    InvalidUser = "Not the manager",
    InvalidRequest = "Invalid request"
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    console.log(req);

    const { id, name } = req.body;

    if (req.method == "POST" && name) {
        const project = await prisma.project.create({ data: { name: name as string, creation_date: new Date(), finish_date: new Date("2040-12-12") } });
        return res.status(200).json({ error: Error.None, project });
    } else if (req.method == "DELETE" && id) {
        await prisma.project.delete({ where: { id: parseInt(id) } });
        return res.status(200).json({ error: Error.None });
    } else {
        return res.status(400).json({ error: Error.InvalidMethod });
    }
}
