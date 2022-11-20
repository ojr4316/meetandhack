import type { NextApiRequest,NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
type Data = {
    error: Error
}
enum Error {
    None = "",
    InvalidUsername = "Could not find username",
    InvalidUser = "Not the manager",
    InvalidRequest = "Invalid request",
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
  ){
    const {user_id,task_id,manager_id,id} = req.body;
    if(req.method == "POST" && user_id &&task_id && manager_id){
        await prisma.user_task.create({data:{worker: user_id,manager: manager_id, task: task_id}})
        return res.status(200).json({error: Error.None});
    }
    else if(req.method == "DELETE" && id){
        await prisma.user_task.delete({where:{id : id}})
        return res.status(200).json({error:Error.None})
    }
  }