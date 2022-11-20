import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient, user_task } from "@prisma/client";
import { withIronSessionApiRoute } from "iron-session/next/dist";
import { sessionOptions } from "../../lib/session";
const prisma = new PrismaClient();
type Data = {
    error: Error
    user_tasks?: user_task[]
}
enum Error {
    None = "",
    InvalidUsername = "Could not find username",
    InvalidUser = "Not the manager",
    InvalidRequest = "Invalid request",
}
export default withIronSessionApiRoute(user_taskRoute, sessionOptions);
async function user_taskRoute(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const { user_id, task_id, manager_id, id } = req.body;
    if (req.method == "POST" && user_id && task_id && manager_id) {
        await prisma.user_task.create({ data: { worker: parseInt(user_id), manager: parseInt(manager_id), task: parseInt(task_id) } })
        return res.status(200).json({ error: Error.None });
    }
    else if (req.method == "DELETE" && id) {
        await prisma.user_task.delete({ where: { id: parseInt(id) } });
        return res.status(200).json({ error: Error.None })
    } else if (req.method == "GET" && !id) {
        let user = req.session.user?.id;
        if (user) {
            const user_tasks = await prisma.user_task.findMany({ where: { worker: user } });
            return res.status(200).json({ error: Error.None, user_tasks })
        }
    }
}