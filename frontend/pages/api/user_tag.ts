import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, tag, user, user_tag } from "@prisma/client";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
const prisma = new PrismaClient();

type Data = {
    error: Error;
    user?: user;
    tags?: tag[];
}

export default withIronSessionApiRoute(userTagRoute, sessionOptions);

enum Error {
    None = "",
    InvalidUsername = "Could not find username",
    InvalidUser = "Not the manager",
    InvalidRequest = "Invalid request",
}

async function userTagRoute(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { user_id, tag_id, id } = req.body;
    if (req.method == "POST" && user_id && tag_id) {
        await prisma.user_tag.create({ data: { user: parseInt(user_id), tag: parseInt(tag_id) } })
        return res.status(200).json({ error: Error.None });
    }
    else if (req.method == "DELETE" && id) {
        await prisma.user_tag.delete({ where: { id: parseInt(id) } })
        return res.status(200).json({ error: Error.None })
    }
    else if (req.method == "GET" && !id) {
        const currentUserId = req.session.user?.id;
        if (currentUserId !== undefined) {
            const tags = await prisma.user_tag.findMany({where: {user: currentUserId}});
            console.log("tags: " + tags !== null);
            if (tags !== null) {
                let result: tag[] = [];
                tags.forEach(async (tag) => {
                    console.log("tag: " + tag);
                    let val = await prisma.tag.findUnique({where: {id: tag.tag}});
                    console.log("val: " + val !== null);
                    if (val !== null) {
                        result.push(val);
                    }
                });
                if (result !== null) {
                    console.log("returned");
                    return res.status(200).json({error: Error.None, tags: result})
                }
            }
        }
        return res.status(400).json({error: Error.InvalidRequest});
    }
}