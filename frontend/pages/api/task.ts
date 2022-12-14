import type { NextApiRequest, NextApiResponse } from "next";
import { task, user_task } from "@prisma/client";
import { prisma } from "./../../lib/db";

type Data = {
    error: Error;
    task?: task;
};

enum Error {
    None = "",
    InvalidUsername = "Could not find username",
    InvalidUser = "Not the manager",
    InvalidRequest = "Invalid request",
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    let { name, project_id, task_id } = req.body;
    let  { taskId } = req.query;
    
    if (req.method == "GET") {
        name = req.query.name;
        project_id = req.query.project_id;
        task_id = req.query.task_id;
    }

    const date = new Date()
    // const user = req.session.user
    // if (user){
    // if(!(await prisma.user.findFirst({where:{id: user.id}}))?.is_manager){
    if (req.method == "POST") {
        await prisma.task.create({ data: { name: name as string, creation_date: date, finish_date: new Date("2040-12-12"), project: parseInt(project_id) } });
        return res.status(200).json({ error: Error.None });
    } else if (req.method == "DELETE" && taskId) {
        await prisma.task.delete({ where: { id: parseInt(taskId as string) } })
        return res.status(200).json({ error: Error.None });

    } else if (req.method == "PUT" && name && project_id && name) {
        const id = (await prisma.task.findFirst({ where: { name: name as string } }))?.id
        await prisma.task.update({ where: { id: id }, data: { name: name as string, project: parseInt(project_id) } });
        return res.status(200).json({ error: Error.None });
    } else if (req.method == "GET") {
        const task = await prisma.task.findUnique({ where: { id: parseInt(task_id) } });
        if (task) {
            return res.status(200).json({ error: Error.None, task });
        }
    }
    else {
        return res.status(400).json({ error: Error.InvalidRequest });
    }
    // }
    // else{
    //     return res.status(400).json({error: Error.InvalidUser})
    // }
}


//   }
