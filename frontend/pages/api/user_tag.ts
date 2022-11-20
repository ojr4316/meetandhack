import type { NextApiRequest, NextApiResponse } from "next";
import { tag, user, user_tag } from "@prisma/client";
import { withIronSessionApiRoute } from "iron-session/next";
import { sessionOptions } from "../../lib/session";
import { prisma } from "../../lib/db";

type Data = {
    error: Error;
    user?: user;
    tags?: tag[];
    user_tags?: user_tag[];
    user_tag?: user_tag;
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
    let { user_id, tag_id, id } = req.body;

    if (req.method == "GET") {
        user_id = req.query.user_id;
        tag_id = req.query.tag_id;
        id = req.query.id;
    }

    console.log(user_id + " " + tag_id + " " + id);

    if (req.method == "POST" && user_id && tag_id) {
        user_id = req.session.user?.id;
        if (user_id !== undefined) {
            const found = await prisma.user_tag.findMany({ where: { user_id: parseInt(user_id), tag_id: parseInt(tag_id)  } });
            if (found) {
                return res.status(400).json({error: Error.InvalidRequest});
            }
        }
        await prisma.user_tag.create({ data: { user: parseInt(user_id), tag: parseInt(tag_id) } })
        return res.status(200).json({ error: Error.None });
    }
    else if (req.method == "POST") {
        console.log("in");
        let user = req.session.user?.id;
        if (user) {
            let user_tag = await prisma.user_tag.create({ data: { user: user, tag: parseInt(tag_id) } })
            return res.status(200).json({ error: Error.None, user_tag});
        }
    }
    else if (req.method == "DELETE" && id) {
        await prisma.user_tag.delete({ where: { id: parseInt(id) } })
        return res.status(200).json({ error: Error.None })
    }
    else if (req.method == "GET") {
        const currentUserId = req.session.user?.id;
        if (currentUserId !== undefined) {
            const tags = await prisma.user_tag.findMany({ where: { user: currentUserId } });
            return res.status(200).json({ error: Error.None, user_tags: tags })
        }
        return res.status(400).json({ error: Error.InvalidRequest });
    }
}